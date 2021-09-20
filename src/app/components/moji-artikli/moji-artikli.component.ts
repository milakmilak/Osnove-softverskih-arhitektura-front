import { Router } from '@angular/router';
import { TokenService } from './../../services/TokenService/token.service';
import { ArticleService } from './../../services/ArticleService/article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/types/Article';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-moji-artikli',
  templateUrl: './moji-artikli.component.html',
  styleUrls: ['./moji-artikli.component.scss']
})
export class MojiArtikliComponent implements OnInit {

  constructor(private service: ArticleService, private tokenService: TokenService, private spinner: NgxSpinnerService, private router: Router) { }

  allArticles: Article[] = [];
  articlesForShowing: Article[] = [];

  private jwt = this.tokenService.getToken();
  private username = this.tokenService.getUsernameFromJwt(this.jwt);

  private start = 0;
  private counter = 0;

  notEmptyPost = true;
  notScrolly = true;

  loadInitArticles() {
    this.service.getArticlesByUsername(this.username).then((response) => {
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
    this.router.navigate(['/' + this.username + '/moji-artikli' + '/' + articleId]);
  }

  public obrisi(articleId: string) {
    this.service.deleteArticleById(Number(articleId));
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.loadInitArticles();
  }

}
