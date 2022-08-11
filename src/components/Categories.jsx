import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  height: 200px;
`;

const Table = styled.table`
  flex: 1;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  align-item: space-between;
`;

const TableHeading = styled.thead`
  font-weight: bold;
  height: 30px;
`;

function Categories(props) {
  return (
    <TableContainer>
      <Table>
        <TableHeading>
          <TableRow>
            <td>CATEGORIES</td>
          </TableRow>
        </TableHeading>
        <TableBody>
          <TableRow>
            <td>Category 1</td>
            <td>22</td>
          </TableRow>
          <TableRow>
            <td>Category 2</td>
            <td>5</td>
          </TableRow>
          <TableRow>
            <td>Category 3</td>
            <td>10</td>
          </TableRow>
          <TableRow>
            <td>Category 4</td>
            <td>12</td>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Categories;
