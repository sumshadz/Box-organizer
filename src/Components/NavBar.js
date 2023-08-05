import React from 'react';
import { AppContext } from './userContext';
import { useContext } from 'react';
import './style.css';

const NavBar = () => {

	const { state, setState } = useContext(AppContext);
	const handleTriggerPlacement = () => {
		setState(!state);
		console.log(state);
	};

  return (
	<>
	<div className='navBar'>
		<h2 className='navHead'>Aurm</h2>

		{/* This is a button to Triggers placements of the list of boxes
		When button is clicked, if 'state' variable is true it is set to false and vice-versa
  */}
		{state===false?
		<button className='triggerPlacement' onClick={handleTriggerPlacement}>Trigger Placement</button>:
		<button className='triggerPlacement' onClick={handleTriggerPlacement}>Undo Placement</button>}
	</div>
	</>
  )
}

export default NavBar