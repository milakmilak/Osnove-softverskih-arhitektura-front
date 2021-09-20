import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleUpdate } from 'src/app/types/ArticleUpdate';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticlesUrl = environment.baseUrl + '/artikli';

  getArticles(): Promise<any> {
    return this.http.get(this.getArticlesUrl).toPromise();
  }

  getArticlesByUsername(username: string): Promise<any> {
    return this.http.get(environment.baseUrl + '/prodavci' + '/' + username + '/artikli').toPromise();
  }

  getArticle(articleId: string): Promise<any> {
    return this.http.get(environment.baseUrl + '/artikli/' + articleId).toPromise();
  }

  deleteArticleById(articleId: number): void {
    this.http.delete(environment.baseUrl + '/artikli/' + articleId).toPromise();
  }

  create(article: any): Promise<any> {
    return this.http.post(environment.baseUrl + '/artikli', article).toPromise();
  }

  update(articleId: string, update: ArticleUpdate): Promise<any> {
    return this.http.put(environment.baseUrl + '/artikli/' + articleId, update).toPromise();
  }

}
