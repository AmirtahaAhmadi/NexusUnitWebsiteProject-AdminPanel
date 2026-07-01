// ** Icons Imports
import { Search } from "react-feather";
import { setSearchQuery } from "../../../redux/courseSlice";
import { useDispatch } from "react-redux";
// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from "reactstrap";
import { useEffect, useState } from "react";

const ProductsSearchbar = () => {
  const dispatch = useDispatch();
  const [value, setvalue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(value));
    }, 3000);
    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div
      id="ecommerce-searchbar"
      className="ecommerce-searchbar"
      style={{ marginBottom: "10px" }}>
      <Row className="mt-1">
        <Col sm="12">
          <InputGroup className="input-group-merge">
            <Input
              className="search-product"
              placeholder="جست و جو"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
            />
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsSearchbar;
