import React, { useState, useEffect } from 'react';
import SnackBar from './SnackBar';
import { SNACKBAR_PROPS }  from '../Constants';
import StickyTable from './StickyTable';
import { observer, inject } from 'mobx-react';
import UpdateUser from './UpdateUser';
import Search from './Search';
import axios from 'axios';
import { API_PATH }  from '../Constants';
import { User } from '../store/User';

const Clients = observer((props) => {
    const [snack, setSnack] = useState({ message: "", severity: "" }),
    [open, setOpen] = useState(false),
    [updateData, setUpdateData] = useState([]),
    [refreshData, setRefreshData] = useState(false);

    const modalClose = async (modifiedData) => {
        setOpen(false);

        //update data
        if (modifiedData && modifiedData.name) {
            const isUpdated = await props.store.UpdateUserData(updateData.id, modifiedData.name, modifiedData.surname, modifiedData.country);
            if(isUpdated.status === 200) {
                setUpdateData(updateData.id, modifiedData.name, modifiedData.surname, modifiedData.country);
                setSnack({ message: SNACKBAR_PROPS.MessageType.SUCCESS_SAVED, severity: SNACKBAR_PROPS.SeverityType.SUCCESS });
            }
            else
                setSnack({ message: SNACKBAR_PROPS.MessageType.FAILED_SAVING, severity: SNACKBAR_PROPS.SeverityType.ERROR });
        }
    }

    const updateUserFunction = (dataObj) => {
        setUpdateData(dataObj);
        setOpen(true);
    }

    const filterResults = async(filterBy='name', filterText='') => {
        props.store.user.splice(0, props.store.user.length);
        const dData = await axios.get(`${API_PATH}/showData/${filterBy}/${filterText}`);
        dData.data.forEach(u => props.store.addUser(new User(u.id, u.last, u.first, u.sold, u.first_contact, u.email_type_id , u.owner_id, u.country_id)));
        setRefreshData(!refreshData);
    }

    useEffect(() => { setTimeout(() => setUpdateData(null) , 500); }, [props.store]);

    return (
        <div className='stretched'>
            <UpdateUser countries={props.store.countries} data={updateData} open={open} modalClose={modalClose} />
            <Search filterResults={filterResults} />
            <StickyTable store={props.store} updateUserFunction={updateUserFunction} filterResults={filterResults} />
            <SnackBar message={snack.message} severity={snack.severity} />
        </div>
    )
});

export default inject("store")(Clients);