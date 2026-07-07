// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons
import { MoreVertical, MessageCircle } from "react-feather";

// ** Reactstrap
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const CardTransactions = ({ comments = [] }) => {
  const renderComments = () => {
    if (!comments.length) {
      return (
        <div className="text-center text-muted py-2">
          نظری برای نمایش وجود ندارد.
        </div>
      );
    }

    return comments.slice(0, 5).map((item, index) => (
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
            <h6 className="transaction-title mb-25">
              {item.courseTitle || item.courseName || "دوره"}
            </h6>

            <small className="text-muted">
              {item.comment || item.description || "بدون متن"}
            </small>
          </div>
        </div>

        <div className="text-end">
          <small className="text-muted">
            {item.insertDate || item.createDate || ""}
          </small>
        </div>
      </div>
    ));
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
