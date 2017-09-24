import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  waService: WAService;
  userType: any;

  constructor(public navCtrl: NavController,
    public http: Http) {
    this.waService = new WAService();

    this.userType = this.waService.GetFromDbWithKey("userType");

    if(this.userType == 0){

    }else{
      
    }


  }

}
