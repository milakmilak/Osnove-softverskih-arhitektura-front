import { Prodavac } from "./Prodavac";

export interface Article {
    id: string,
    naziv: string,
    opis: string,
    cena: number,
    prodavac: Prodavac,
    putanjaSlike: string
    //spisak akcija na kojim se nalazi ovaj artikal, treba mi tip akcija
}