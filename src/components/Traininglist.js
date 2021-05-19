import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddTraining from './AddTraining';
import Snackbar from '@material-ui/core/Snackbar';


function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

	useEffect(() => {
		fetchTrainings();
	}, []);

	const openSnackBar = () => {
		setOpen(true);
	}

	const closeSnackBar = () => {
		setOpen(false);
	}

    const fetchTrainings = () => {
		fetch('https://customerrest.herokuapp.com/api/trainings')
		.then(response => response.json())
		.then(data => setTrainings(data.content))
		.catch(err => console.error(err))
	  }
	

	// const addTraining = (newTraining) => {
	// 	fetch('https://customerrest.herokuapp.com/gettrainings',
	// 	{
	// 		method: 'POST',
	// 		body: JSON.stringify(newTraining),
	// 		headers: { 'Content-type' : 'application/json' }
	// 	})
	// 	.then(_ => fetchTrainings())
	// 	.catch(err => console.error(err))
	// }

	const deleteTraining = (url) => {
		if (window.confirm('Are you sure you want to delete this training session?')) {
		fetch(url, { method: 'DELETE' })
		.then(response => {
			if(response.ok) {
				fetchTrainings()
				setMsg('Training deleted succesfully')
				setOpen(true)
				openSnackBar();
			}	else {
				alert('Something went wrong when trying to delete customer')
			}
		})
		.catch(err => console.error(err))
		}
	}

	const columns = [
		{ field: 'date', cellRenderer: (data) => { 
			return moment(data.value).format("LLL");} 
		},
		{ field: 'duration', sortable: true, filter: true},
		{ field: 'activity', sortable: true, filter: true},
		{ 
			headerName: '',
			field: 'links', 
			cellRendererFramework: params => 
				<IconButton color="secondary" onClick={() =>deleteTraining("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)}>
					<DeleteIcon />
				</IconButton>
		}
	]

	// const links = [
	// 	{ field: 'links.href' }
	// ]

  return (
	  <div>
		<div className='ag-theme-material' style={{ height: 800, width: '90%', margin: 'auto'}}>
			<AgGridReact 
							rowData={trainings}
							columnDefs={columns}
							pagination={true}
							paginationPageSize={10}
							floatingFilter={true}
							suppressCellSelection={true}
						/>
		</div>
		<Snackbar open={open} autoHideDuration={4000} 
        onClose={closeSnackBar} message={msg} />
	  </div>
  );
}

export default Traininglist;