import {
Component,
OnInit,
ElementRef,
AfterViewInit,
AfterContentInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
ICardInfo,
IApps
} from '../../helperClasses/commonIneterfaces';
import {
getSystemsListAPI
} from '../../helperClasses/api';
import {
Observable
} from 'rxjs';
import {
map
} from 'rxjs/operators'
import {
ApisService
} from './../../services/apis.service';
import {
FormsModule
} from '@angular/forms';

@Component({
selector: 'cards-list',
templateUrl: './cards-list.component.html',
styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit, AfterViewInit {
ngAfterViewInit(): void {
}

apps: IApps[];
mySearch1: string;
selcetedTag: number = 1;
selectedTgaVlue: string = 'All Departments';
tags : any;
selectedTags: Array < any> [];
  element: ElementRef;
  status: boolean = false;
  showCategory: true;
  count: number = 0;
  temp = Array < IApps> ();


    constructor(private http: HttpClient, private api: ApisService, el: ElementRef) {
    this.element = el;
    this.temp = [];
    this.api.getSystemInfo().subscribe((data:IApps[])  => {
      
      this.apps = data ;
      this.temp = data; 
      this.filterByTag('All Departments') ;
    })
    this.api.getTags().subscribe( data=>{ 
      this.tags = data ;
    })
    }

    ngOnInit() {
    }

    getSystemsData(): Observable < any> {
      return this.http.get(getSystemsListAPI)
      }

      filterByTag(value) {
      this.status = !this.status;;
      this.selectedTgaVlue = value;
      this.temp = [];
      this.apps.forEach(element => {
      let obj = {
      Name: '',
      SystemInfos: Array < ICardInfo> () } as IApps;
      element.SystemInfos.filter(d => {
      if (this.selectedTgaVlue === d.Tags ) {
      obj.SystemInfos.push(d);
      } else if ( this.selectedTgaVlue === 'All Departments'){
        obj.SystemInfos.push(d) ;
      }
      });
      if (obj.SystemInfos.length > 0) {
      obj.Name = element.Name;
      this.temp.push(obj);
      }
      });
     
      }

      checkTag(value) {
      if (value == this.selectedTgaVlue) {
      return true;
      } else if (this.selectedTgaVlue == '') {
      return true;
      } else {
      return false;
      }
      }

      filterAll() {
    
      if (this.mySearch1 == '') {
      this.temp = this.apps.map(x => Object.assign({}, x));;
      } else {
      this.temp = [];
      this.apps.forEach(e => {
      let obj = {
      Name: '',
      SystemInfos: Array < ICardInfo> ()  } as IApps;
        e.SystemInfos.forEach(t => {
        let match = false
        for (let [key, value] of Object.entries(t)) {

        if (typeof (value) === 'string') {
        if (value.toLowerCase().indexOf(this.mySearch1.toLowerCase()) > -1) {
        match = true;
        }
        }
        }
        if (match) {
        obj.SystemInfos.push(t);
        }
    
        });
        if (obj.SystemInfos.length > 0) {
        obj.Name = e.Name;
        this.temp.push(obj);
        }
        });
        }
        }
        }