import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    icon: {
        backgroundColor: 'coral',
        padding: '10px',
        color: 'white',
        borderRadius: '30%',
        width: '40%',
        fontSize: '1em',
        textAlign: 'center',
        boxShadow: '0px 7px 7px 0px rgba(0,0,0,0.90)',
        '&:hover': {
            boxShadow: '0px 8px 8px 0px rgba(0,0,0,0.90)'
        }
    },

    alignText: {
        textAlign: 'center'
    },

    num: {
        marginLeft: 1,
        fontSize: '90%',
        maxHeight: '70%',
        fontFamily: "'Acme', sans-serif"
    },

    description: {
        marginLeft: 1,
        fontSize: '55%',
        fontFamily: "'Acme', sans-serif"
    }
}));

export default function OutstandingClientsBadge(props) {
    const classes = useStyles();

    return (
        <Grid container direction="row">
            <Grid item xs={6} className='fix_grid_text_align_right'>
                <div className={classes.icon}><i className="fas fa-user-circle"></i></div>
            </Grid>

            <Grid item xs={6} direction="column" className={classes.alignText}>
                <Grid item xs={6}>
                    <div className={classes.num}>{props.outstandingClients}</div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.description}>Outstanding Clients</div>
                </Grid>
            </Grid>
        </Grid>
    )
}