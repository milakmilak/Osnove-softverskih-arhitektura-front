import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  constructor(private http: HttpClient) { }

  getProdavci(): Promise<any> {
    return this.http.get(environment.baseUrl + '/korisnici/prodavci').toPromise();
  }

  getProdavac(username: string): Promise<any> {
    return this.http.get(environment.baseUrl + '/prodavci/' + username).toPromise();
  }

  blockProdavac(prodavacId: string): Promise<any> {
    return this.http.put(environment.baseUrl + '/prodavci/' + prodavacId, true).toPromise();
  }

  getKupci(): Promise<any> {
    return this.http.get(environment.baseUrl + '/korisnici/kupci').toPromise();
  }

  getKupac(username: string): Promise<any> {
    return this.http.get(environment.baseUrl + '/kupci/' + username).toPromise();
  }

  blockKupac(kupacId: string): Promise<any> {
    return this.http.put(environment.baseUrl + '/kupci/' + kupacId, true).toPromise();
  }

  updateProdavac(username: string, request: FormData): Promise<any> {
    return this.http.put(environment.baseUrl + '/prodavci/update/' + username, request).toPromise();
  }

  updateKupac(username: string, request: FormData): Promise<any> {
    return this.http.put(environment.baseUrl + '/kupci/update/' + username, request).toPromise();
  }

}
