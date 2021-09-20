import { Prodavac } from './../../types/Prodavac';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdavacService {

  constructor(private http: HttpClient) { }

  getProdavciUrl = environment.baseUrl + '/prodavci';

  getProdavci(): Promise<any> {
    return this.http.get(this.getProdavciUrl).toPromise();
  }

  getProdavacByUsername(username: string): Promise<any> {
    return this.http.get(environment.baseUrl + '/prodavci/' + username).toPromise();
  }

}
