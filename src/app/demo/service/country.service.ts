import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) { }

    // getCountries() {
    //     return this.http.get<any>('http://127.0.0.1:8000/api/countries/')
    //         .toPromise()
    //         .then(res => res.data as any[])
    //         .then(data => data);
    // }

    getCountries() {
        // Update the API endpoint to your Django Rest Framework endpoint
        return this.http.get<any[]>('http://127.0.0.1:8000/api/countries/')
            .toPromise()
            .then(data => data);
    }
}
