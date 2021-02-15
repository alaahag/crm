import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import EmailIcon from '@material-ui/icons/Email';
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
		marginTop: 14,
		marginBottom: 20,
		padding: theme.spacing(1, 2, 2),
		width: '16.5em',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
	},
	buttons: {
		width: '8em'
	},
	texts: {
		width: '6.8em'
	},
	justify: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	font: {
		fontFamily: "'Acme', sans-serif",
		margin: 14,
		wordSpacing: 5
	}
}));

const ActionUpdate = observer((props) => {
	const classes = useStyles(),
	[name, setName] = useState(''),
	[owner, setOwner] = useState(''),
	[email, setEmail] = useState(''),
	[snack, setSnack] = useState({ message: "", severity: "" });

	const handleChangeName = (event) => {
        const n = event.target.textContent;
        setName(n);
	}

	const handleChangeOwner = (event) => {
        const ow = event.target.textContent;
        setOwner(ow);
	}

	const handleChangeEmail = (event) => {
        const em = event.target.textContent;
        setEmail(em);
	}

	const declareBtn = async() => {
		if (!name)
			setSnack({ message: SNACKBAR_PROPS.MessageType.MISSING_INPUT, severity: SNACKBAR_PROPS.SeverityType.WARNING });
		else {
			const data = name.split(' '),
			id = data[0].slice(0, -1);
			try {
				await axios.put(`${API_PATH}/updateAction/${id}`, {fieldName: 'sold', targetID: 1});
				setSnack({ message: SNACKBAR_PROPS.MessageType.SUCCESS_SAVED, severity: SNACKBAR_PROPS.SeverityType.SUCCESS });
			}
			catch {
				setSnack({ message: SNACKBAR_PROPS.MessageType.FAILED_SAVING, severity: SNACKBAR_PROPS.SeverityType.ERROR });
			}
		}
	}

    const transferBtn = async() => {
		if (!owner || !name)
			setSnack({ message: SNACKBAR_PROPS.MessageType.MISSING_INPUT, severity: SNACKBAR_PROPS.SeverityType.WARNING });
		else {
			const id = name.split(' ')[0].slice(0, -1),
			data = owner.split(' ');
			try {
				await axios.put(`${API_PATH}/updateAction/${id}`, {fieldName: 'owner_id', targetID: data[0]});
				setSnack({ message: SNACKBAR_PROPS.MessageType.SUCCESS_SAVED, severity: SNACKBAR_PROPS.SeverityType.SUCCESS });
			}
			catch {
				setSnack({ message: SNACKBAR_PROPS.MessageType.FAILED_SAVING, severity: SNACKBAR_PROPS.SeverityType.ERROR });
			}
		}
	}

    const sendBtn = async() => {
		if (!email || !name)
			setSnack({ message: SNACKBAR_PROPS.MessageType.MISSING_INPUT, severity: SNACKBAR_PROPS.SeverityType.WARNING });
		else {
			const id = name.split(' ')[0].slice(0, -1),
			data = email.split(' ');
			try {
				await axios.put(`${API_PATH}/updateAction/${id}`, {fieldName: 'email_type_id', targetID: data[0], firstContact: true});
				setSnack({ message: SNACKBAR_PROPS.MessageType.SUCCESS_SAVED, severity: SNACKBAR_PROPS.SeverityType.SUCCESS });
			}
			catch {
				setSnack({ message: SNACKBAR_PROPS.MessageType.FAILED_SAVING, severity: SNACKBAR_PROPS.SeverityType.ERROR });
			}
		}
	}

	return (
		<div className={classes.paper}>
			<h5 className={classes.font}>UPDATE CLIENT</h5>
				<Grid container spacing={2} className={classes.justify}>
					<Grid item>
						<AccountCircle />
					</Grid>
					<Grid item>
						<Autocomplete onChange={handleChangeName} options={props.store.user} getOptionLabel={(option) => option.id + ". " + option.last + ' ' + option.first} className={classes.texts} renderInput={(params) => <TextField {...params} id="name" name="name" label="Client Name" variant="outlined" value={name}/>}/>
					</Grid>
					<Grid item>
						<Button onClick={declareBtn} className={classes.buttons} type="button" variant="contained" color="primary">Declare Sale</Button>
					</Grid>
				</Grid>
				<Grid container spacing={2} className={classes.justify}>
					<Grid item>
						<SupervisedUserCircle />
					</Grid>
					<Grid item>
						<Autocomplete onChange={handleChangeOwner} options={props.store.owners} getOptionLabel={(option) => option.id + ". " + option.owner } className={classes.texts} renderInput={(params) => <TextField {...params} id="owner" name="owner" label="Owner" variant="outlined" value={owner}/>}/>
					</Grid>
					<Grid item>
						<Button onClick={transferBtn} className={classes.buttons} type="button" variant="contained" color="primary">Transfer Ownership</Button>
					</Grid>
				</Grid>
				<Grid container spacing={2} className={classes.justify}>
					<Grid item>
						<EmailIcon />
					</Grid>
					<Grid item>
						<Autocomplete onChange={handleChangeEmail} options={props.store.emailTypes} getOptionLabel={(option) => option.id + ". " + option.email_type} className={classes.texts} renderInput={(params) => <TextField {...params} id="email" name="email" label="Email Type" variant="outlined" value={email}/>}/>
					</Grid>
					<Grid item>
						<Button onClick={sendBtn} className={classes.buttons} type="button" variant="contained" color="primary">Send Email</Button>
					</Grid>
				</Grid>
				<SnackBar message={snack.message} severity={snack.severity} />
		</div>
	);
});

export default inject("store")(ActionUpdate);