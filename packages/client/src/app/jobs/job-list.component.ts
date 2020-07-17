import { User } from './../models/user';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Job } from '../models/job';
import {Category} from '../models/category';
import { Subject } from 'rxjs';
import {JobDetailComponent} from '../jobs/job-detail.component';




@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  detailj:any;
  CATEGORIES: string[] = [];
  jobs:any;
  dtTrigger = new Subject();
  config = {
    itemsPerPage: 3,
    currentPage: 1
  };;

  user: User;
  searchTerm: string;
  filteredJobs: any;
  amount: number;

  


 
  constructor(private service: DataService, private router: Router) {

    
   }

  

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.user = this.service.getCurrentUser();
    this.fetchJobs();     
    this.dtTrigger.next();
    this.service.getConfigs().subscribe((res)=>{
      let c = res.pop();
      this.config.itemsPerPage = c.amount;
      this.amount = c.amount;
    });
   

  }
   refresh(data){
     this.filteredJobs.splice(this.filteredJobs.indexOf(data),1);
   }

  filteredJob(value: string){
     if(value.trim() === ""){
       this.filteredJobs = this.jobs;
     }

     this.service.getSearchJob(value).subscribe((res)=>
     {
       this.filteredJobs = res;
       console.log(res);
     },(err)=>{console.error(err)});
  }

  jobDetail(id:any): void{
 
       this.router.navigate(['/jobs/'+id]);
    
   }

   postJob(): void {

    this.router.navigate(['/create-job'])

   }

  ngOnDestroy():void{

    this.dtTrigger.unsubscribe();

  }

  categoryFiller(){

    this.service.getJobs().subscribe(jobs=>{
      this.jobs = jobs;
      
    });
    for(let counter in this.jobs){

      
      if(!this.CATEGORIES.includes(this.jobs[counter].category.tipo)){

        this.CATEGORIES.push(this.jobs[counter].category.tipo);
        console.log(this.jobs[counter].category.tipo);
      }

    }
  }
  fetchJobs(){
    this.jobs = null;
    this.filteredJobs = null;
    this.service.getJobs().subscribe((res)=>{
      this.jobs = res;
      this.filteredJobs = res;
 
      for(let counter in this.jobs){

      
        if(!this.CATEGORIES.includes(this.jobs[counter].category.tipo)){
  
          this.CATEGORIES.push(this.jobs[counter].category.tipo);
          console.log(this.jobs[counter].category.tipo);
        }
  
      }
      
  
    },(err) =>{
      console.error(err);
    });

   

  }



pageChanged(event){
  this.config.currentPage = event;
}

login(){
  this.router.navigate(['/login']);

}

showJobs(value: string){
  this.router.navigate(['job/category/'+value]);
}
signUp(){

  this.router.navigate(['/register']);

}

adminPanel(){
  this.router.navigate(['/adminpanel']);
}

logout(){
  this.service.logoutUser();
  this.router.navigate(['']);
}

showAdminPanel(): boolean{
  if(this.user === null || undefined)  return false;
  if(this.user.rol === "Administrador")
   return true;
   else
   return false;
}

showPost(): boolean{
  if(this.user === null || undefined)  return false;
  if(this.user.rol === "Poster") 
   return true;
  else
    return false;

}


}
