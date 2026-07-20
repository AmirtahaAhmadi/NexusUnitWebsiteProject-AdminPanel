// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons
import { MoreVertical, MessageCircle } from "react-feather";

// ** Reactstrap
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const normalizeComment = (item = {}) => {
  const title =
    item.courseTitle ||
    item.course?.title ||
    item.courseName ||
    item.title ||
    "دوره";

  const text =
    item.comment ||
    item.desc ||
    item.description ||
    item.text ||
    item.commentText ||
    item.body ||
    "بدون متن";

  const date =
    item.insertDate ||
    item.createDate ||
    item.lastUpdate ||
    item.date ||
    "";

  const author =
    item.fullName ||
    (item.fName ? `${item.fName} ${item.lName || ""}`.trim() : "") ||
    item.userName ||
    "";

  return {
    id: item.id || item.commentId,
    title,
    text,
    date,
    author,
  };
};

const CardTransactions = ({ comments = [] }) => {
  const list = Array.isArray(comments)
    ? comments
    : comments?.myCommentsDtos || [];

  const renderComments = () => {
    if (!list.length) {
      return (
        <div className="text-center text-muted py-2">
          نظری برای نمایش وجود ندارد.
        </div>
      );
    }

    return list.slice(0, 5).map((raw, index) => {
      const item = normalizeComment(raw);

      return (
        <div
          key={item.id || index}
          className="transaction-item d-flex justify-content-between align-items-center mb-2"
        >
          <div className="d-flex">
            <Avatar
              className="rounded"
              color="light-primary"
              icon={<MessageCircle size={18} />}
            />

            <div className="ms-1">
              <h6 className="transaction-title mb-25">{item.title}</h6>

              <small className="text-muted d-block">{item.text}</small>

              {item.author && (
                <small className="text-muted">{item.author}</small>
              )}
            </div>
          </div>

          <div className="text-end">
            <small className="text-muted">{item.date}</small>
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">آخرین نظرات من</CardTitle>
        <MoreVertical size={18} className="cursor-pointer" />
      </CardHeader>

      <CardBody>{renderComments()}</CardBody>
    </Card>
  );
};

export default CardTransactions;