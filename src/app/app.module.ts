import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterDataPipe } from './pipes/filter-data.pipe';
import { FilterDataObjectsPipe } from './pipes/filter-data-objects.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterDataPipe,
    FilterDataObjectsPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
