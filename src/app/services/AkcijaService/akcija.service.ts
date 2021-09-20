import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AkcijaService {

  constructor(private http: HttpClient) { }

  getAkcijaById(akcijaId: string): Promise<any> {
    return this.http.get(environment.baseUrl + '/akcije/' + akcijaId).toPromise();
  }

  create(akcija: any): Promise<any> {
    return this.http.post(environment.baseUrl + '/akcije', akcija).toPromise();
  }

  getAkcijeByProdavacUsername(username: string): Promise<any> {
    return this.http.get(environment.baseUrl + '/prodavci/' + username + '/akcije').toPromise();
  }

  getArtikliAkcijeById(akcijaId: string): Promise<any> {
    return this.http.get(environment.baseUrl + '/akcije/' + akcijaId + '/artikli').toPromise();
  }
}
