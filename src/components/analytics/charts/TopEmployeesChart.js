import React from 'react';
import { ComposedChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    chart: {
        float: 'left',
        padding: 10,
        width: '56.8%',
        height: 300,
        fontFamily: "'Acme', sans-serif",
        fontSize: 14
    }
}));

export default function TopEmployeesChart(props) {
    const classes = useStyles(),
    COLORS = ['#0088FE', '#e74c3c', '#006600'],
    data = props.topEmployees;

    return (
        <div className={classes.chart}>
            {
                data &&
                <ResponsiveContainer width='100%'>
                    <ComposedChart layout="vertical" data={data} margin={{top: 80, bottom: 0, left: 0}}>
                        <XAxis dataKey="topEmployees" type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar name="Sales of top employees" dataKey="topEmployees" barSize={15} fill="#2d3940">
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            }
        </div>
    )
}
