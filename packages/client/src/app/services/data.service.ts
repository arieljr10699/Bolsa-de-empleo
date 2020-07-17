import { HttpClientHelper } from './HttpClientHelper';
import { Config } from './../models/config';
import { Job } from "src/app/models/job";
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../models/category';
import {User} from '../models/user';
import { RegisterComponent } from '../users/register.component';
import { ThrowStmt, CastExpr } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private httpOptions = {
    headers : new HttpHeaders({"Content-Type":"application/json"})
  };


  constructor(private httpClient: HttpClient) { 
     
  }

  loggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getToken(): string{
    return localStorage.getItem('token');
  }

 

  logoutUser(): void{
    localStorage.removeItem('token');
    
  }


  setToken(token: string){
  
    localStorage.setItem('token',token);
   
  }

  getCurrentUser(): User{

    if(this.loggedIn()){
      let u =  JSON.parse(localStorage.getItem('user')) ;
      return u;

    }
    else{
     return null;
    }
  
  }
  
  registerUser(user: User): Observable<any>{
          
      return this.httpClient.post<any>(`${HttpClientHelper.baseURL}/api/users/`,user,this.httpOptions);
    
  }

  login(user: User): Observable<any>{
    return this.httpClient.post<any>(`${HttpClientHelper.baseURL}/api/users/login/`,user,this.httpOptions);
  }



  getCategory(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${HttpClientHelper.baseURL}/api/categories/`,this.httpOptions); 
  }

  createCategory(c: Category): Observable<Category>{

     return this.httpClient.post<Category>(`${HttpClientHelper.baseURL}/api/categories/`,c,this.httpOptions);
     
  }

  updateCategory(c: Category): Observable<Category>{

    return this.httpClient.put<Category>(`${HttpClientHelper.baseURL}/api/categories/`,c,this.httpOptions);
    
 }


  getJobs(): Observable<Job[]> {

          return this.httpClient.get<Job[]>(`${HttpClientHelper.baseURL}/api/jobs/`,this.httpOptions);
      
  }
  
  getSearchJob(s: string): Observable<Job[]> {

    return this.httpClient.get<Job[]>(`${HttpClientHelper.baseURL}/api/jobs/search/`+s,this.httpOptions);

}

  getJobLogo(fileName: string): Observable<Blob> {
    return this.httpClient.get(`${HttpClientHelper.baseURL}/api/jobs/logos/`+fileName, { responseType: 'blob' });
  }


  getJobById(id: string){

    return this.httpClient.get<Job>(`${HttpClientHelper.baseURL}/api/jobs/`+id,this.httpOptions);
  }

  getJobByCategory(id: string): Observable<Job[]>{

    return this.httpClient.get<Job[]>(`${HttpClientHelper.baseURL}/api/jobs/category/`+id,this.httpOptions);

  }

  createJob(formData: FormData): Observable<Job>{

    return this.httpClient.post<Job>(`${HttpClientHelper.baseURL}/api/jobs/`,formData);
     
  }

  editJob(id: string, f: FormData): Observable<Job> {
    return this.httpClient.put<Job>(`${HttpClientHelper.baseURL}/api/jobs/`+id,f);
  }

  deleteJob(id: string): Observable<any>{
    return this.httpClient.delete<any>(`${HttpClientHelper.baseURL}/api/jobs/`+id,this.httpOptions);
  }

  getConfigs(): Observable<Config[]> {

  
     return this.httpClient.get<Config[]>(`${HttpClientHelper.baseURL}/api/configs/`,this.httpOptions);
     
 }

 updateConfigs(c: Config): Observable<any>{
   return this.httpClient.put<any>(`${HttpClientHelper.baseURL}/api/configs/`+c._id,c,this.httpOptions);
 }

 
  errorHandler(errorResponse: HttpErrorResponse) {
     if(errorResponse.error instanceof ErrorEvent){
       console.error("Client side error", errorResponse.error.message);
     }
     else{
       console.error("Server side error",errorResponse);
     }
     return throwError("There is a problem with the service");
  }

  

}
