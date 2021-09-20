import { Stavka } from './Stavka';
import { Kupac } from "./Kupac";

export interface Porudzbina {
    id: string,
    satnica: Date,
    isDostavljeno: boolean,
    ocena: number,
    komentar: string,
    isAnonimanKomentar: boolean,
    isArhiviranKomentar: boolean,
    kupac: Kupac,
    stavke: Stavka[]
}