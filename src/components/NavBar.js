import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Links from './Links';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiPaper-root": {
			boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
		},
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        },
        fontWeight: "bold",
        fontFamily: "'Acme', sans-serif"
    },
    inputRoot: {
        color: 'inherit'
    }
}));

export default function NavBar() {
    const classes = useStyles();

    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Link to="/" className={classes.inputRoot}>
                    <IconButton edge="start" color="inherit">
                        <img src={process.env.PUBLIC_URL + '/logo.png'} className="App-logo" alt="Logo" />
                    </IconButton>
                </Link>
                <Typography className={classes.title} variant="h6" noWrap>
                    CRM
                </Typography>
                <Links />
            </Toolbar>
        </AppBar>
    </div>
    );
}