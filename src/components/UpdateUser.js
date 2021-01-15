import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		outline: 0,
		padding: theme.spacing(0, 4, 3)
	},
	country: {
		width: 230
	}
}));

export default function TransitionsModal(props) {
	const classes = useStyles(),
	[open, setOpen] = useState(false),
	[name, setName] = useState(''),
	[surname, setSurname] = useState(''),
	[country, setCountry] = useState('');

	const handleClose = (param) => {
		setOpen(false);
		props.modalClose(param);
	};

	const handleChangeName = (event) => {
        const name = event.target.value;
        setName(name);
	}

	const handleChangeSurname = (event) => {
        const surname = event.target.value;
        setSurname(surname);
	}

	const handleChangeCountry = (event) => {
		const country = event.target.value || event.target.textContent;
        setCountry(country);
	}

    const handleSubmit = () => {
		handleClose({name, surname, country});
		return false;
	}

	const loadModal = () => {
		if (props.open) {
			setOpen(true);
			setName(props.data.name);
			setSurname(props.data.surname);
			setCountry(props.data.country);
		}
		else
			handleClose();
	}

	useEffect(() => { loadModal() }, [props.open]);

	return (
		<Modal
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{timeout: 500}}>
			<Fade in={open}>
				<div className={classes.paper}>
					<center><h2 id="transition-modal-title">Update user's details</h2></center>
					<ValidatorForm onSubmit={handleSubmit}>
						<Grid container spacing={1} alignItems="flex-end">
							<Grid item>
								<AccountCircle />
							</Grid>
							<Grid item>
								<TextValidator label="name" name="name" value={name} onChange={handleChangeName} validators={['required', 'matchRegexp:^[a-zA-Z_ -]+$']} errorMessages={['Required field', 'Name is invalid!']}/>
							</Grid>
						</Grid>
						<Grid container spacing={1} alignItems="flex-end">
							<Grid item>
								<AccountCircle />
							</Grid>
							<Grid item>
								<TextValidator label="surname" name="surname" value={surname} onChange={handleChangeSurname} validators={['required', 'matchRegexp:^[a-zA-Z_ -]+$']} errorMessages={['Required field', 'Surname is invalid!']}/>
							</Grid>
						</Grid>
						<br/>
						<Autocomplete inputValue={country} onChange={handleChangeCountry} options={props.countries} getOptionLabel={(option) => option.country} className={classes.country} renderInput={(params) => <TextValidator {...params} id="country" name="country" label="Country" variant="outlined" value={country} onChange={handleChangeCountry} validators={['required']} errorMessages={['Required field']} />}/>
						<br/>
						<center><Button type="submit" variant="contained" color="primary">Update</Button></center>
					</ValidatorForm>
				</div>
			</Fade>
		</Modal>
	);
}