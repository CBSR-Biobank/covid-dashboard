import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiReply {
  status: string;
  data: any;
}

interface PatientReport {}

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  static BASE_URL = '/api/patients';

  constructor(private http: HttpClient) {}

  reports(): Observable<PatientReport> {
    return this.http.get<ApiReply>(PatientsService.url('reports')).pipe(
      map((reply: ApiReply) => {
        if (reply) {
          return reply;
        }
        throw new Error('expected a report object');
      })
    );
  }

  static url(...paths: string[]): string {
    if (paths.length <= 0) {
      throw new Error('no arguments specified');
    }
    return [PatientsService.BASE_URL, ...paths].join('/');
  }
}
