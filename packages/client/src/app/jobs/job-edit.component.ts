import { ToastService } from './../services/toast.service';
import { Job } from 'src/app/models/job';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

   job: Job;
   categories: Category[];
   form: FormGroup;
   selectedFile: any;


  constructor(private service: DataService, private router: Router, private activeRouter:ActivatedRoute, private toastr: ToastService) { }

  ngOnInit(): void {
 

    this.activeRouter.params.subscribe((params: Params) => {
      const id = params.id;
      console.log(id);
      this.service.getJobById(id).subscribe((res)=>{
       
        this.job = res;
        console.log(this.job);
        
      });

     
  
    });

    
    this.service.getCategory().subscribe((res)=>{
      this.categories = res;     
    },(err)=>{
      console.error(err);
    });

    
  }

  uploadFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];   
      this.selectedFile = file;
     // this.form.get('logo').setValue(file, {emitModelToViewChange: false});
    }
  }

  editJob(){
    var formdata = new FormData();
    console.log(this.job.category);
    formdata.append("company",this.job.company);
    formdata.append("category",this.job.category);
    formdata.append("type",this.job.type);
    formdata.append("url",this.job.url);
    formdata.append("position",this.job.position);
    formdata.append("location",this.job.location);
    formdata.append("compemail",this.job.compemail);
    formdata.append("description",this.job.description);
    if(this.selectedFile != null && this.selectedFile != undefined)
    formdata.append("logo",this.selectedFile);


    this.service.editJob(this.job._id,formdata).subscribe((res)=>{

     console.log(res);

     this.toastr.Success("Job edited");

     

     
  
   },(err)=>{
     console.error(err);
   });

   }

}
