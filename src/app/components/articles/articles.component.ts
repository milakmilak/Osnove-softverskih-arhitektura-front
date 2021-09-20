import { TokenService } from './../../services/TokenService/token.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from './../../types/Article';
import { ArticleService } from './../../services/ArticleService/article.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private service: ArticleService, private tokenService: TokenService, private spinner: NgxSpinnerService, private router: Router) { }

  allArticles: Article[] = [];
  articlesForShowing: Article[] = [];

  private start = 0;
  private counter = 0;

  articleId = document.getElementsByName('articleId');

  notEmptyPost = true;
  notScrolly = true;


  loadInitArticles() {
    this.service.getArticles().then((response) => {
      console.log(response);
      this.allArticles = response;
      this.articlesForShowing = response.slice(this.start, this.counter += 6);
    })
  }

  loadNextThreeArticles() {
    const newArticles = this.allArticles.slice(this.start = this.counter, this.counter += 3);
    this.spinner.hide();

    if(newArticles.length === 0) {
      this.notEmptyPost = true;
    }

    this.articlesForShowing = this.articlesForShowing.concat(newArticles);
    this.notScrolly = true;
  }

  public onScroll() {
    if(this.notScrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notScrolly = false;
      this.loadNextThreeArticles();
    }
  }

  public detalji(articleId: string) {
    this.router.navigate(['/artikli/' + articleId]);
  }

  public isAnyoneLoggedIn(): boolean {
    if(this.tokenService.getToken()) {
      if(this.tokenService.isAuthenticated()) {
        return true;
      }
    }

    return false;
  }

  ngOnInit(): void {
    this.loadInitArticles();
  }

}
