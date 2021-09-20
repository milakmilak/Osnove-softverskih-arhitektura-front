import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImg(img: FormData): Promise<any> {
    return this.http.post(environment.baseUrl + '/images', img, { observe:'response', responseType: 'text' }).toPromise();
  }

}
