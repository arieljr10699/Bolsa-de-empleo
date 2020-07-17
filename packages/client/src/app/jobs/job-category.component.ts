import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from '../models/job';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-job-category',
  templateUrl: './job-category.component.html',
  styleUrls: ['./job-category.component.css']
})
export class JobCategoryComponent implements OnInit {

  displayedColumns: string[] = ['company', 'position', 'location'];
  dataSource = new  MatTableDataSource<Job>();
  category: any;

@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.category = params.id;
      this.service.getJobByCategory(params.id).subscribe((res)=>
    {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    
      this.dataSource.paginator = this.paginator;
    },(err)=>{console.error(err);})
   });
   
  }

}
