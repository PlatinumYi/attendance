import { Headers } from '@angular/http';

export class ApiService {
    getUrl(): string {
        return 'http://www.kaisir.top.';
        // return 'http://localhost:1024'
    }
    getHeaders(): Headers {
        let headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded; application/json')
        // headers.set('Access-Control-Allow-Origin', '*'),
        // headers.set('Accept', 'application/json')
        // headers.set('Authorization', 'application/x-www-form-urlencoded')
        return headers;
    }
}