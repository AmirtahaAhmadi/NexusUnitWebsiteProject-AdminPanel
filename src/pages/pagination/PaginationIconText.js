// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

// ** Third Party Components
import ReactPaginate from "react-paginate";

const Previous = () => {
  return (
    <span className="align-middle d-none d-flex flex-row-reverse">بعدی</span>
  );
};

const Next = () => {
  return (
    <div className="align-middle d-none  d-flex flex-row-reverse">قبلی</div>
  );
};

const IconTextPagination = ({ totalCount, rowsofpage, page, setpage }) => {
  const getallpages = Math.ceil(totalCount / rowsofpage);
  const forcepagevalue = page - 1;
  return (
    <div style={{ backgroundColor: "#f3f2f7", borderRadius: "16px" }} dir="ltr">
      <CardBody>
        <ReactPaginate
          pageCount={getallpages}
          forcePage={forcepagevalue}
          breakLabel="..."
          nextLabel={<Previous />}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          activeClassName="active"
          pageClassName="page-item"
          breakClassName="page-item"
          previousLabel={<Next />}
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          nextClassName="page-item  prev"
          breakLinkClassName="page-link"
          previousClassName=" next page-item  "
          previousLinkClassName="page-link"
          containerClassName="pagination react-paginate"
          onPageChange={(e) => {
            setpage(e.selected + 1);
          }}
        />
      </CardBody>
    </div>
  );
};
export default IconTextPagination;
