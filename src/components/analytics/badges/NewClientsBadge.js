import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    icon: {
        backgroundColor: 'turquoise',
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
        fontSize: '48%',
        fontFamily: "'Acme', sans-serif"
    }
}));

export default function NewClientsBadge(props) {
    const classes = useStyles(),
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    current = new Date().getMonth();

    return (
        <Grid container direction="row">
            <Grid item xs={6} className='fix_grid_text_align_right'>
                <div className={classes.icon}><i className="fas fa-chart-line"></i></div>
            </Grid>

            <Grid item xs={6} direction="column" className={classes.alignText}>
                <Grid item xs={6}>
                    <div className={classes.num}>{props.newClients}</div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.description}>New {month[current]} Clients</div>
                </Grid>
            </Grid>
        </Grid>
    )
}