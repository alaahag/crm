const moment = require('moment'),
CRM_JSON = require('../CRM.json'),
express = require('express'),
Sequelize = require('sequelize'),
router = express.Router(),
sequelize = new Sequelize(process.env.CLEARDB_PURPLE_URL);


router.get('/insertAllData', function(req, res){
	try {
        //id name type height weight ownedBy
        const emailTypes = ['A', 'B', 'C', 'D'];
		const owners = new Set();
        const countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos Islands", "Colombia", "Comoros", "Congo", "Congo", "Cook Islands", "Costa Rica", "Cote dIvoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea", "Kuwait", "Kyrgyzstan", "Lao", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];

        //set email types
        for (let i=0; i<emailTypes.length; i++) {
			sequelize.query(`INSERT INTO email_type VALUES (${i}, '${emailTypes[i]}')`);
        }

        //set countries
        for (let i=0; i<countries.length; i++) {
			sequelize.query(`INSERT INTO country VALUES (${i}, '${countries[i]}')`);
        }

        //get owners
		for (const w of CRM_JSON) {
			owners.add(w.owner);
        }
        let ownersArray = Array.from(owners);

        //set owners
        for (let i=0; i<ownersArray.length; i++) {
            sequelize.query(`INSERT INTO owner VALUES (${i}, '${ownersArray[i]}')`);
        }

        for (const data of CRM_JSON) {
            const fullNameSplit = data.name.split(' ');
            sequelize.query(`INSERT INTO client VALUES (NULL, '${fullNameSplit[1]}', '${fullNameSplit[0]}', ${data.sold}, '${moment(data.firstContact).format('DD-MM-YYYY')}', ${data.emailType ? emailTypes.indexOf(data.emailType) : null}, ${ownersArray.indexOf(data.owner)}, ${countries.indexOf(data.country)})`);
		}

		return true;
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/showData/:type?/:text?', async function(req, res){
	try {
		//surname, country, owner, name
		const type = req.params.type || 'name';
		const text = req.params.text || '';
		let results;
		switch (type) {
			case "surname":
				results = await sequelize.query(`SELECT * FROM client where first LIKE '%${text}%' ORDER BY last ASC`);
				break;

			case "country":
				results = await sequelize.query(`SELECT client.id, client.last, client.first, client.sold, client.first_contact, client.email_type_id, client.owner_id, client.country_id FROM client,country where client.country_id = country.id and country.country LIKE '%${text}%' ORDER BY client.last ASC`);
				break;

			case "owner":
				results = await sequelize.query(`SELECT client.id, client.last, client.first, client.sold, client.first_contact, client.email_type_id, client.owner_id, client.country_id FROM client,owner where client.owner_id = owner.id and owner.owner LIKE '%${text}%' ORDER BY client.last ASC`);
				break;

			//name
			default:
				results = await sequelize.query(`SELECT * FROM client where last LIKE '%${text}%' ORDER BY last ASC`);
		}
		res.send(results[0]);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.post('/addNewAction', async function(req, res) {
	try {
		const data = { ...req.body };
		const dateNow = moment(new Date()).format("DD-MM-YYYY");
		const results = await sequelize.query(`INSERT INTO client VALUES (NULL, '${data.name}', '${data.surname}', 0, '${dateNow}', NULL, ${data.ownerID}, ${data.countryID})`);
		res.send(results);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.put('/updateAction/:id', async function(req, res) {
	try {
		const data = { ...req.body };
		let firstContact = '';
		if (data.firstContact) {
			const dateNow = moment(new Date()).format("DD-MM-YYYY");
			firstContact = `first_contact='${dateNow}',`;
		}
		const results = await sequelize.query(`UPDATE client SET ${firstContact} ${data.fieldName}=${parseInt(data.targetID)} WHERE id=${req.params.id}`);
		res.send(results);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.put('/updateUser/:id', async function(req, res) {
	try {
		const data = { ...req.body };
		const results = await sequelize.query(`UPDATE client SET first='${data.first}', last='${data.last}', country_id=${data.country} WHERE id=${req.params.id}`);
		res.send(results);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/showCountries', async function(req, res){
	try {
		let results = await sequelize.query('SELECT * FROM country ORDER BY country ASC');
		res.send(results[0]);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/showEmailTypes', async function(req, res){
	try {
		let results = await sequelize.query('SELECT * FROM email_type ORDER BY email_type ASC');
		res.send(results[0]);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/showOwners', async function(req, res){
	try {
		let results = await sequelize.query('SELECT * FROM owner ORDER BY owner ASC');
		res.send(results[0]);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/clients', async function(req, res){
	try {
		let results = await sequelize.query('SELECT * FROM (client,country,owner) LEFT JOIN (email_type) ON (client.email_type_id = email_type.id)  WHERE country_id = country.id AND owner_id = owner.id ORDER BY LAST ASC');
		res.send(results[0]);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});


module.exports = router;