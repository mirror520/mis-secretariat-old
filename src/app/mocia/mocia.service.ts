import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Pkcs11 } from './model/pkcs11';

@Injectable()
export class MociaService {
  private baseUrl = 'http://localhost:61161';

  constructor(private http: HttpClient) { }

  getPkcs11Info(): Observable<Pkcs11> {
    return this.http.get<Pkcs11>(this.baseUrl + '/pkcs11info')
                    .map((value: Pkcs11) => Object.assign(new Pkcs11(), value));
  }
}
