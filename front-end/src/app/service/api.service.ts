import { Headers } from '@angular/http';

export class ApiService {
    getUrl(): string {
        // return 'http://www.kaisir.top.';
        return 'http://localhost:1024'
    }
    getHeaders(work_number?: string): Headers {
        let headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded; application/json')
        if (work_number != null){
            headers.set('work_number', work_number)
        }
        headers.set('Access-Control-Allow-Credentials', 'true')
        // headers.set('Access-Control-Allow-Origin', '*')
        // headers.set('Accept', 'application/json')
        // headers.set('Authorization', 'application/x-www-form-urlencoded')
        return headers;
    }
}