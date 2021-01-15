import { observable, makeObservable } from 'mobx';

export class User {
    constructor(id, last, first, sold = false, first_contact = null, email_type_id, owner_id, country_id) {
        this.id = id;
        this.last = last;
        this.first = first;
        this.sold = sold;
        this.first_contact = first_contact;
        this.email_type_id = email_type_id;
        this.owner_id = owner_id;
        this.country_id = country_id;

        makeObservable(this, {
            id: observable,
            last: observable,
            first: observable,
            sold: observable,
            first_contact: observable,
            email_type_id: observable,
            owner_id: observable,
            country_id: observable
        });
    }
}