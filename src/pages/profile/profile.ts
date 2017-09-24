import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { WAService } from "../../providers/wa.service"
import { Http, Headers, RequestOptions } from '@angular/http';
import { Fiance } from '../../models/fiance.model';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  waService: WAService;
  userType: any;
  provider: any;
  fiance: any;
  editingEnable: boolean;

  constructor(public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController) {
    this.waService = new WAService();
    this.editingEnable = true;
    console.log(this.fiance);

    this.fiance = {name: ""};

    this.userType = this.waService.GetFromDbWithKey("userType");

    let id = this.waService.GetFromDbWithKey("id");

    if(this.userType == 0){
      let url = this.waService.GetServiceUrl() + '/user/fiance/'+id;
      this.http.get(url).subscribe(data => {
        console.log(data.json().data);
        this.fiance = data.json().data;
        console.log(this.fiance);
        //console.log(this.fianceitems);
      }, error => {
        this.doAlert("Erro", error.json().errors[0]);
      });
    }else{
      let url = this.waService.GetServiceUrl() + '/user/provider/'+id;
      this.http.get(url).subscribe(data => {
        console.log(data);
        //this.fianceitems = this.fiances = data.json().data.fiances;
        //console.log(this.fianceitems);
      }, error => {
        this.doAlert("Erro", error.json().errors[0]);
      });
      
    }


  }

  enableEdit(){
    console.log(this.editingEnable);
    this.editingEnable = false;
  }

  updateFiance(){
    this.editingEnable = true;

    let url = this.waService.GetServiceUrl()+'/user/fiance/'+this.fiance.fianceId;
    let body = JSON.stringify(this.fiance);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    this.http.put(url, body, options).subscribe(data => {
            this.doAlert("Aviso","Dados salvos com sucesso!");
    }, error => {
        this.doAlert("Erro",error.json().errors[0]);
    });
  }

  isEditingEnable(){
    return this.editingEnable;
  }

  doAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
