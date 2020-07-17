import { ToastService } from './../services/toast.service';
import { Config } from './../models/config';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

   categories: Category[];
   config : Config;
   

  constructor(private service: DataService,private router: Router, private toastr: ToastService) { }

  ngOnInit(): void {
    this.service.getCategory().subscribe((res)=>
    {
      this.categories = res;
      this.categories.forEach((a)=> console.log(a));

    },(err)=>{ console.error(err)});
    
    this.service.getConfigs().subscribe((res)=>{
      this.config = res.pop();
      console.log(this.config);
    })
    
  }
  
  postCategory(c: string){
    let ca = new Category();
    ca.tipo = c;
    this.categories.push(ca);
    this.service.createCategory(ca).subscribe((res)=>{
      console.log(res);
       this.toastr.Success("Success",'Category was created successfully');
    },(err)=>{
      console.error(err)
    });
  }

  editConfig(){
    this.service.updateConfigs(this.config).subscribe((res)=>{
      this.config = res;
      this.toastr.Success("Success",'The update was perfomed successfully');
    },(err)=>
    {
      console.error(err);
      this.toastr.Error(JSON.stringify(err),'Oops');
    });
  }

  
 

}
