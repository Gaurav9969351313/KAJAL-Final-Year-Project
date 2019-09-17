import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { APP_SETTINGS } from "../settings";

@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {
  constructor() { }
 
  //The set method is use for encrypt the value.
  aesEncrypt(username, password){

    var toBeEncryptedStr = "usr=" + username + "===pwd=" + password;
    var k = APP_SETTINGS.aesKey;
    var i =  APP_SETTINGS.aesIv;
    var key = CryptoJS.enc.Utf8.parse(k);
    var iv = CryptoJS.enc.Utf8.parse(i);

    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(toBeEncryptedStr.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  aesDecrypt(encValue){
    
    var k = APP_SETTINGS.aesKey;
    var i =  APP_SETTINGS.aesIv;
    
    var key = CryptoJS.enc.Utf8.parse(k);
    var iv = CryptoJS.enc.Utf8.parse(i);
    
    var decrypted = CryptoJS.AES.decrypt(encValue, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}