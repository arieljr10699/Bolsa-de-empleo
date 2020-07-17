
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthguardService } from './services/authguard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule, rountingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from "./services/data.service";
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { PostJobComponent } from './jobs/post-job.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminPanelComponent } from './jobs/admin-panel.component';
import { PipesModule } from 'w-ng5';
import { ControlPanelComponent } from './jobs/control-panel.component';
import { JobEditComponent } from './jobs/job-edit.component';
import { ToastService } from './services/toast.service';
import { JobCategoryComponent } from './jobs/job-category.component';
import  {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    rountingComponents,
    PostJobComponent,
    ControlPanelComponent,
    JobEditComponent
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    NgxPaginationModule,
    PipesModule,
    MatTableModule,
    MatPaginatorModule,
    NgbAlertModule,
    ToastrModule.forRoot()

  ],
  providers: [ToastService,DataService,AuthguardService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
