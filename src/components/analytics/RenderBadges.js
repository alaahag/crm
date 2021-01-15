import React from 'react';
import NewClientsBadge from './badges/NewClientsBadge';
import EmailsSentBadge from './badges/EmailsSentBadge';
import OutstandingClientsBadge from './badges/OutstandingClientsBadge';
import HottestCountryBadge from './badges/HottestCountryBadge';
import Grid from '@material-ui/core/Grid';

export default function RenderBadges(props) {
    return (
        <Grid container direction="row" style={{marginLeft: '-3.1%'}}>
            <Grid item xs={3}>
                <NewClientsBadge newClients={props.newClients} />
            </Grid>

            <Grid item xs={3}>
                <EmailsSentBadge emailsSent={props.emailsSent} />
            </Grid>

            <Grid item xs={3}>
                <OutstandingClientsBadge outstandingClients={props.outstandingClients} />
            </Grid>

            <Grid item xs={3}>
                <HottestCountryBadge hottestCountry={props.hottestCountry} />
            </Grid>
        </Grid>
    )
}