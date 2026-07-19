// ** React Imports
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";

// ** Editor.js
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ListTool from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import RawTool from "@editorjs/raw";
import edjsHTML from "editorjs-html";

// ** Custom Components
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Spinner,
  FormGroup,
} from "reactstrap";

// ** API Services
import {
  getNewsById,
  getListNewsCategory,
  getNewsFileList,
} from "../../../core/Interceptor/Services/EditPageServices/get";
import { setUrlForNews } from "../../../core/Interceptor/Services/EditPageServices/post";
import {
  updateNews,
  activeDeactiveNews,
} from "../../../core/Interceptor/Services/EditPageServices/put";
import { deleteNewsFile } from "../../../core/Interceptor/Services/EditPageServices/delete";
import { createNews } from "../../../core/Interceptor/Services/blogPageServices/post";

const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "http://162.19.253.202:3001";

const resolveImageUrl = (path) => {
  if (!path) return null;
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";

const toSafeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const nestedArray = Object.values(value).find((v) => Array.isArray(v));
    return nestedArray ?? [];
  }
  return [];
};

const edjsParser = edjsHTML({
  raw: (block) => block.data.html ?? "",
});

const editorOutputToHtml = (outputData) => {
  try {
    const htmlArray = edjsParser.parse(outputData);
    return Array.isArray(htmlArray)
      ? htmlArray.join("")
      : String(htmlArray ?? "");
  } catch (error) {
    console.error("خطا در تبدیل خروجی ادیتور به HTML:", error);
    return "";
  }
};

