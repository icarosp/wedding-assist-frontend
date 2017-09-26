import {Component} from "@angular/core";
import {Http, Headers} from "@angular/http";
import { Fiance } from "../models/fiance.model"
import { Provider } from "../models/provider.model"
import 'rxjs/add/operator/map'

export class WAService{

    headers: Headers;
    private url: string;

    constructor(){
        //this.url = "http://localhost:56934/api/";
        this.url = 'http://prod-wa-back.us-east-1.elasticbeanstalk.com/api';
    }

    GetServiceUrl(){
        return this.url;
    }

    SaveIntoDb(json: any){
        console.log("salvando local storage");
        window.localStorage.setItem('wa', JSON.stringify(json));
    }

    GetFromDb(object: any){
        JSON.parse(localStorage.getItem('wa'));
    }

    SaveIntoDbWithKey(key: string,json: any){
        console.log("salvando local storage");
        window.localStorage.setItem(key, JSON.stringify(json));
    }

    GetFromDbWithKey(key: any){
        return JSON.parse(localStorage.getItem(key));
    }

}