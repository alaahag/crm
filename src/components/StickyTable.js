import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
const moment = require('moment');

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#2d3940',
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 'calc(100vh - 235px)'
    }
});

export default function StickyTable(props) {
    const classes = useStyles(),
    [page, setPage] = useState(0),
    [rowsPerPage, setRowsPerPage] = useState(25);

    const columns = [
        {
            id: 'last',
            label: 'Name',
            minWidth: 150
        },
        {
            id: 'first',
            label: 'Surname',
            minWidth: 150
        },
        {
            id: 'country_id',
            label: 'Country',
            format: (value) => props.store.getCountryName(value),
            minWidth: 150
        },
        {
            id: 'first_contact',
            label: 'First Contact',
            format: (value) => moment(value).format('DD-MM-YYYY'),
            minWidth: 100,
            align: 'center'
        },
        {
            id: 'email_type_id',
            label: 'Email',
            format: (value) => value === null ? "-" : props.store.getEmailTypeName(value),
            minWidth: 50,
            align: 'center'
        },
        {
            id: 'sold',
            label: 'Sold',
            format: (value) => value === 1 ? "✔" : "✘",
            minWidth: 50,
            align: 'center'
        },
        {
            id: 'owner_id',
            label: 'Owner',
            format: (value) => props.store.getOwnerName(value),
            minWidth: 150
        }
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rowClick = (event) => {
        props.updateUserFunction({id: event.currentTarget.id, name: event.currentTarget.children[0].innerText, surname: event.currentTarget.children[1].innerText, country: event.currentTarget.children[2].innerText});
    }

    useEffect(() => { }, [props]);

    return (
        props.store.numUsers === 0 ? "No results found." :
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((column) => (
                                    <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.store.user && props.store.user.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} id={row.id} key={row.id} onClick={rowClick}>
                                        {
                                            columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && (typeof value === 'number' || typeof value === 'object') ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })
                                        }
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[25, 50, 100]} component="div" count={props.store.numUsers} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
        </Paper>
    );
};