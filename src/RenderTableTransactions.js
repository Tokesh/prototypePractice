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

function RenderTableTransactions({ transactions }) {
  return (
    <StyledTableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>Date</StyledTableHeadCell>
            <StyledTableHeadCell>Description</StyledTableHeadCell>
            <StyledTableHeadCell>Category</StyledTableHeadCell>
            <StyledTableHeadCell>Amount</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>
                {transaction.date && transaction.date.toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell>{transaction.description}</StyledTableCell>
              <StyledTableCell>{transaction.category}</StyledTableCell>
              <StyledTableCell>
                {transaction.amount ? transaction.amount.toFixed(2) : ''}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export default RenderTableTransactions;
