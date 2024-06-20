'use client'
import React, { useState, useEffect } from 'react'
import axios from "axios"

function page() {
	const [formData, setData] = useState({
		name:"",
		age:""
	})

	const [formData2, setData2] = useState([])

	const fetchData = async () => {
		try {
			const response = await axios.get('/api');
			setData2(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
			alert("Data is not fetched. Please try again later.");
		}
	};

	useEffect(() => {
		fetchData();
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
		  ...prevData,
		  [name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		// Form validation
		if (isNaN(parseInt(formData.age))) {
			alert('Age must be a valid number');
			return;
		}
	
		let data = {
			name: formData.name,
			age: formData.age,
		};
	
		// Check if the ID already exists
		const existingData = formData2.find(element => element.id === formData.id);
		if (existingData) {
			// If the ID exists, trigger update logic
			updatedata(formData._id);
			return;
		}
	
		// If the ID doesn't exist, proceed with create logic
		try {
			await axios.post('/api', data);
			alert('Data is posted successfully');
	
			setData({ name: '', age: '', id: '' }); // Clear the form fields
			fetchData();
		} catch (error) {
			console.error('Error submitting data:', error);
			alert('Data submission failed. Please try again later.');
		}
	};

	const updatedata = async (id) => {
		try {
			// Prepare the data to be sent in the PUT request
			console.log(id)
			const requestData = {
				name: formData.name,
				age: formData.age,
			};
			console.log(requestData)
			// Make the PUT request using Axios
			const response = await axios.put(`/api/${id}`, requestData);
	
			// Check if the request was successful (status code 200)
			if (response.status === 200) {
				console.log("Data is updated successfully");
				// Fetch updated data after successful update
				fetchData();
				formData.name = ""
				formData.age = ""
			} else {
				// Handle unexpected response status codes
				console.error("Unexpected response:", response);
				alert("Data update failed. Please try again later.");
			}
		} catch (error) {
			// Handle any errors that occur during the request
			console.error("Error updating data:", error);
			alert("Data update failed. Please try again later.");
		}
	};
	
	  

	const deletedata = async (id) => {
		console.log(id)
		try{
			await axios.delete(`/api/${id}`);
			alert("Data is deleted successfully");
			fetchData();
		}catch(error){
			console.error("Error deleting data:", error);
			alert("Data is not deleted. Please try again later.");
		}
	  }
	  
	  const getdata = async (id) => {
		console.log(id)
		try{
			const response = await axios.get(`/api/${id}`);
			setData(response.data);
			fetchData();
			console.log(response.data)
		}catch(error){
			console.error("Error getting data:", error);
			alert("Data is not fetched. Please try again later.");
		}
	  }

  return (
	<div className='flex justify-center items-center h-screen'>
		<div className='p-4 bg-gray-600 max-[1200px] text-white rounded-lg'>
			<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
				<div className="flex items-center">
					<label htmlFor="name" className="mr-2 w-20">Name:</label>
					<input
					type="text"
					name="name"
					id="name"
					value={formData.name}
					onChange={handleChange}
					className="rounded bg-gray-400 text-white px-2 py-1 flex-1"
					/>
				</div>
				<div className="flex items-center">
					<label htmlFor="age" className="mr-2 w-20">Age:</label>
					<input
					type="text"
					name="age"
					id="age"
					value={formData.age}
					onChange={handleChange}
					className="rounded bg-gray-400 text-white px-2 py-1 flex-1"
					/>
				</div>
				<button type='submit' className='p-2 rounded bg-gray-900 text-white'>Submit</	 button>
				</form>

				<table className='border-collapse border mt-4 w-full'>
					<thead>
						<tr className='border bg-gray-700'>
							<th className="border px-4 py-2">Name</th>
							<th className="border px-4 py-2">Age</th>
						</tr>
					</thead>
					<tbody>
						{formData2.map((element, index) => (
							<tr key={index} className='border'>
								<td className="border px-4 py-2">{element.name}</td>
								<td className="border px-4 py-2">{element.age}</td>
								<td><button className='bg-red-500 p-2 rounded ml-2' onClick={()=> deletedata(element._id)}>Delete</button></td>
								<td><button className='bg-green-500 p-2 pl-4 pr-4 rounded' onClick={()=> getdata(element._id)}>Edit</button></td>
							</tr>
						))}
					</tbody>
				</table>
		</div>
	</div>
  )
}

export default page