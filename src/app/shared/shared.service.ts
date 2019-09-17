import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { APP_SETTINGS } from "../settings";
import { Subject } from "rxjs/Subject";
import { MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();

  constructor(private sanitizer:DomSanitizer, private http: HttpClient, private snackBar: MatSnackBar) { }

  getMetaDataFromRedis() {
    return this.http.get<any>(APP_SETTINGS.serviceUrl + '/getWholeMetaData?forceFulDbCacheUpdate=0&dbChoice=0');
  }

  getMasterConfig(type) {
    return Observable.create(observer => {
      this.http.get<any>(APP_SETTINGS.serviceUrl + '/getConfigMaster/' + type)
        .toPromise()
        .then(res => res)
        .then(data => {

          if (data.length == 0) {
            //snackbar code
            observer.throw("Invalid type in config master");

          } else {
            observer.next(data)
          }
        });
    })
  }

  saveOrUpdateAppConfig(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateAppConfig', body);
  }

  saveOrUpdateServerConfig(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateServerConfig', body);
  }

  saveOrUpdateMenuConfig(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateMenuConfig', body);
  }

  saveOrUpdateDefaultSelections(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateDefaultSelections', body);
  }

  saveOrUpdateSideMenuConfig(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateSideMenuConfig', body);
  }

  getpushNotificationTemplates(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdatePushNotifications', body);
  }

  sendPushNotification(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/fcmOperations', body);
  }

  saveOrUpdateSugeetionConfig(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateSuggetionConfig', body);
  }

  saveOrUpdateTraining(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateTraining', body);
  }

  saveOrUpdateTrainingFromQlik(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateTrainingFromQlik', body);
  }

  saveOrUpdateDimentionList(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateDimentionList', body);
  }

  callAutoTrain() {
    return this.http.get<any>(APP_SETTINGS.nlpServiceUrl + '/trainSuggetions');
  }

  reloadOnTheFlyPythonConfig() {
    return this.http.get<any>(APP_SETTINGS.nlpServiceUrl + '/reloadOnFly');
  }

  saveOrUpdateUserConfig(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/saveOrUpdateUserConfig', body);
  }

  enableDisableApp(body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + '/enableDisableApp', body);
  }

  getContext() {
    return this.subject.asObservable();
  }

  sendContext(data) {
    this.subject.next(data);
  }

  post(url, body) {
    return this.http.post<any>(APP_SETTINGS.serviceUrl + url, body);
  }

  CurrentDateAndTime() {
    var str = "";

    var currentTime = new Date();

    var date = currentTime.getDate();
    var Month = currentTime.getMonth() + 1;
    var year = currentTime.getFullYear();

    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    if (minutes < 10) {
      var min = "0" + minutes;
    }
    if (seconds < 10) {
      var sec = "0" + seconds;
    }

    if (date < 10) {
      var dt = "0" + date;
    }
    if (Month < 10) {
      var mm = "0" + Month;
    }


    dt == undefined ? dt = date.toString() : dt = dt.toString();
    mm == undefined ? mm = Month.toString() : mm = mm.toString();
    sec == undefined ? sec = seconds.toString() : sec = sec.toString();
    min == undefined ? min = minutes.toString() : min = min.toString();

    str += dt + '-' + mm + '-' + year + ' ' + hours + ":" + min;
    if (hours > 11) {
      str += " PM"
    } else {
      str += " AM"
    }
    return str;
  }

  showSnackBar(message) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
  }

  images(body){
    return this.http.post(APP_SETTINGS.serviceUrl+"/images",body)
  }

  filetobase64(file){
    return Observable.create(observer=>{
      var reader:any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log('base64',reader.result);
        // var stringSplit=reader.result.split(",")
        observer.next(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: base64', error);
        observer.next('err')
      };
    })
  }

  base64tofile(url,type){
    return Observable.create(observer => {
      debugger
    var binaryString = window.atob(url.split(',')[1]);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    let blob = new Blob([bytes], { type: 'image/' + type });
    var tempFile = URL.createObjectURL(blob);
    observer.next(this.sanitizer.bypassSecurityTrustResourceUrl(tempFile));
  })
  }

}
