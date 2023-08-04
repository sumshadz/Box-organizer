import React, { useEffect } from 'react';
import { useState } from 'react';
import BoxList from './BoxList';
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
	const[boxList, setBoxList] = useState([]);
	const[isLoading, setIsLoading] = useState(true);
	const url = "http://localhost:3000/";

	const getBoxList = async() =>{
		try{
			let response = await fetch(url+"boxes");
			if(!response.ok) throw new Error('Failed to fetch');
			const data = await response.json();
			await setBoxList(data);
			await setIsLoading(false);
		}
		catch(error){
			console.log(error);
		}
	}
	const handleChange = (e) =>{
		const {name , value}   = e.target;
		setFormData({
			...formData,
			[name]: value < 0 ? 0 : value,
		  });
	}
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
	const handleSubmit = async(e) =>{
		//API call to post form data
		e.preventDefault();

    try {
      const response = await fetch(url+'boxes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      // Handle the successful response here, if needed
      console.log('Form submitted successfully!');
	  window.alert('Box Added!');
	  handleReset();
    } catch (error) {
      console.log(error);
    }
	}

	useEffect(()=>{
		getBoxList();
	},[formData])
  return (
	<>
	<div className='page1Container'>

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

		<div className='right'>
  {isLoading ? <p>Loading...</p> : <BoxList rows={boxList}/>}
</div>

	</div>
	</>
  )
}

export default Page1