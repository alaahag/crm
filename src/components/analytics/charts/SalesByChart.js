import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
    chart: {
        marginTop: 25,
        float: 'left',
        padding: 10,
        width: '94%',
        height: 300,
        fontFamily: "'Acme', sans-serif",
        fontSize: 14
    },
    filterBy: {
        textAlign: 'left',
        position: 'relative',
        marginBottom: -55,
        top: '-350px',
        left: '-4px'
    }
}));

export default function SalesByChart(props) {
    const classes = useStyles(),
    COLORS = ['#0088FE', '#e74c3c', '#006600', '#2c3e50', '#00C49F', '#FF8042', '#8e44ad'],
    [selectedSale, setSelect] = useState(''),
    [labeledSale, setLabel] = useState(''),
    [data, setData] = useState([]);

    const setChange = (val) => {
        if (val === 'countries')
            setData(props.countries);
        else if (val === 'emails')
            setData(props.emails);
        else
            setData(props.owners);

        setSelect(val);
        setLabel(`Sales by ${val}`);
    }

    const handleChange = (event) => {
        setChange(event.target.value);
    };

    useEffect(() => {
        setChange('countries');
    }, [props]);

    return (
        <div className={classes.chart}>
            <div className={classes.filterBy}>
                <FormControl className={classes.formControl}>
                    <Select value={selectedSale} onChange={handleChange}>
                        <MenuItem value={'countries'}>Countries</MenuItem>
                        <MenuItem value={'emails'}>Emails</MenuItem>
                        <MenuItem value={'owners'}>Owners</MenuItem>
                    </Select>
                    <FormHelperText>View by selection</FormHelperText>
                </FormControl>
            </div>
            {
                data &&
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <YAxis />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar name={labeledSale} dataKey={selectedSale} fill="#2d3940">
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            }
        </div>
    )
}