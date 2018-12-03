import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApisService } from './services/apis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  User : any = { resource:[]};
  ngOnInit(): void {

    this.apiService.getUserInfo().subscribe( (data: any) => {
      this.User = data.resource ;
     
    }) ;
  }
 
  title = 'search';
  public model: any;
  public modelStatic: any;
  public mySearch : any ;
  public mines: [];
  constructor(private apiService: ApisService) {
  }
 }

