import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OsaPayload {
  firstName: string;
  lastName: string;
  attending: string;
  fridayPredrinks: string;
  email: string;
  phone: string;
  dietary: string;
}

@Injectable({ providedIn: 'root' })
export class OsaService {
  submit(data: OsaPayload): Observable<void> {
    return from(
      fetch(environment.googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data),
      }).then(() => undefined)
    );
  }
}
