import { ToastService } from './../services/toast.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();


  constructor(private service: DataService, private router: Router, private toastr: ToastService) { }

  ngOnInit(): void {
    console.log(this.router.url);
  }
  

  Login(): void{
   this.service.login(this.user).subscribe((res)=>{

      
      this.service.setToken(res.token);
      this.user = res.user;
      localStorage.setItem('user',JSON.stringify(this.user));
      this.toastr.Success("Login was completed succesfully");
  
      this.router.navigate(['/jobs']);
   })
  }


}
