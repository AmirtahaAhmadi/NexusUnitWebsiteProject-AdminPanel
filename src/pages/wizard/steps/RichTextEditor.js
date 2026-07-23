import { useEffect, useMemo, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { globalformData } from "../../../redux/zustan/formdata";
import {
  ClassicEditor,
  Autoformat,
  AutoLink,
  AutoImage,
  Autosave,
  BalloonToolbar,
  Bold,
  Code,
  CodeBlock,
  CloudServices,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Mention,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  ShowBlocks,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Underline,
  HorizontalLine,
  Highlight,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Alignment,
  Font,
  Indent,
  IndentBlock,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const RichTextEditor = ({ field = "Describe" }) => {
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const value = globalformData((state) => state.formData[field]);
  const updateformdata = globalformData((state) => state.updateformdata);

  useEffect(() => {
    setIsLayoutReady(true);

    // Inject CSS directly to control height and branding removal
    const style = document.createElement("style");
    style.id = "ckeditor-custom-overrides";
    style.innerHTML = `
      /* Force editor height to be exactly 500px min */
      .ck-editor__editable_inline {
        min-height: 500px !important;
      }
      
      /* Hide "Powered by" branding */
      .ck-powered-by,
      .ck-powered-by-wrapper,
      .ck-body-wrapper .ck-powered-by,
      .ck-balloon-panel .ck-powered-by {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      setIsLayoutReady(false);
      const existingStyle = document.getElementById(
        "ckeditor-custom-overrides",
      );
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  const editorConfig = useMemo(() => {
    if (!isLayoutReady) return null;

    return {
      licenseKey: "GPL",
      removePlugins: ["PoweredBy"],
      placeholder: "توضیحات را وارد کنید...",
      initialData: value || "",

      plugins: [
        Autoformat,
        AutoLink,
        AutoImage,
        Autosave,
        BalloonToolbar,
        Bold,
        Code,
        CodeBlock,
        CloudServices,
        Essentials,
        GeneralHtmlSupport,
        Heading,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        Mention,
        Paragraph,
        PasteFromOffice,
        PictureEditing,
        ShowBlocks,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        Underline,
        HorizontalLine,
        Highlight,
        SpecialCharacters,
        SpecialCharactersEssentials,
        Alignment,
        Font,
        Indent,
        IndentBlock,
      ],
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "showBlocks",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "code",
          "|",
          "link",
          "insertImage",
          "insertImageViaUrl",
          "insertTable",
          "codeBlock",
          "htmlEmbed",
          "horizontalLine",
          "specialCharacters",
          "|",
          "alignment",
          "fontSize",
          "fontColor",
          "fontBackgroundColor",
          "highlight",
          "|",
          "bulletedList",
          "numberedList",
          "outdent",
          "indent",
        ],
        shouldNotGroupWhenFull: true,
      },
      balloonToolbar: [
        "bold",
        "italic",
        "|",
        "link",
        "insertImage",
        "|",
        "bulletedList",
        "numberedList",
      ],
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true,
          },
        ],
      },
      image: {
        toolbar: [
          "toggleImageCaption",
          "imageTextAlternative",
          "|",
          "imageStyle:inline",
          "imageStyle:block",
          "imageStyle:side",
          "|",
          "resizeImage",
        ],
      },
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableProperties",
          "tableCellProperties",
        ],
      },
    };
  }, [isLayoutReady]);

  return (
    <>
      {isLayoutReady && editorConfig && (
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={value || ""}
          onChange={(event, editor) => {
            updateformdata({
              [field]: editor.getData(),
            });
          }}
        />
      )}
    </>
  );
};

export default RichTextEditor;
