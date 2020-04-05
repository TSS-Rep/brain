import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  return (
    <InputGroup id="SearchBar">
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2 text-white"
      />
      <InputGroup.Prepend id="searchButton">
        <Button variant="outline-info">
          <FaSearch />
        </Button>
      </InputGroup.Prepend>
    </InputGroup>
  );
};

export default SearchBar;
