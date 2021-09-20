import { TokenService } from './../TokenService/token.service';
import { AuthenticationRequest } from './../../types/AuthenticationRequest';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  authUrl = environment.baseUrl + '/authenticate';

  authenticate(request: AuthenticationRequest): Promise<any> {
    return this.http.post(this.authUrl, request, { observe: 'response', responseType: 'text' }).toPromise();
  }

}
