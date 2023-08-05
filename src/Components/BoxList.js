import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useState, useContext } from 'react';
import { AppContext } from './userContext';
import './style.css';

const BoxList = () => {
	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {boxList, setBoxList} = useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRemove = async(id) => {
    const updatedBoxList = boxList.filter((box) => box.id !== id);
    setBoxList(updatedBoxList);
    window.alert("box removed");
  };
  return (
	<div className='boxListContainer'>
		<Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        {/* Table to display list of boxes */}
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
          {boxList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
			  <TableCell align="right">{row.length}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
			  <TableCell align="right"><button className='remove' onClick={()=>handleRemove(row.id)}>Remove</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	<TablePagination
	    rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={boxList.length}
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