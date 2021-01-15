import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CRM_DATA } from './store/CRM_DATA';
import { Provider } from 'mobx-react';
import axios from 'axios';
import { API_PATH }  from './Constants';

const fetchData = async() => {
	try {
		const countryData = await axios.get(`${API_PATH}/showCountries`);
		await countryData.data.forEach(c => store.addCountry({ id: c.id, country: c.country }));

		const emailTypeData = await axios.get(`${API_PATH}/showEmailTypes`);
		await emailTypeData.data.forEach(e => store.addEmailType({ id: e.id, email_type: e.email_type }));

		const ownerData = await axios.get(`${API_PATH}/showOwners`);
		await ownerData.data.forEach(o => store.addOwner({ id: o.id, owner: o.owner }));
	}
	catch {
		console.log("Failed loading data from DB!");
	}
}

//insert data to DB (run it only time)
//const dData = axios.get(`${API_PATH}/insertAllData`);

let store = new CRM_DATA();
fetchData();

const stores = {
	store
}

ReactDOM.render(
	<Provider {...stores}>
		<App />
	</Provider>,
	document.getElementById('root')
);