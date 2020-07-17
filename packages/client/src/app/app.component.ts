import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'BolsaEmpleo';


  constructor(private service: DataService, private router : Router){}

  showNav(): boolean {

    if(this.getCurrentUrl() ==='/login' || this.getCurrentUrl() === '/register')
    return false;

    return true;

  }

  getCurrentUrl(): string{
    return this.router.url;
  }
  
  userLoggedIn(): boolean{
    return this.service.loggedIn();    
  }


  ngOnInit(){

     
  }
  Logout(){
    this.service.logoutUser();
    this.router.navigate(['/login']);
      
  }


}
