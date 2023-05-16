import React from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const StyledTableContainer = styled(TableContainer)({
  marginBottom: '2rem',
});

const StyledTable = styled(Table)({
  width: '100%',
  borderCollapse: 'collapse',
});

const StyledTableHeadCell = styled(TableCell)({
  padding: '12px',
  fontWeight: 'bold',
  borderBottom: '1px solid #ddd',
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(even)': {
    backgroundColor: '#f9f9f9',
  },
});

const StyledTableCell = styled(TableCell)({
  padding: '12px',
  borderBottom: '1px solid #ddd',
});

function RenderTableCategory({ totalsByCategory }) {
  return (
    <StyledTableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>Category</StyledTableHeadCell>
            <StyledTableHeadCell>Total Spend</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {totalsByCategory.map((category, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{category.category}</StyledTableCell>
              <StyledTableCell>{category.total.toFixed(2)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export default RenderTableCategory;