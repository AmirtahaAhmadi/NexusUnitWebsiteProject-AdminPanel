// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from "reactstrap";

// ** Images
import medal from "@src/assets/images/illustration/badge.svg";

const CardMedal = ({ profile }) => {
  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h5>
          سلام {profile?.fName} {profile?.lName} 👋
        </h5>

        <CardText className="font-small-3">
          خوش اومدی، امیدواریم امروز هم یادگیری خوبی داشته باشی.
        </CardText>

        <h3 className="mb-75 mt-2 pt-50">
          {profile?.profileCompletionPercentage ?? 0}%
        </h3>

        <CardText className="font-small-2 text-muted">
          میزان تکمیل پروفایل
        </CardText>

        <Button color="primary">
          مشاهده پروفایل
        </Button>

        <img
          className="congratulation-medal"
          src={medal}
          alt="مدال"
        />
      </CardBody>
    </Card>
  );
};

export default CardMedal;