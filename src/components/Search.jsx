import React from "react";
import styled from "styled-components";
import * as BiIcons from "react-icons/bi";

const SearchContainer = styled.div`
  width: 100%;
`;

const SearchField = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 15px;
  border: 15px;
  text-indent: 20px;
  ::placeholder {
    padding-left: 10px;
  }
`;

const SearchIcon = styled.span`
  margin-left: -20px;
`;

function Search(props) {
  return (
    <SearchContainer>
      <SearchField type="search" placeholder="Search" />
      <SearchIcon>
        <BiIcons.BiSearch />
      </SearchIcon>
    </SearchContainer>
  );
}

export default Search;
