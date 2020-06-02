import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  
  constructor( public registerService: RegisterService, private _router: Router) {}
  

  ngOnInit(): void {
    this.registerService.selectedEmpresa.tipo = 'Cedula';
    
  }

  onSubmit(empresa: NgForm):void{
    this.registerService.Agregar(empresa.value);
    this._router.navigate(['/login']);
  }

 

 
}