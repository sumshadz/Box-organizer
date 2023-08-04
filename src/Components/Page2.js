import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import './style.css';

const Page2 = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [row, setRow] = React.useState([]);
	const[isLoading, setIsLoading] = useState(true);
	const url = "http://localhost:3000/";

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getBoxList = async() =>{
		try{
			let response = await fetch(url+"boxes");
			if(!response.ok) throw new Error('Failed to fetch');
			const data = await response.json();
			await setRow(data);
			await setIsLoading(false);
		}
		catch(error){
			console.log(error);
		}
	}
  
  useEffect(()=>{
		getBoxList();
	},[])

  if(isLoading) return <p>Loading ...</p>

  return (
	<div className='boxListContainer'>
    <h2>Maximum Height : 20</h2>
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

export default Page2