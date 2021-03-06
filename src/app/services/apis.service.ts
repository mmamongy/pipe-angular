import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IApps} from './../helperClasses/commonIneterfaces' ;



const WIKI_URL= 'https://en.wikipedia.org/w/api.php';
const URL = 'http://commsdots.itworx.com/' ;
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  requestOptions = {
    params: new HttpParams()
  };
  constructor (private http: HttpClient){
    this.requestOptions.params.set('withCredentials', 'true');

  }
 
  
  getUserInfo(){
    return this.http
    .get(URL+'Users/GetUserInfo', this.requestOptions) ;
  }
  getTypes(){
    return this.http.get(URL+"Home/GetTypes",this.requestOptions);
  }

  getDepartments(){
    return this.http
    .get(URL + 'Home/GetDepartments' , this.requestOptions);
  }
  getSystemInfo(){
    return this.http
    .get<IApps[]>(URL + 'Home/GetSystemsInfo' , this.requestOptions)
    
  }
}
