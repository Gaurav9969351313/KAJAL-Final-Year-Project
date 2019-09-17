import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APP_SETTINGS } from '../settings';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {

      resolve();

    });
  }

  getSettings(): Promise<any> {
   

    const promise = this.httpClient.get('assets/appconfig.json')
      .toPromise()
      .then((settings: any) => {

        APP_SETTINGS.serviceUrl = settings.serviceUrl;
        APP_SETTINGS.singleConfiguratorUrl = settings.singleConfiguratorUrl;
        APP_SETTINGS.aesKey = settings.AES_KEY;
        APP_SETTINGS.aesIv = settings.AES_IV;
        APP_SETTINGS.nlpServiceUrl = settings.nlpServiceUrl;
        APP_SETTINGS.updateModelUrl = settings.nlpServiceUrl + "/admin";

        console.log(`APP_SETTINGS: `, APP_SETTINGS);

        return settings;
      });

    // this.coonectToBWTest();

    return promise;
  }

  coonectToBWTest() {
    let username: string = 'shetma-cont';
    let password: string = 'Jan@2019';
    let headers = new Headers();
    var url = 'http://MCVLADSF1.corp.mahindra.com:8000/sap/opu/odata/sap/QR_O_EMPSCA_Q1_UI5_SRV/QR_O_EMPSCA_Q1_UI5Results/?$format=json'
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("", "*");
    this.httpClient.get(url).subscribe((d: any) => {
      console.log("Bw integration", d);
    });

  }

}
