import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
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


  constructor(private http: HttpClient) { 
    // search url 
  }

 searchApi(term) : Observable<any>{
   return  this.http
   .get(WIKI_URL, {params: PARAMS.set('search', term)})
  }
  getUserInfo(){
    return this.http
    .get(URL+'Users/GetUserInfo') ;
    
  }
  getTags(){
    return this.http
    .get(URL + 'Home/GetTags') ;
  }
  getSystemInfo(){
    return this.http
    .get(URL + 'Home/GetSystemInfo')
  }
}
