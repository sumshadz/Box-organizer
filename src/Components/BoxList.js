import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import './style.css';

const BoxList = (props) => {
	const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [row, setRow] = React.useState(props.rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRemove = async(index) => {
    try {
      const boxId=row[index].id;
      const response = await fetch(`http://localhost:3000/boxes/${boxId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove box');
      }
      window.alert('Successfully deleted!');
    } catch (error) {
      window.alert('Unable to delete');
    }
  };
  return (
	<div className='boxListContainer'>
		<Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
      <Table sx={{ minWidth: 550 }} style={{height:"100px"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Box Number</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Width</TableCell>
            <TableCell align="right">Length</TableCell>
            <TableCell align="right">Box Address</TableCell>
            <TableCell align="right">Box Weight</TableCell>
			<TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
		  .map((row,index) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.height}</TableCell>
			  <TableCell align="right">{row.width}</TableCell>
			  <TableCell align="right">{row.depth}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
			  <TableCell align="right"><button className='remove' onClick={()=>handleRemove(index)}>Remove</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	<TablePagination
	    rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={row.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
	  </Paper>
	</div>
  )
}

export default BoxList