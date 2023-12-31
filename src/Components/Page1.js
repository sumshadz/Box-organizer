import React from 'react';
import { useState, useContext } from 'react';
import { AppContext } from './userContext';
import BoxList from './BoxList';
import ArrangedBoxList from './ArrangedBoxList';
import './style.css'

const Page1 = () => {

	const[formData, setFormData] = useState(
		{
			id:"",
			height:null,
			width:null,
			length:null,
			weight:null,
			address:"",
		}
	);
	const { state} = useContext(AppContext);
	const {boxList, setBoxList} = useContext(AppContext);

	//function to handle form inputs
	const handleChange = (e) =>{
		const {name , value}   = e.target;
		setFormData({
			...formData,
			[name]: value < 0 ? 0 : value,
		  });
	}

	//function to reset form data
	const handleReset = () =>{
		setFormData({
			id:"",
			height:null,
			width:null,
			length:null,
			weight:null,
			address:"",
		})
	}

	//function to add box into list of boxes
	const handleSubmit = (e) =>{
		e.preventDefault();
		const temp={
			id:formData.id,
			height:formData.height,
			width:formData.width,
			length:formData.length,
			weight:formData.weight,
			address:formData.address,
		}
		console.log(temp);
		const updatedBoxList = [...boxList, temp];
		handleReset()
		setBoxList(updatedBoxList); 
		console.log(boxList);
		window.alert("box added");
	}

  return (
	<>
	<div className='page1Container'>


       {/* Form to collect attributes of boxes and add it to list of Boxes
        */}
		<div className='left'>
			<h2>Enter box details</h2>
			<form onSubmit={handleSubmit}>

				<div className='formInputsAttributes'>
					<div className='boxAttributes'>
					<label htmlFor='height'>Height <span className='labelSpan'>(in m)</span></label>
				<input id='height' name='height' type='number' value={formData.height} onChange={handleChange} />
					</div>
					<div className='boxAttributes'>
					<label htmlFor='width'>Width <span className='labelSpan'>(in m)</span></label>
				<input id='width' name='width' type='number' value={formData.width} onChange={handleChange} />
					</div>
					<div className='boxAttributes'>
					<label htmlFor='length'>Length <span className='labelSpan'>(in m)</span></label>
				<input id='length' name='length' type='number' value={formData.length} onChange={handleChange} />
					</div>
				
				</div>
				<div className='formInputs'>
				<label htmlFor='weight'>Weight <span className='labelSpan'>(in kg)</span></label>
				<input id='weight' name='weight' type='number' value={formData.weight} onChange={handleChange} />
				</div>

				<div className='formInputs'>
				<label htmlFor='address'>Address</label>
				<input id='address' name='address' type='text' value={formData.address} onChange={handleChange} />
				</div>

				<div className='formInputs'>
				<label htmlFor='id'>Id</label>
				<input id='id' name='id' type='text' value={formData.id} onChange={handleChange} />
				</div>

				<div className='formButtons'>
					<button type='submit'>Add</button>
					<button type='reset' onClick={handleReset}>Reset</button>
				</div>
			</form>
		</div>

      {/* This section will show list of boxes if 'state' is false else will show arranged boxes
      */}
		<div className='right'>
        {state===true?<ArrangedBoxList/>:<BoxList/>}
        </div>

	</div>
	</>
  )
}

export default Page1;