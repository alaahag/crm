import React, { useEffect, useState } from 'react';
import RenderBadges from './analytics/RenderBadges';
import RenderCharts from './analytics/RenderCharts';
import axios from 'axios';
import { API_PATH }  from '../Constants';
const moment = require('moment');

export default function Analytics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getAnalyticsData = async() => {
            const response = await axios.get(`${API_PATH}/clients`);
            const topEmployees = calculateTopEmployees(response.data);
            const newClients = calculateNewClients(response.data);
            const emailsSent = calculateEmailsSent(response.data);
            const outstandingClients = calculateOutstandingClients(response.data);
            const countries = calculateCountries(response.data);
            const emails = calculateEmails(response.data);
            const owners = calculateOwners(response.data);
            const hottestCountry = calculateHottestCountry(response.data);
            setData({response, topEmployees, newClients, emailsSent, outstandingClients, hottestCountry, countries, emails, owners});
        }
        getAnalyticsData();
    }, []);

    const calculateNewClients = (data) => {
        let newClients = 0;
        const m = moment(new Date()).month();
        const y = moment(new Date()).year();
        data.forEach(d => {
            const dt = moment(d.first_contact,'DD-MM-YYYY');
            const mm = dt.month();
            const yy = dt.year();
            if (mm === m && yy === y)
                newClients++;
        });
        return newClients;
    }

    const calculateEmailsSent = (data) => {
        const sentEmails = data.filter(d => d.email_type_id !== null);
        const count = sentEmails.length;
        return count;
    }

    const calculateOutstandingClients = (data) => {
        const outstandingClients = data.filter(d => d.sold === 0);
        const count = outstandingClients.length;
        return count;
    }

    const calculateHottestCountry = (data) => {
        const countries = {};
        data.forEach(d => { countries[d.country] ? countries[d.country]++ : countries[d.country]=1 });
        const hottest = Object.keys(countries).reduce(function (a, b) { return countries[a] > countries[b] ? a : b });
        return hottest;
    }

    const calculateCountries = (data) => {
        const countries = {};
        data.filter(f => f.sold === 1).forEach(d => { countries[d.country] ? countries[d.country]++ : countries[d.country]=1 });
        const groupedCountries = Object.keys(countries).map(c => { return { name: c, countries: countries[c] } });
        return groupedCountries;
    }

    const calculateEmails = (data) => {
        const emails = {};
        data.filter(f => f.sold === 1).forEach(d => { emails[d.email_type] ? emails[d.email_type]++ : emails[d.email_type]=1 });
        const groupedEmails = Object.keys(emails).map(c => { return { name: c, emails: emails[c] } });
        return groupedEmails;
    }

    const calculateOwners = (data) => {
        const owners = {};
        data.filter(f => f.sold === 1).forEach(d => { owners[d.owner] ? owners[d.owner]++ : owners[d.owner]=1 });
        const groupedOwners = Object.keys(owners).map(c => { return { name: c, owners: owners[c] } });
        return groupedOwners;
    }

    const calculateTopEmployees = (data) => {
        const owners = {};
        data.filter(d => d.sold === 1).forEach(d => { owners[d.owner] ? owners[d.owner]++ : owners[d.owner]=1 });
        const keysSorted = Object.keys(owners).sort(function (a, b) { return owners[a] - owners[b] }).map(key => { return { name: key, topEmployees: owners[key] } }).reverse();
        keysSorted.splice(3);
        return keysSorted;
    }

    return(
        <center style={{marginTop: '10px'}}>
            <RenderBadges hottestCountry={data.hottestCountry} newClients={data.newClients} emailsSent={data.emailsSent} outstandingClients={data.outstandingClients} />
            <RenderCharts countries={data.countries} emails={data.emails} owners={data.owners} topEmployees={data.topEmployees} />
        </center>
    )
};