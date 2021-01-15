import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chart: {
        float: 'left',
        padding: 10,
        width: '29%',
        height: 300,
        fontFamily: "'Acme', sans-serif",
        fontSize: 14
    }
}));

export default function ClientAcquisitionChart() {
    const classes = useStyles(),
    COLORS = ['#0088FE', '#e74c3c', '#006600'],
    data = [
        {name: '6-12 Months', value: 131},
        {name: 'Last Month', value: 22},
        {name: '12 Months', value: 302}
    ];

    const renderCustomizedLabel = ({ x, y, value }) => {
        return (
            <text x={x-30} y={y-5} fill="black" textAnchor="start" dominantBaseline="central">
                {value} clients
            </text>
        );
    };

    return (
        <div className={classes.chart}>
            {
                data &&
                <ResponsiveContainer width='100%'>
                    <PieChart>
                        <Legend />
                        <Tooltip />
                        <Pie data={data} label={renderCustomizedLabel} outerRadius={'75%'} fill="#8884d8" nameKey="name" dataKey="value">
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            }
        </div>
    )
}
