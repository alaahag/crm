import { observable, action, makeObservable, computed } from 'mobx';
import axios from 'axios';
import { API_PATH }  from '../Constants';

export class CRM_DATA {
    constructor() {
        this.user = [];
        this.countries = [];
        this.emailTypes = [];
        this.owners = [];
        this.length = 0;

        makeObservable(this, {
            user: observable,
            emailTypes: observable,
            countries: observable,
            owners: observable,
            length: observable,
            addUser: action,
            UpdateUserData: action,
            addCountry: action,
            addEmailType: action,
            addOwner: action,
            getCountryName: action,
            getCountryID: action,
            getEmailTypeName: action,
            getEmailTypeID: action,
            getOwnerName: action,
            getOwnerID: action,
            numUsers: computed
        });
    }

    addUser = (User) => {
        this.user.push(User);
    }

    UpdateUserData = async (id, surname, name, country) => {
        const user = this.user.find(f => f.id == id);
        user.first = name;
        user.last = surname;
        user.country_id = this.getCountryID(country);

        const result = await axios.put(`${API_PATH}/updateUser/${id}`, {first: user.first, last: user.last, country: user.country_id})
        return result;
    }

    addCountry = (countryObj) => {
        this.countries.push(countryObj);
    }

    addEmailType = (emailTypeObj) => {
        this.emailTypes.push(emailTypeObj);
    }

    addOwner = (ownerObj) => {
        this.owners.push(ownerObj);
    }

    getCountryName(id) {
        const index = this.countries.findIndex(c => c.id === id);
        return this.countries[index].country;
    }

    getCountryID(country) {
        const index = this.countries.findIndex(c => c.country === country);
        return this.countries[index].id;
    }

    getEmailTypeName(id) {
        const index = this.emailTypes.findIndex(e => e.id === id);
        return this.emailTypes[index] ? this.emailTypes[index].email_type : null;
    }

    getEmailTypeID(emailType) {
        const index = this.emailTypes.findIndex(c => c.email_type === emailType);
        return this.emailTypes[index] ? this.emailTypes[index].id : null;
    }

    getOwnerName(id) {
        const index = this.owners.findIndex(o => o.id === id);
        return this.owners[index] ? this.owners[index].owner : null;
    }

    getOwnerID(owner) {
        const index = this.owners.findIndex(o => o.owner === owner);
        return this.owners[index].id;
    }

    get numUsers() {
        return this.user.length;
    }
}