// ** React Imports
import { Fragment, useState, useEffect } from "react";
// ** Third Party Components
import classnames from "classnames";
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Edit2,
} from "react-feather";
import images from "../../../assets/images/pages/Rectangle 34.png";
import Users from "/src/assets/images/portrait/small/avatar-s-11.jpg";

// ** Utils
import { kFormatter } from "@utils";

// ** Custom Components
import Sidebar from "../BlogSidebar";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner,
} from "reactstrap";
import {
  addComment,
  addReplyComment,
  addCommentLike,
  addCommentDissLike,
  deleteCommentLike,
  addNewsLike,
  addNewsLikeBlog,
  addNewsRate,
} from "../../../core/Interceptor/Services/BlogDetailServices/post";
// ** Styles
import "@styles/base/pages/page-blog.scss";

// ** Images
import cmtImg from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import {
  GetNewsComments,
  NewsBlogDetail,
} from "../../../core/Interceptor/Services/BlogDetailServices/get";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileInfo } from "../../../core/Interceptor/Services/DashboardServices/get.js";

const BlogDetails = () => {
  // ** States
  const [newsRate, setNewsRate] = useState(0);
  const [isRateLoading, setIsRateLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyTexts, setReplyTexts] = useState({});
  const [data, setData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [blogLikeCount, setBlogLikeCount] = useState(0);
  const [blogLiked, setBlogLiked] = useState(false);
  const [isBlogLikeLoading, setIsBlogLikeLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComment, setisLoadingComment] = useState(false);
  const [BlogComment, setBlogComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);

  // دکمه ویرایش خبر: کاربر را به صفحه ادیت همین خبر می‌برد
  const handleEditNews = () => {
    navigate(`/pages/blog/edit/${id}`);
  };

  const fetchUserInfo = async () => {
    try {
      const response = await getUserProfileInfo();
      setUserInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleCommentLike = async (commentId, type) => {
    const isOptimistic = String(commentId).length === 13;
    if (isOptimistic) return;

    const comment = BlogComment.find((c) => c.id === commentId);

    if (type === "like") {
      const alreadyLiked = comment?.currentUserIsLike;
      setBlogComment((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                likeCount: Math.max(
                  (c.likeCount || 0) + (alreadyLiked ? -1 : 1),
                  0,
                ),
                currentUserIsLike: !alreadyLiked,
              }
            : c,
        ),
      );
      try {
        if (alreadyLiked) {
          await deleteCommentLike(comment.currentUserLikeId);
        } else {
          await addCommentLike(commentId, "Like");
        }
      } catch (error) {
        const msg = error.response?.data?.message || "";
        if (msg.includes("قبلا ثبت شده")) return;
        setBlogComment((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  likeCount: Math.max(
                    (c.likeCount || 0) + (alreadyLiked ? 1 : -1),
                    0,
                  ),
                  currentUserIsLike: alreadyLiked,
                }
              : c,
          ),
        );
      }
    } else {
      const alreadyDissLiked = comment?.currentUserIsDissLike;
      setBlogComment((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                dissLikeCount: Math.max(
                  (c.dissLikeCount || 0) + (alreadyDissLiked ? -1 : 1),
                  0,
                ),
                currentUserIsDissLike: !alreadyDissLiked,
              }
            : c,
        ),
      );
      try {
        await addCommentDissLike(commentId);
      } catch (error) {
        const msg = error.response?.data?.message || "";
        if (msg.includes("قبلا ثبت شده")) return;
        setBlogComment((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  dissLikeCount: Math.max(
                    (c.dissLikeCount || 0) + (alreadyDissLiked ? 1 : -1),
                    0,
                  ),
                  currentUserIsDissLike: alreadyDissLiked,
                }
              : c,
          ),
        );
      }
    }
  };

  const handleRateNews = async (rate) => {
    if (isRateLoading) return;

    setNewsRate(rate);
    setIsRateLoading(true);

    try {
      await addNewsRate(id, rate);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRateLoading(false);
    }
  };
  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    try {
      await addComment(id, "", "", commentText, userInfo.id);

      await fetchBlogComment(id);

      setCommentText("");
    } catch (error) {
      console.error("خطا در ارسال کامنت:", error);
    }
  };
  const handleSubmitReply = async (commentId) => {
    const text = replyTexts[commentId];

    if (!text || !text.trim()) return;

    try {
      await addReplyComment(id, commentId, text, userInfo.id);

      const newReply = {
        id: Date.now().toString(),
        describe: text,
        addUserFullName: userInfo.userName || "کاربر",
        likeCount: 0,
      };

      setBlogComment((prev) =>
        prev.map((c) =>
          String(c.id) === String(commentId)
            ? {
                ...c,
                replies: [...(c.replies || []), newReply],
              }
            : c,
        ),
      );

      setReplyTexts((prev) => ({
        ...prev,
        [commentId]: "",
      }));

      setActiveReplyId(null);
    } catch (error) {
      console.error("reply error:", error);
    }
  };
  const fetchNews = async () => {
    setIsLoading(true);

    try {
      const response = await NewsBlogDetail({
        Id: id,
      });

      setBlogLikeCount(response.data.news?.[0]?.currentLikeCount || 0);
      setBlogLiked(response.data.news?.[0]?.currentUserIsLike || false);
      setData(response.data.news?.[0]);
      console.log("دیتای دریافتی", response.data.news?.[0]);
    } catch (error) {
      console.error("API ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNews(id);
  }, [id]);
  const handleBlogLike = async () => {
    if (isBlogLikeLoading) return;

    setIsBlogLikeLoading(true);

    try {
      const prevLiked = blogLiked;

      await addNewsLikeBlog(id);
      setBlogLiked(!prevLiked);

      setBlogLikeCount((prev) =>
        prevLiked ? Math.max(prev - 1, 0) : prev + 1,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsBlogLikeLoading(false);
    }
  };
  const fetchBlogComment = async (newsId) => {
    setisLoadingComment(true);
    try {
      const response = await GetNewsComments({ NewsId: newsId });
      const comments =
        response.data?.comments ||
        response.data?.data ||
        (Array.isArray(response.data) ? response.data : []);
      setBlogComment(comments);
      console.log("دیتای دریافتی از سرور", comments);
    } catch (error) {
      console.error(error);
      setBlogComment([]);
    } finally {
      setisLoadingComment(false);
    }
  };
  useEffect(() => {
    fetchBlogComment(id);
  }, [id]);

  const badgeColorsArr = {
    Quote: "light-info",
    Fashion: "light-primary",
    Gaming: "light-danger",
    Video: "light-warning",
    Food: "light-success",
  };

  const renderTags = () => {
    if (!data?.tags?.length) return null;

    return data.tags.map((tag, index) => (
      <Badge key={index} color={badgeColorsArr[tag]} pill>
        {tag}
      </Badge>
    ));
  };
  const renderComments = () => {
    if (isLoadingComment) {
      return (
        <div
          className="d-flex w-100 align-items-center justify-content-center"
          style={{ minHeight: "150px" }}
        >
          <Spinner color="primary" />
        </div>
      );
    }
    return BlogComment.map((comment) => {
      return (
        <Card className="mb-3" key={comment.id || comment.userFullName}>
          <CardBody>
            <div className="d-flex">
              <div>
                <Avatar
                  className="me-75"
                  img={Users}
                  imgHeight="38"
                  imgWidth="38"
                />
              </div>
              <div>
                <h6 className="fw-bolder mb-25">
                  {comment.userFullName || comment.addUserFullName}
                </h6>
                <CardText>{comment.commentedAt}</CardText>
                <CardText>{comment.describe}</CardText>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => handleCommentLike(comment.id, "like")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        border: "1px solid #e5e7eb",
                        background: comment.currentUserIsLike
                          ? "#ecfdf5"
                          : "#fff",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontSize: "13px",
                      }}
                      onMouseEnter={(e) => {
                        if (!comment.currentUserIsLike) {
                          e.currentTarget.style.background = "#f9fafb";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!comment.currentUserIsLike) {
                          e.currentTarget.style.background = "#fff";
                        }
                      }}
                    >
                      <ThumbsUp size={16} color="#22c55e" />
                      <span style={{ color: "#16a34a", fontWeight: "500" }}>
                        {comment.likeCount || 0}
                      </span>
                    </button>

                    <button
                      onClick={() => handleCommentLike(comment.id, "dislike")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        border: "1px solid #e5e7eb",
                        background: comment.currentUserIsDissLike
                          ? "#fef2f2"
                          : "#fff",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontSize: "13px",
                      }}
                      onMouseEnter={(e) => {
                        if (!comment.currentUserIsDissLike) {
                          e.currentTarget.style.background = "#f9fafb";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!comment.currentUserIsDissLike) {
                          e.currentTarget.style.background = "#fff";
                        }
                      }}
                    >
                      <ThumbsDown size={16} color="#ef4444" />
                      <span style={{ color: "#ef4444", fontWeight: "500" }}>
                        {comment.dissLikeCount || 0}
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        setActiveReplyId(
                          activeReplyId === comment.id ? null : comment.id,
                        )
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        border: "1px solid #e5e7eb",
                        background:
                          activeReplyId === comment.id ? "#eff6ff" : "#fff",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontSize: "13px",
                      }}
                    >
                      <CornerUpLeft size={16} color="#3b82f6" />
                      <span style={{ color: "#374151", fontWeight: "500" }}>
                        پاسخ
                      </span>
                    </button>
                  </div>
                </a>
              </div>
            </div>
            {comment.replies && comment.replies.length > 0 && (
              <div className="mr-10 mt-3 border-r-2 border-gray-200 dark:border-gray-700 pr-4 flex flex-col gap-3">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-gray-50 dark:bg-custom-gray-6 rounded-2xl p-3 shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-center  flex-wrap gap-2">
                      <div>
                        <Avatar
                          className="me-75"
                          img={Users}
                          imgHeight="38"
                          imgWidth="38"
                        />{" "}
                        <span className="font-medium text-sm dark:text-white-400">
                          {reply.userFullName || reply.addUserFullName}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm  mt-1 text-gray-600 dark:text-white-300 leading-6 pr-2">
                      {reply.describe}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {activeReplyId === comment.id && (
              <div className="mr-10 mt-3 border-r-2 border-gray-200 dark:border-gray-700 pr-4">
                <textarea
                  value={replyTexts[comment.id] || ""}
                  onChange={(e) =>
                    setReplyTexts((prev) => ({
                      ...prev,
                      [comment.id]: e.target.value,
                    }))
                  }
                  placeholder="پاسخ خود را بنویسید..."
                  style={{
                    width: "650px",
                    maxWidth: "100%",
                    height: "48px",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    outline: "none", // 👈 مهم
                    resize: "none",
                    backgroundColor: "#fff",
                    color: "#374151",
                    transition: "0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = "none"; // 👈 مهم
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(59,130,246,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = "none"; // 👈 مهم
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />

                <div className="flex gap-2 mt-2 justify-end">
                  <button
                    type="button"
                    onClick={() => handleSubmitReply(comment.id)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium 
                   bg-blue-600 hover:bg-blue-700 text-white 
                   transition-all shadow-sm"
                  >
                    ارسال پاسخ
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveReplyId(null)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium 
                   bg-gray-100 hover:bg-gray-200 text-gray-600 
                   dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600
                   transition-all"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      );
    });
  };
  if (isLoading) {
    return (
      <div
        className="d-flex w-100 align-items-center justify-content-center"
        style={{ minHeight: "300px" }}
      >
        <Spinner color="primary" />
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return <div>داده‌ای موجود نیست</div>;
  }
  return (
    <Fragment>
      <Breadcrumbs
        title="جزئیات خبر"
        data={[{ title: "صفحات" }, { title: "وبلاگ" }, { title: "جزئیات خبر" }]}
      />{" "}
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            {data !== null ? (
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardImg src={images} className="img-fluid" top />
                    <CardBody>
                      <div className="d-flex align-items-center justify-content-between">
                        <CardTitle tag="h4" className="mb-0">
                          {" "}
                          {data.title}
                        </CardTitle>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={handleEditNews}
                        >
                          <Edit2 size={15} className="me-50" />
                          ویرایش خبر
                        </Button>
                      </div>
                      <div className="d-flex mt-1">
                        <Avatar
                          className="me-50"
                          img={Users}
                          imgHeight="24"
                          imgWidth="24"
                        />
                        <div>
                          <small className="text-muted me-25">
                            نویسنده:{data.addUserFullName}
                          </small>{" "}
                          <small>
                            <a
                              className="text-body"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              {data.addUserFullName}
                            </a>
                          </small>
                          <span className="text-muted ms-50 me-25">
                            {" "}
                            {data.addUserFullName}
                          </span>
                          <small className="text-muted">
                            {new Date(data.insertDate).toLocaleDateString(
                              "fa-IR",
                            )}
                          </small>
                        </div>
                      </div>
                      <div className="my-1 py-25">{renderTags()}</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data?.blog?.content,
                        }}
                      ></div>

                      <div className="d-flex">
                        <div>
                          <Avatar
                            img={Users}
                            className="me-2"
                            imgHeight="60"
                            imgWidth="60"
                          />
                        </div>
                        <div>
                          <h6 className="fw-bolder">نویسنده مقاله</h6>

                          <CardText className="mb-0">
                            {" "}
                            {data?.googleDescribe}{" "}
                          </CardText>
                        </div>
                      </div>
                      <hr className="my-2" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center me-1">
                            <a
                              className="me-50"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              <MessageSquare
                                size={21}
                                className="text-body align-middle"
                              />
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <div className="text-body align-middle">
                                {kFormatter(data?.blog?.comments)}
                              </div>
                            </a>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              onClick={handleBlogLike}
                              disabled={isBlogLikeLoading}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-full border 
  border-gray-200 hover:bg-gray-50 transition-all"
                            >
                              <ThumbsUp
                                size={18}
                                color={blogLiked ? "#16a34a" : "#9ca3af"}
                                fill={blogLiked ? "#16a34a" : "none"}
                              />

                              <span
                                style={{
                                  color: blogLiked ? "#16a34a" : "#374151",
                                  fontWeight: 500,
                                  fontSize: "13px",
                                }}
                              >
                                {blogLikeCount}
                              </span>
                            </button>

                            <Bookmark
                              size={21}
                              className="text-body cursor-pointer"
                            />
                          </div>
                          <div
                            className="d-flex align-items-center item-center gap-1 "
                            style={{ marginRight: "20px" }}
                          >
                            <span className="me-1 fw-bold">امتیاز:</span>

                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() => handleRateNews(star)}
                                style={{
                                  cursor: "pointer",
                                  fontSize: "20px",
                                  color:
                                    star <= newsRate ? "#facc15" : "#d1d5db",
                                  transition: "0.2s",
                                }}
                              >
                                ★
                              </span>
                            ))}

                            <span
                              className="ms-2 text-muted"
                              style={{ fontSize: "13px" }}
                            >
                              {newsRate}/5
                            </span>
                          </div>
                        </div>
                        <UncontrolledDropdown className="dropdown-icon-wrapper">
                          <DropdownToggle tag="span">
                            <Share2
                              size={21}
                              className="text-body cursor-pointer"
                            />
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem className="py-50 px-1">
                              <GitHub size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Gitlab size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Facebook size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Twitter size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Linkedin size={18} />
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12" id="blogComment">
                  <h6 className="section-label">نظرات کاربران</h6>{" "}
                  {renderComments()}
                </Col>
                <Col sm="12">
                  <h6 className="section-label">ارسال دیدگاه</h6>{" "}
                  <Card>
                    <CardBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmitComment();
                        }}
                      >
                        <Row>
                          <Col sm="12">
                            <div className="mb-2">
                              <Input
                                className="mb-2"
                                type="textarea"
                                rows="4"
                                placeholder="متن دیدگاه خود را وارد کنید..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                              />
                            </div>
                          </Col>

                          <Col sm="12">
                            <Button
                              color="primary"
                              disabled={!commentText.trim()}
                            >
                              ارسال دیدگاه
                            </Button>{" "}
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default BlogDetails;
