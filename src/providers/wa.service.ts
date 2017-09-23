import {Component} from "@angular/core";
import {Http, Headers} from "@angular/http";
import { Fiance } from "../models/fiance.model"
import { Provider } from "../models/provider.model"
import 'rxjs/add/operator/map'

export class WAService{

    headers: Headers;
    private url: string;

    constructor(){
        this.url = "http://localhost:56934/api/";
    }

    GetServiceUrl(){
        return this.url;
    }
}