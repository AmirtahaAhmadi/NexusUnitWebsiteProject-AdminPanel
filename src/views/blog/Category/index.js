// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Table Import
import Table from "./Table";

const Permissions = () => {
  return (
    <Fragment>
    <h3>لیست دسته‌بندی‌ها</h3>

<p className="text-muted">
  در این بخش می‌توانید دسته‌بندی‌های سیستم را ایجاد، ویرایش و مدیریت کنید.
</p>
      <Card>
        <div className="card-datatable app-user-list table-responsive">
          <Table />
        </div>
      </Card>
    </Fragment>
  );
};

export default Permissions;