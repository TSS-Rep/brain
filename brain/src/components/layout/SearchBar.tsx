import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  return (
    <Row>
      <Col id="SearchBar">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2 text-white"
        />
      </Col>
      <Col>
        <Button variant="outline-info">
          <FaSearch />
        </Button>
      </Col>
    </Row>
  );
};

export default SearchBar;
