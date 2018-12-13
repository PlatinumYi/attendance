import { Headers } from '@angular/http';

export class ApiService {
    getUrl(): string {
        return 'http://www.kaisir.top.';
    }
    getHeaders(): Headers {
        let headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        // headers.set('Access-Control-Allow-Origin', '*'),
        // headers.set('Accept', 'application/json')
        return headers;
    }
}