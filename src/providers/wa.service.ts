import {Component} from "@angular/core";
import {Http, Headers} from "@angular/http";
import { Fiance } from "../models/fiance.model"
import { Provider } from "../models/provider.model"
import 'rxjs/add/operator/map'

export class WAService{

    headers: Headers;
    http: Http;

    constructor(){
        this.headers = new Headers();
        this.headers.append('Content-Type','application/json');
    }

    RegisterFiance(fiance: Fiance){

        this.http.post('', JSON.stringify(fiance), {headers: this.headers})
            .map(res => res.json())
            .subscribe(data=> {
                console.log(data);
        });
    }
}