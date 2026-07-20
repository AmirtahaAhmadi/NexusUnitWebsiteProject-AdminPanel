// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons
import { MoreVertical } from "react-feather";

// ** Reactstrap
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from "reactstrap";

const formatPersianDate = (date) => {
  if (!date) return "-";

  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(date));
  } catch {
    return date;
  }
};

const shortenText = (text = "", length = 55) => {
  if (!text) return "بدون متن";
  return text.length > length
    ? `${text.substring(0, length)}...`
    : text;
};

const normalizeComment = (item = {}) => ({
  id: item.id || item.commentId,

  title: item.title || "بدون عنوان",

  courseTitle:
    item.courseTitle ||
    item.course?.title ||
    "بدون نام دوره",

  text: shortenText(item.describe || ""),

  fullText: item.describe || "",

  author: item.author || "کاربر",

  avatar: item.pictureAddress,

  date: formatPersianDate(item.insertDate)
});

const CardTransactions = ({ comments = [] }) => {
  const list = Array.isArray(comments)
    ? comments
    : comments?.myCommentsDtos || [];

  return (
    <Card className="card-transaction">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle tag="h4">
          آخرین نظرات من
        </CardTitle>

        <MoreVertical size={18} className="cursor-pointer" />
      </CardHeader>

      <CardBody>
        {!list.length ? (
          <div className="text-center py-3 text-muted">
            نظری برای نمایش وجود ندارد.
          </div>
        ) : (
          list.slice(0, 5).map((raw) => {
            const item = normalizeComment(raw);

            return (
              <div
                key={item.id}
                className="transaction-item d-flex justify-content-between align-items-start mb-2 pb-2 border-bottom"
              >
                <div className="d-flex">

                  <Avatar
                    img={item.avatar}
                    imgHeight="45"
                    imgWidth="45"
                    content={item.author}
                    color=""
                    className="p-0 m-0 shadow-none border-0 bg-transparent"
                  />

                  <div className="ms-1">

                    <h6 className="mb-25 fw-bold">
                      {item.title}
                    </h6>

                    <small className="text-primary d-block mb-25">
                      {item.courseTitle}
                    </small>

                    <small
                      className="text-muted d-block"
                      title={item.fullText}
                    >
                      {item.text}
                    </small>

                    <small className="text-success">
                      {item.author}
                    </small>

                  </div>
                </div>

                <small className="text-muted">
                  {item.date}
                </small>
              </div>
            );
          })
        )}
      </CardBody>
    </Card>
  );
};

export default CardTransactions;