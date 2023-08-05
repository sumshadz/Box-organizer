import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from './userContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import './style.css';

const ArrangedBoxList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [row, setRow] = React.useState([]);
  const [height, setHeight] = React.useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const { url } = useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Function to get list of boxes after arranging them in stack
  const getBoxList = async() =>{
		try{
			let response = await fetch(url+"arrange-boxes");
			if(!response.ok) throw new Error('Failed to fetch');
			const data = await response.json();
			setRow(data);
			setIsLoading(false);
		}
		catch(error){
			console.log(error);
		}
	}

  //Function to get height of stack after arranging the boxes in stack
  const getHeightOfStack = async() =>{
    try{
			let response = await fetch(url+"height-of-stack");
			if(!response.ok) throw new Error('Failed to fetch');
			const data = await response.json();
			setHeight(data);
		}
		catch(error){
			console.log(error);
		}
  }
  
  useEffect(()=>{
		getBoxList();
    getHeightOfStack();
	},[])

  if(isLoading) return <p>Loading ...</p>

  return (
	<div className='boxListContainer'>
    <h2 className='maxHeight'>Maximum Height of Stack: {height} m</h2>
		<Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        {/* Table to display list of boxes after arrangement*/}
      <Table sx={{ minWidth: 550 }} style={{height:"100px"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Box Number</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Width</TableCell>
            <TableCell align="right">Length</TableCell>
            <TableCell align="right">Box Address</TableCell>
            <TableCell align="right">Box Weight</TableCell>
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

export default ArrangedBoxList;