const htmlToEditorData = (html) => {
  if (!html || typeof html !== "string" || html.trim() === "") {
    return { blocks: [] };
  }
  return {
    blocks: [
      {
        type: "raw",
        data: {
          html,
        },
      },
    ],
  };
};

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = id === "new";

  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [googleTitle, setGoogleTitle] = useState("");
  const [googleDescribe, setGoogleDescribe] = useState("");
  const [miniDescribe, setMiniDescribe] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isSlider, setIsSlider] = useState(false);
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [initialEditorData, setInitialEditorData] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [featuredImg, setFeaturedImg] = useState(null);
  const [featuredFileId, setFeaturedFileId] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [imgPath, setImgPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const editorRef = useRef(null);
  const editorHolderRef = useRef(null);
  const isEditorReadyRef = useRef(false);

  const resetFormState = () => {
    setTitle("");
    setGoogleTitle("");
    setGoogleDescribe("");
    setMiniDescribe("");
    setKeyword("");
    setIsSlider(false);
    setSlug("");
    setIsActive(true);
    setSelectedCategory(null);
    setFeaturedImg(null);
    setFeaturedFileId(null);
    setNewImageFile(null);
    setImgPath("");
  };

  const destroyEditor = () => {
    if (editorRef.current && typeof editorRef.current.destroy === "function") {
      editorRef.current.destroy();
    }
    editorRef.current = null;
    isEditorReadyRef.current = false;
  };

  useEffect(() => {
    console.log("[NewsEdit] id از URL:", id);
    console.log("[NewsEdit] isNew (آیا حالت افزودن است؟):", isNew);

    if (!id) return;
    resetFormState();
    setData(null);
    setInitialEditorData(null);
    destroyEditor();

    if (isNew) {
      console.log(
        "[NewsEdit] حالت افزودن خبر جدید - فرم خالی نمایش داده می‌شود",
      );
      const fetchCategoriesOnly = async () => {
        setIsLoading(true);
        try {
          const categoryRes = await getListNewsCategory();
          const rawCategories =
            categoryRes.data?.categories ?? categoryRes.data ?? [];
          const categories = toSafeArray(rawCategories).map((c) => ({
            value: c.id,
            label: c.categoryName,
          }));
          setCategoryOptions(categories);
        } catch (error) {
          console.error("API ERROR (categories):", error);
          toast.error("خطا در دریافت دسته‌بندی‌ها");
        } finally {
          setData({});
          setInitialEditorData({ blocks: [] });
          setIsLoading(false);
        }
      };

      fetchCategoriesOnly();
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("[NewsEdit] در حال گرفتن اطلاعات خبر با id:", id);

        const [categoryRes, newsRes] = await Promise.all([
          getListNewsCategory(),
          getNewsById(id),
        ]);

        console.log("[NewsEdit] پاسخ خام getNewsById:", newsRes);
        console.log("[NewsEdit] newsRes.data:", newsRes.data);

        const rawCategories =
          categoryRes.data?.categories ?? categoryRes.data ?? [];
        const categories = toSafeArray(rawCategories).map((c) => ({
          value: c.id,
          label: c.categoryName,
        }));
        setCategoryOptions(categories);

        const news =
          newsRes.data?.detailsNewsDto ??
          newsRes.data?.news ??
          newsRes.data ??
          {};

        console.log("[NewsEdit] آبجکت نهایی خبر که استفاده می‌شود:", news);

        setData(news);
        setTitle(news.title ?? "");
        setGoogleTitle(news.googleTitle ?? "");
        setGoogleDescribe(news.googleDescribe ?? "");
        setMiniDescribe(news.miniDescribe ?? "");
        setKeyword(news.keyword ?? "");
        setIsSlider(news.isSlider ?? false);

        setSlug(news.shortLink ?? news.url ?? news.slug ?? "");
        setIsActive(news.isActive ?? true);

        const newsCategories = toSafeArray(news.categories);
        if (newsCategories.length > 0) {
          setSelectedCategory({
            value: newsCategories[0].id,
            label: newsCategories[0].categoryName,
          });
        } else if (news.newsCatregoryId || news.newsCategoryId) {
          const catId = news.newsCatregoryId ?? news.newsCategoryId;
          const matched = categories.find((c) => c.value === catId);
          setSelectedCategory(matched ?? null);
        }

        const htmlContent = news.describe ?? news.content ?? "";
        setInitialEditorData(htmlToEditorData(htmlContent));

        try {
          const fileRes = await getNewsFileList(id);
          const files = toSafeArray(fileRes.data?.files ?? fileRes.data);

          if (files.length > 0) {
            setFeaturedFileId(files[0].id);
            setFeaturedImg(resolveImageUrl(files[0].url ?? files[0].path));
            setImgPath(files[0].fileName ?? "");
          } else if (news.currentImageAddress) {
            setFeaturedImg(resolveImageUrl(news.currentImageAddress));
          }
        } catch (fileError) {
          if (fileError.response?.status !== 404) {
            console.error("API ERROR (file list):", fileError);
          }
          if (news.currentImageAddress) {
            setFeaturedImg(resolveImageUrl(news.currentImageAddress));
          }
        }
      } catch (error) {
        console.error("API ERROR:", error);
        toast.error("خطا در دریافت اطلاعات خبر");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      destroyEditor();
    };
  }, [id]);

  useEffect(() => {
    if (isLoading || initialEditorData === null) return;
    if (isEditorReadyRef.current) return;

    const editor = new EditorJS({
      holder: editorHolderRef.current,
      placeholder: "متن خبر را وارد کنید...",
      data: initialEditorData,
      tools: {
        header: Header,
        list: ListTool,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        raw: RawTool,
      },
      onReady: () => {
        isEditorReadyRef.current = true;
      },
    });

    editorRef.current = editor;

    return () => {
      destroyEditor();
    };
  }, [isLoading, initialEditorData]);

  const onChangeImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewImageFile(file);
    setImgPath(file.name);

    const reader = new FileReader();
    reader.onload = () => setFeaturedImg(reader.result);
    reader.readAsDataURL(file);
  };

  const handleToggleActive = async () => {
    if (isNew) return;
    try {
      await activeDeactiveNews(id, !isActive);
      setIsActive((prev) => !prev);
      toast.success(!isActive ? "خبر فعال شد" : "خبر غیرفعال شد");
    } catch (error) {
      console.error("API ERROR:", error);
      toast.error("خطا در تغییر وضعیت خبر");
    }
  };

  const handleDeleteImage = async () => {
    if (!featuredFileId) {
      setFeaturedImg(null);
      setNewImageFile(null);
      setImgPath("");
      return;
    }
    try {
      await deleteNewsFile(featuredFileId);
      setFeaturedFileId(null);
      setFeaturedImg(null);
      setNewImageFile(null);
      setImgPath("");
      toast.success("تصویر حذف شد");
    } catch (error) {
      console.error("API ERROR:", error);
      toast.error("خطا در حذف تصویر");
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("عنوان خبر الزامی است");
      return;
    }
    if (!selectedCategory) {
      toast.error("انتخاب دسته‌بندی الزامی است");
      return;
    }

    setIsSaving(true);
    try {
      let htmlContent = "";
      if (editorRef.current) {
        const outputData = await editorRef.current.save();
        htmlContent = editorOutputToHtml(outputData);
      }

      if (isNew) {
        console.log("[NewsEdit] در حال ایجاد خبر جدید با عنوان:", title);
        await createNews({
          title,
          googleTitle,
          googleDescribe,
          miniDescribe,
          describe: htmlContent,
          keyword,
          isSlider,
          newsCategoryId: selectedCategory.value,
          image: newImageFile,
        });

        toast.success("خبر جدید با موفقیت ایجاد شد");
      } else {
        console.log(
          "[NewsEdit] در حال ویرایش خبر با id:",
          id,
          "عنوان جدید:",
          title,
        );
        await updateNews({
          id,
          slideNumber: data?.slideNumber,
          currentImageAddress: data?.currentImageAddress,
          currentImageAddressTumb: data?.currentImageAddressTumb,
          active: isActive,
          title,
          googleTitle,
          googleDescribe,
          miniDescribe,
          describe: htmlContent,
          keyword,
          isSlider,
          newsCategoryId: selectedCategory.value,
          image: newImageFile,
        });

        const currentSlug = data?.shortLink ?? data?.url ?? data?.slug ?? "";
        if (slug && slug !== currentSlug) {
          await setUrlForNews(id, slug);
        }

        toast.success("تغییرات با موفقیت ذخیره شد");
      }

      navigate("/pages/blog/list");
    } catch (error) {
      console.error("API ERROR:", error);
      toast.error(isNew ? "خطا در ایجاد خبر جدید" : "خطا در ذخیره تغییرات");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/pages/blog/list");
  };

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        title={isNew ? "افزودن بلاگ جدید" : "ویرایش خبر"}
        data={[
          { title: "صفحات" },
          { title: "وبلاگ" },
          { title: isNew ? "افزودن" : "ویرایش" },
        ]}
      />
      {isLoading ? (
        <div className="text-center py-3">
          <Spinner color="primary" />
        </div>
      ) : data !== null ? (
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                {!isNew && (
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
                    <div className="d-flex">
                      <div>
                        <Avatar
                          className="me-75"
                          img={data.avatar}
                          imgWidth="38"
                          imgHeight="38"
                        />
                      </div>
                      <div>
                        <h6 className="mb-25">{data.userFullName}</h6>
                        <CardText className="mb-0">{data.createdTime}</CardText>
                      </div>
                    </div>
                    <Button
                      color={isActive ? "success" : "secondary"}
                      outline
                      size="sm"
                      onClick={handleToggleActive}
                    >
                      {isActive ? "فعال" : "غیرفعال"}
                    </Button>
                  </div>
                )}

                <Form
                  className={isNew ? "" : "mt-2"}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Row>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="news-edit-title">
                        عنوان (Title) *
                      </Label>
                      <Input
                        id="news-edit-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="news-edit-category">
                        دسته بندی (NewsCatregoryId) *
                      </Label>
                      <Select
                        id="news-edit-category"
                        isClearable
                        theme={selectThemeColors}
                        value={selectedCategory}
                        name="category"
                        options={categoryOptions}
                        className="react-select"
                        classNamePrefix="select"
                        onChange={(value) => setSelectedCategory(value)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label
                        className="form-label"
                        for="news-edit-google-title"
                      >
                        عنوان گوگل (GoogleTitle)
                      </Label>
                      <Input
                        id="news-edit-google-title"
                        value={googleTitle}
                        onChange={(e) => setGoogleTitle(e.target.value)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="news-edit-keyword">
                        کلمات کلیدی (Keyword)
                      </Label>
                      <Input
                        id="news-edit-keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="با کاما جدا کنید"
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label
                        className="form-label"
                        for="news-edit-google-describe"
                      >
                        توضیح گوگل (GoogleDescribe)
                      </Label>
                      <Input
                        id="news-edit-google-describe"
                        type="textarea"
                        rows="2"
                        value={googleDescribe}
                        onChange={(e) => setGoogleDescribe(e.target.value)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label
                        className="form-label"
                        for="news-edit-mini-describe"
                      >
                        توضیح کوتاه (MiniDescribe)
                      </Label>
                      <Input
                        id="news-edit-mini-describe"
                        type="textarea"
                        rows="2"
                        value={miniDescribe}
                        onChange={(e) => setMiniDescribe(e.target.value)}
                      />
                    </Col>
                    {!isNew && (
                      <Col md="6" className="mb-2">
                        <Label className="form-label" for="news-edit-slug">
                          اسلاگ (URL)
                        </Label>
                        <Input
                          id="news-edit-slug"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                        />
                      </Col>
                    )}
                    <Col md="6" className="mb-2 d-flex align-items-end">
                      <FormGroup switch className="mb-0">
                        <Input
                          type="switch"
                          role="switch"
                          id="news-edit-is-slider"
                          checked={isSlider}
                          onChange={(e) => setIsSlider(e.target.checked)}
                        />
                        <Label check for="news-edit-is-slider">
                          نمایش در اسلایدر (IsSlider)
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col sm="12" className="mb-2">
                      <Label className="form-label">محتوا (Describe)</Label>
                      <div
                        ref={editorHolderRef}
                        id="news-edit-editorjs"
                        className="border rounded p-1"
                        style={{ minHeight: "250px" }}
                      />
                    </Col>
                    <Col className="mb-2" sm="12">
                      <div className="border rounded p-2">
                        <h4 className="mb-1">تصویر شاخص (Image)</h4>
                        <div className="d-flex flex-column flex-md-row">
                          {featuredImg && (
                            <img
                              className="rounded me-2 mb-1 mb-md-0"
                              src={featuredImg}
                              alt="تصویر شاخص"
                              width="170"
                              height="110"
                            />
                          )}
                          <div>
                            <small className="text-muted">
                              حداقل رزولوشن تصویر 800x400، حجم مجاز تا 10
                              مگابایت.
                            </small>

                            {imgPath && (
                              <p className="my-50">
                                <a href="/" onClick={(e) => e.preventDefault()}>
                                  {imgPath}
                                </a>
                              </p>
                            )}

                            <div className="d-flex align-items-center gap-1 flex-wrap mt-50">
                              <Input
                                type="file"
                                id="news-edit-image"
                                name="newsImage"
                                onChange={onChangeImage}
                                accept=".jpg, .jpeg, .png, .gif"
                              />
                              {(featuredImg || featuredFileId) && (
                                <Button
                                  color="danger"
                                  outline
                                  size="sm"
                                  onClick={handleDeleteImage}
                                >
                                  حذف تصویر
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className="mt-50">
                      <Button
                        color="primary"
                        className="me-1"
                        disabled={isSaving}
                        onClick={handleSave}
                      >
                        {isSaving && <Spinner size="sm" className="me-50" />}
                        {isNew ? "ایجاد خبر" : "ذخیره تغییرات"}
                      </Button>
                      <Button
                        color="secondary"
                        outline
                        onClick={handleCancel}
                        disabled={isSaving}
                      >
                        انصراف
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default NewsEdit;
