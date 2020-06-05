import { Component, OnInit,ElementRef } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  
  constructor( public registerService: RegisterService, private _router: Router,  private elRef: ElementRef, private storage: AngularFireStorage) {
    localStorage.clear();
  }
  

  ngOnInit(): void {
    this.registerService.selectedEmpresa.tipo = 'Cedula';
    
  }

  onSubmit(empresa: NgForm):void{
    const file = this.elRef.nativeElement.querySelector('#file').files[0];
    const id = Math.random().toString(36).substring(2);
    const path = `upload/imagen_${id}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    
    task.snapshotChanges().pipe(finalize(()=>ref.getDownloadURL().subscribe(img => this.registerService.Agregar(empresa.value, img)))).subscribe();
    
  }

 

 
}