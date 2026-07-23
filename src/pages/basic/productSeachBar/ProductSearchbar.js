// ** Icons Imports
import { Search, ArrowUp, ArrowDown } from "react-feather";
import { setSearchQuery } from "../../../redux/courseSlice";
import { useDispatch } from "react-redux";
// ** Reactstrap Imports
import {
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupText,
  Badge,
  Button,
} from "reactstrap";
import { useState } from "react";

const ProductsSearchbar = ({
  getcourse = [],
  sortingcol,
  setsortingcol,
  SortType,
  setSortType,
}) => {
  const dispatch = useDispatch();
  const [value, setvalue] = useState("");
  const [ColorChange, setColorChange] = useState(true);
  const handleSearch = (searchValue) => {
    const query = searchValue !== undefined ? searchValue : value;
    dispatch(setSearchQuery(query));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const selectCategory = (categoryName) => {
    setvalue(categoryName);
    handleSearch(categoryName);
    setColorChange(false);
  };

  const clearFilter = () => {
    setvalue("");
    handleSearch("");
    setColorChange(true);
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
              placeholder="جست و جو..."
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
          {/* 
          <Button
            size="sm"
            color={ColorChange ? "outline-primary" : "outline-primary"}
            style={{ cursor: "pointer", fontSize: "12px" }}
            onClick={clearFilter}>
            همه دوره‌ها
          </Button> */}

          <Button
            size="sm"
            color={sortingcol === "lastUpdate" ? "primary" : "outline-primary"}
            onClick={() => setsortingcol("lastUpdate")}>
            آخرین بروزرسانی
          </Button>

          <Button
            size="sm"
            color={sortingcol === "cost" ? "primary" : "outline-primary"}
            onClick={() => setsortingcol("cost")}>
            قیمت
          </Button>

          <Button
            size="sm"
            color={sortingcol === "capacity" ? "primary" : "outline-primary"}
            onClick={() => setsortingcol("capacity")}>
            ظرفیت
          </Button>

          <Button
            size="sm"
            color="flat-secondary"
            className="d-flex align-items-center ml-auto"
            onClick={() => setSortType(SortType === "asc" ? "desc" : "asc")}>
            {SortType === "asc" ? (
              <>
                {" "}
                صعودی <ArrowUp size={14} className="ms-50" />{" "}
              </>
            ) : (
              <>
                {" "}
                نزولی <ArrowDown size={14} className="ms-50" />{" "}
              </>
            )}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsSearchbar;
