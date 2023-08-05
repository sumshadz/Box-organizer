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
  const [height, setHeight] = React.useState(0);
	const { boxList, arrangedBoxList, setArrangedBoxList } = useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to arrange the boxes
  function arrangeBoxes(boxes) {
    let rotatedBoxes = [];
    //store all the rotation of array
  for (const box of boxes) {
    const { height, width, length, weight, address } = box;
    rotatedBoxes.push({ id: box.id, height, width:Math.max(width, length), length:Math.min(width, length), weight, address });
    rotatedBoxes.push({ id: box.id, height: width, width: Math.max(length, height), length: Math.min(length, height), weight, address });
    rotatedBoxes.push({ id: box.id, height: length, width: Math.max(width, height), length: Math.min(width, height), weight, address });
  }

  
  rotatedBoxes.sort((a, b) => (b.width * b.length) - (a.width * a.length));

  // Create an array to store the maximum height of the stack for each box
  const maxHeight = new Array(rotatedBoxes.length).fill(0);

  // Initialize the array with the height of each box
  for (let i = 0; i < rotatedBoxes.length; i++) {
    maxHeight[i] = rotatedBoxes[i].height;
  }


  for (let i = 1; i < rotatedBoxes.length; i++) {
    for (let j = 0; j < i; j++) {
      // Check if the current box can be placed on top of the j-th box.
      if (
        rotatedBoxes[i].width < rotatedBoxes[j].width &&
        rotatedBoxes[i].length < rotatedBoxes[j].length
      ) {
        // Update the maximum height if placing the current box on top of j-th box yields a taller stack.
        maxHeight[i] = Math.max(maxHeight[i], maxHeight[j] + rotatedBoxes[i].height);
      }
    }
  }

  // Find the maximum height
  const maxStackHeight = Math.max(...maxHeight);
setHeight(maxStackHeight);


  // let stack = [];
  // let currentIndex = maxHeight.indexOf(maxStackHeight);
  // while (currentIndex >= 0) {
  //   stack.unshift(rotatedBoxes[currentIndex]);
  //   for (let j = currentIndex - 1; j >= 0; j--) {
  //     if (
  //       rotatedBoxes[currentIndex].width < rotatedBoxes[j].width &&
  //       rotatedBoxes[currentIndex].length < rotatedBoxes[j].length &&
  //       maxHeight[currentIndex] === maxHeight[j] + rotatedBoxes[currentIndex].height
  //     ) {
  //       currentIndex = j;
  //       break;
  //     }
  //   }
  //   currentIndex--;
  // }
  // console.log(stack);
  // return stack;
  }

  //Function to get list of boxes after arranging them in stack
  const getBoxList = () =>{
		const arrangedBoxes = arrangeBoxes(boxList);
    setArrangedBoxList([]);
	}
  
  useEffect(()=>{
		getBoxList();
	},[])


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
          {arrangedBoxList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	<TablePagination
	    rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={arrangedBoxList.length}
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