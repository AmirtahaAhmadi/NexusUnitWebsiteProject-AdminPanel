// ** Icons Imports
import { Search, ArrowUp, ArrowDown } from "react-feather";
// ** Reactstrap Imports
import {
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupText,
  Button,
} from "reactstrap";
import { useState } from "react";

const CoursegroupSeachbar = ({
  query,
  setQuery,
  sortingcol,
  setsortingcol,
  SortType,
  setSortType,
}) => {
  const [value, setvalue] = useState(query || "");

  const handleSearch = (searchValue) => {
    const finalQuery = searchValue !== undefined ? searchValue : value;
    setQuery(finalQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilter = () => {
    setvalue("");
    setQuery("");
    setsortingcol("groupCapacity");
    setSortType("desc");
  };

  return (
    <div
      id="ecommerce-searchbar"
      className="ecommerce-searchbar"
      style={{ marginBottom: "15px" }}>
      <Row className="mt-1 t-max-w-[600px]">
        <Col sm="12">
          <InputGroup className="input-group-merge">
            <Input
              className="search-product"
              placeholder="جستجو..."
              value={value}
              onChange={(e) => setvalue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <InputGroupText
              onClick={() => handleSearch()}
              style={{ cursor: "pointer" }}>
              <Search className="text-muted" size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>

      <Row className="mt-2 align-items-center">
        <Col
          sm="12"
          className="d-flex flex-wrap align-items-center"
          style={{ gap: "10px" }}>
          <span style={{ fontSize: "13px" }}>مرتب‌سازی بر اساس:</span>

          <Button
            size="sm"
            color={sortingcol === "groupName" ? "primary" : "outline-primary"}
            onClick={() => setsortingcol("groupName")}>
            نام گروه
          </Button>

          <Button
            size="sm"
            color={
              sortingcol === "groupCapacity" ? "primary" : "outline-primary"
            }
            onClick={() => setsortingcol("groupCapacity")}>
            ظرفیت گروه
          </Button>

          <Button
            size="sm"
            color="flat-secondary"
            className="d-flex align-items-center me-auto"
            onClick={() => setSortType(SortType === "asc" ? "desc" : "asc")}>
            {SortType === "asc" ? (
              <>
                صعودی <ArrowUp size={14} className="ms-50" />
              </>
            ) : (
              <>
                نزولی <ArrowDown size={14} className="ms-50" />
              </>
            )}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CoursegroupSeachbar;
