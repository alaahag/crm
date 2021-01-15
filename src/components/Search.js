import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { observer, inject } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 2,
        marginBottom: 20,
        fontSize: 25,
        justifyContent: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        fontSize: 25
    }
}));

const Search = observer((props) => {
    const [search, setSearch] = useState({by: 'name', text: ''}),
    classes = useStyles();

    const handleChange = (event) => {
        let text, by;
        if (event.target.name === 'searchText') {
            text = (event.target.value).toLowerCase();
            by = search.by;
        }
        else {
            by = (event.target.value).toLowerCase();
            text = search.text;
        }

        setSearch({by, text});
    }

    useEffect(() => { props.filterResults(search.by, search.text) }, [search]);

    return (
        <Grid container spacing={2} alignItems="flex-end" className={classes.root}>
            <Grid>
                <SearchIcon />
            </Grid>
            <Grid item>
                <TextField label="Search & Filter" name="searchText" value={search.text} onChange={handleChange}/>
            </Grid>
            <FormControl className={classes.formControl}>
                <NativeSelect value={search.by} onChange={handleChange} name="searchBy">
                    <option value='name'>Name</option>
                    <option value='surname'>Surname</option>
                    <option value='country'>Country</option>
                    <option value='owner'>Owner</option>
                </NativeSelect>
            </FormControl>
        </Grid>
    )
});

export default inject("store")(Search);