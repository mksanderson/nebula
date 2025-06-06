import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { App } from '../models/app';

@Injectable({ providedIn: 'root' })
export class AppService {
  private base = '/api/apps';

  constructor(private http: HttpClient) {}

  getApps(): Observable<App[]> {
    return this.http.get<App[]>(this.base);
  }

  addApp(data: any): Observable<any> {
    return this.http.post(this.base, data);
  }
}
