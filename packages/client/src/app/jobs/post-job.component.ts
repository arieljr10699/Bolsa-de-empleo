import { ToastService } from './../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Job } from '../models/job';
import { Category } from '../models/category';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

    selectedFile: ImageSnippet;
    job = new Job();
    categories: Category[];
    response  : any = null;
    form: FormGroup;



  constructor(private service: DataService, private router: Router, private toastr: ToastService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      company: new FormControl(),
      category: new FormControl(),
      type: new FormControl(),
      url: new FormControl(),
      position: new FormControl(),
      location: new FormControl(),
      compemail: new FormControl(),
      description: new FormControl(),      
      logo: new FormControl()
    });

    this.service.getCategory().subscribe((res)=>{
      this.categories = res;
      this.categories.forEach((v)=>{
          console.log(v);
      });
    },(err)=>{
      console.error(err);
    });

    // this.form = this.formBuilder.group({
    //   profile: ['']
    // });
  }

  uploadFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('logo').setValue(file, {emitModelToViewChange: false});
    }
  }


  postJob() : void{
    
    var formdata = new FormData();
    formdata.append("company",this.form.get('company').value);
    formdata.append("category",this.form.get('category').value);
    formdata.append("type",this.form.get('type').value);
    formdata.append("url",this.form.get('url').value);
    formdata.append("position",this.form.get('position').value);
    formdata.append("location",this.form.get('location').value);
    formdata.append("compemail",this.form.get('compemail').value);
    formdata.append("description",this.form.get('description').value);
    formdata.append("logo",this.form.get('logo').value);


    this.service.createJob(formdata).subscribe((res)=>{
     
     this.response = res;
     
     this.toastr.Success("Job Created!");
     this.router.navigate(['/jobs']);
   },(err)=>{
     console.error(err);
   });


}




}
