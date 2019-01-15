import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  AfterContentInit, Input
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ICardInfo, IApps } from "../../helperClasses/commonIneterfaces";
import { getSystemsListAPI } from "../../helperClasses/api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApisService } from "./../../services/apis.service";
import { FormsModule } from "@angular/forms";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "cards-list",
  templateUrl: "./cards-list.component.html",
  styleUrls: ["./cards-list.component.scss"]
})
export class CardsListComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {}

  apps: IApps[];
  mySearch1: string;
  selcetedTag: number = 1;
  selectedTgaVlue: string = "All Departments";
  tags: any;
  selectedTags: Array<any>[];
  element: ElementRef;
  status: boolean = false;
  showCategory: true;
  count: number = 0;
  temp = Array<IApps>();
  types:Array<any>[];
  departments:Array<any>[];
  selectedDept:string = 'All Departments';
  selectedType: string  = 'All Types';
  closeResult: string;
  

  constructor( private http: HttpClient, private api: ApisService, el: ElementRef, 
    private modalService: NgbModal) {  
    this.element = el;
    this.temp = [];
    this.types=[];
    this.api.getSystemInfo().subscribe((data: IApps[]) => {
      this.apps = data;
      this.temp = data;
      this.filterByTag("All Departments");
    });
  
    this.api.getDepartments().subscribe((dept:any)=>{
      this.departments=dept;
    })

    this.api.getTypes().subscribe((type:any)=>{
      this.types=type;
    })
  }

  open(content) {
    console.log("entered");
    this.modalService.open(content);

   
  
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {}

  getSystemsData(): Observable<any> {
    return this.http.get(getSystemsListAPI);
  }

  filterByTag(value) {
    this.status = !this.status;    
    this.temp = [];
    this.apps.forEach(element => {
      let obj = {
        Name: value,
        SystemInfos: Array<ICardInfo>()
      } as IApps;
      if ( element.Name === this.selectedDept) {
      }
      element.SystemInfos.filter(d => {
        console.log(this.selectedDept);
        if (this.selectedDept === element.Name && this.selectedType === d.Type ) {
          obj.SystemInfos.push(d);
        } else if ( this.selectedDept === 'All Departments' && this.selectedType === d.Type) {
          obj.SystemInfos.push(d);
        }
         else if (this.selectedDept === element.Name && this.selectedType === 'All Types' ) {
          obj.SystemInfos.push(d);
        } else if (this.selectedDept === 'All Departments' && this.selectedType === 'All Types'){ 
          obj.SystemInfos.push(d);
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
    } else if (this.selectedTgaVlue == "") {
      return true;
    } else {
      return false;
    }
  }

  filterAll() {
    if (this.mySearch1 == "") {
      this.temp = this.apps.map(x => Object.assign({}, x));
    } else {
      this.temp = [];
      this.apps.forEach(e => {
        let obj = {
          Name: "",
          SystemInfos: Array<ICardInfo>()
        } as IApps;
        e.SystemInfos.forEach(t => {
          let match = false;
          for (let [key, value] of Object.entries(t)) {
            if (typeof value === "string") {
              if (
                value.toLowerCase().indexOf(this.mySearch1.toLowerCase()) > -1
              ) {
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
      if (this.temp.length === 0) {
        this.temp = this.apps.map(x => Object.assign({}, x));
      }
    }
  }
}
