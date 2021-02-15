import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import WidgetsIcon from '@material-ui/icons/Widgets';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	links: {
		color: 'white',
		fontSize: '86%'
	},
	link_active: {
		display: 'flex',
		color: 'white',
		textDecoration: 'none',
		fontWeight: "bold"
	},
	link_inactive: {
		display: 'flex',
		color: '#c8c3c3',
		textDecoration: 'none',
		fontWeight: "normal"
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20
	}
}));

export default function Links() {
	const classes = useStyles(),
	location = useLocation();

	return (
		<Breadcrumbs separator='/' aria-label="breadcrumb" className={classes.links}>
			<Link to="/clients" className={location.pathname === '/' || location.pathname === '/clients' ? classes.link_active : classes.link_inactive}>
				<EmojiPeopleIcon className={classes.icon} />
				Clients
			</Link>
			<Link to="/actions" className={location.pathname === '/actions' ? classes.link_active : classes.link_inactive}>
				<WidgetsIcon className={classes.icon} />
				Actions
			</Link>
			<Link to="/analytics" className={location.pathname === '/analytics' ? classes.link_active : classes.link_inactive}>
				<AssessmentIcon className={classes.icon} />
				Analytics
			</Link>
		</Breadcrumbs>
	);
}
