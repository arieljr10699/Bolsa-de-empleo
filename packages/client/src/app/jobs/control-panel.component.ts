import { ToastService } from './../services/toast.service';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Job } from './../models/job';
import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  @Input() job: Job;
  @Output() afterDeleting: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: DataService, private router: Router, private toastr: ToastService) { }

  ngOnInit(): void {

  }

  EditJob(){

    
    this.router.navigate(['/editjob/'+this.job._id]);

  }

  DeleteJob(){
    this.toastr.Error("Job Deleted","Successful");
    this.service.deleteJob(this.job._id).subscribe((res)=>{console.log(res)},(err)=>{console.error(err)});
    this.afterDeleting.emit(this.job);
   
  }



}
