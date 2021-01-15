import React from 'react';
import TopEmployeesChart from './charts/TopEmployeesChart';
import SalesByChart from './charts/SalesByChart';
import ClientAcquisitionChart from './charts/ClientAcquisitionChart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    back: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 40,
        marginBottom: 20,
        width: '92.5%',
        backgroundColor: '#ffffff9c',
        boxShadow: '7px 7px 7px 0px rgba(0,0,0,0.90)',
        '&:hover': {
            boxShadow: '8px 8px 8px 0px rgba(0,0,0,0.90)'
        }
    }
}));

export default function RenderCharts(props) {
    const classes = useStyles();

    return (
        <div className={classes.back}>
            <TopEmployeesChart topEmployees={props.topEmployees} />
            <ClientAcquisitionChart />
            <SalesByChart countries={props.countries} emails={props.emails} owners={props.owners} />
        </div>
    )
}