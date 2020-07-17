import { Component, OnInit } from '@angular/core';
import {JobListComponent} from '../jobs/job-list.component';
import {Job} from '../models/job';
import {ActivatedRoute, Params} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {


   job = new Job();
   imageToShow: any;
  
  constructor(private route: ActivatedRoute, private service: DataService) {
    
  }

  ngOnInit(): void {

    let id = "";
    this.route.params.subscribe((params: Params) => {
       id = params.id;
      console.log(id);
    });
    this.service.getJobById(id).subscribe((res)=>{
       
      this.job = res;
      console.log(this.job);     

      this.service.getJobLogo(this.job.logo).subscribe((res)=>{
        this.createImageFromBlob(res);
        console.log(res);
      },(err)=>{console.error(err)});


      
    });

    


    
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }



}
