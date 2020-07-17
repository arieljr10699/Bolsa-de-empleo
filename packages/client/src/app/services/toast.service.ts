import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var toastr: any;


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService ) { }

  Success(message: string, title?:string){

    this.toastr.success(message,title);

  }

  Warning(message: string, title?:string){

    this.toastr.warning(message,title);

  }

  Error(message: string, title?:string){
    this.toastr.error(message,title);
  }

  Info(message: string, title: string){
    this.toastr.info(message, title);
  }

}
