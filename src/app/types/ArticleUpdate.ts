import { Prodavac } from "./Prodavac";

export interface ArticleUpdate {
    id: number,
    naziv: string,
    opis: string,
    cena: string,
    prodavac: string
}