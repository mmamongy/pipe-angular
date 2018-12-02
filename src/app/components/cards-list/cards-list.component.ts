import {
Component,
OnInit,
ElementRef,
AfterViewInit,
AfterContentInit
} from '@angular/core';
import {
HttpClient
} from '@angular/common/http';
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
// console.log(this.element.nativeElement.children[0]);
// console.log(this.element.nativeElement.children[0].offsetHeight);
console.log(document.getElementsByTagName('li'));

}

apps: IApps[];
mySearch1: string;
selcetedTag: number = 1;
selectedTgaVlue: string = 'All Departments';
tags = [
"Administration",
"Communications",
"Facility",
"Marketing",
"MIS",
"OPEX",
"Procurement",
"Quality",
"Talent"
];
selectedTags: Array < any> [];
  element: ElementRef;
  status: boolean = false;
  showCategory: true;
  count: number = 0;
  temp = Array < IApps> ();


    constructor(private http: HttpClient, private api: ApisService, el: ElementRef) {
    this.element = el;
    this.temp = [];
    this.getSystemsData().subscribe(data => {
    this.apps = data;
    this.temp = data;
    this.filterAll() ;
    this.filterByTag('All Departments') ;

    });
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
      console.log(this.temp) ;
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
      console.log("Clicked search => ", this.mySearch1);
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
        //console.log(value.toLowerCase().indexOf(search))
        if (value.toLowerCase().indexOf(this.mySearch1) > -1) {
        // console.log('Value ' , value) ;
        match = true;
        }
        }
        }
        if (match) {
        obj.SystemInfos.push(t);
        }
        // console.log('my obj ' ,obj) ;
        });
        if (obj.SystemInfos.length > 0) {
        obj.Name = e.Name;
        this.temp.push(obj);
        }
        });
        //console.log('Temp ' , this.temp);
        }
        }
        }