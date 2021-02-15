import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import PublicIcon from '@material-ui/icons/Public';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { observer, inject } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import SnackBar from './SnackBar';
import { SNACKBAR_PROPS, API_PATH }  from '../Constants';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		boxShadow: '7px 7px 7px 0px rgba(0,0,0,0.90)',
		'&:hover': {
			boxShadow: '8px 8px 8px 0px rgba(0,0,0,0.90)'
		},
		outline: 0,
		marginTop: 25,
		marginBottom: 25,
		padding: theme.spacing(1, 2, 2),
		width: '16.5em',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000'
	},
	buttons: {
		width: '100%',
		height: '4em',
		marginTop: 25
	},
	texts: {
		width: '14.2em'
	},
	font: {
		fontFamily: "'Acme', sans-serif",
		margin: 14,
		wordSpacing: 5
	}
}));

const ActionAddNew = observer((props) => {
	const classes = useStyles(),
	[name, setName] = useState(''),
	[surname, setSurname] = useState(''),
	[owner, setOwner] = useState(''),
	[country, setCountry] = useState(''),
	[snack, setSnack] = useState({ message: "", severity: "" });

	const handleChangeName = (event) => {
        const n = event.target.value;
        setName(n);
	}

	const handleChangeSurname = (event) => {
        const sn = event.target.value;
        setSurname(sn);
	}

	const handleChangeOwner = (event) => {
        const ow = event.target.textContent;
        setOwner(ow);
	}

	const handleChangeCountry = (event) => {
        const ct = event.target.textContent;
        setCountry(ct);
	}

	const addNewClient = async() => {
		if (!name || !surname || !owner || !country)
			setSnack({ message: SNACKBAR_PROPS.MessageType.MISSING_INPUT, severity: SNACKBAR_PROPS.SeverityType.WARNING });
		else {
			const countryID = country.split(' ')[0].slice(0, -1),
			ownerID = owner.split(' ')[0].slice(0, -1);
			try {
				await axios.post(`${API_PATH}/addNewAction`, {name, surname, countryID, ownerID});
				setSnack({ message: SNACKBAR_PROPS.MessageType.SUCCESS_SAVED, severity: SNACKBAR_PROPS.SeverityType.SUCCESS });
			}
			catch {
				setSnack({ message: SNACKBAR_PROPS.MessageType.FAILED_SAVING, severity: SNACKBAR_PROPS.SeverityType.ERROR });
			}
		}
	}

	return (
		<div className={classes.paper}>
			<h5 className={classes.font}>ADD CLIENT</h5>
				<Grid container spacing={2} alignItems="center">
					<Grid item>
						<AccountCircle />
					</Grid>
					<Grid item>
					<TextField className={classes.texts} onChange={handleChangeName} id="name" name="name" label="Name" variant="outlined" value={name}/>
					</Grid>
				</Grid>
				<Grid container spacing={2} alignItems="center">
					<Grid item>
						<AccountCircle />
					</Grid>
					<Grid item>
						<TextField className={classes.texts} onChange={handleChangeSurname} id="surname" name="surname" label="Surname" variant="outlined" value={surname}/>
					</Grid>
				</Grid>
				<Grid container spacing={2} alignItems="center">
					<Grid item>
						<SupervisedUserCircle />
					</Grid>
					<Grid item>
						<Autocomplete onChange={handleChangeOwner} options={props.store.owners} getOptionLabel={(option) => option.id + ". " + option.owner } className={classes.texts} renderInput={(params) => <TextField {...params} id="owner" name="owner" label="Owner" variant="outlined" value={owner}/>}/>
					</Grid>
				</Grid>
				<Grid container spacing={2} alignItems="center">
					<Grid item>
						<PublicIcon />
					</Grid>
					<Grid item>
						<Autocomplete onChange={handleChangeCountry} options={props.store.countries} getOptionLabel={(option) => option.id + ". " + option.country} className={classes.texts} renderInput={(params) => <TextField {...params} id="country" name="country" label="Country" variant="outlined" value={country}/>}/>
					</Grid>
				</Grid>
				<Button onClick={addNewClient} className={classes.buttons} type="button" variant="contained" color="primary">Add New Client</Button>
				<SnackBar message={snack.message} severity={snack.severity} />
		</div>
	);
});

export default inject("store")(ActionAddNew);