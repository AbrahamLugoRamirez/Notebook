import { Component, OnInit, ElementRef } from '@angular/core';
import { RegistroEmpleadosService } from '../../services/registro-empleados.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-empleados',
  templateUrl: './registrar-empleados.component.html',
  styleUrls: ['./registrar-empleados.component.css']
})
export class RegistrarEmpleadosComponent implements OnInit {


  constructor(public registerService: RegistroEmpleadosService, private _router: Router, private elRef: ElementRef, private storage: AngularFireStorage) {

  }


  ngOnInit(): void {
    if (localStorage.getItem('uidEmpresa') != null) {
      console.log(localStorage.getItem('uidEmpresa'))
    } else {
      this._router.navigate(['/login']);
    }
  }

  onSubmit(empleado: NgForm): void {
    const file = this.elRef.nativeElement.querySelector('#file').files[0];
    const id = Math.random().toString(36).substring(2);
    const path = `upload/imagen_${id}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    task.snapshotChanges().pipe(finalize(() => ref.getDownloadURL().subscribe(img => this.registerService.Agregar(empleado.value, img)))).subscribe();

  }


}
