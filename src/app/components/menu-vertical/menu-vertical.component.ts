import { Component, OnInit , ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { PreguntasService } from '../../services/preguntas.service';

@Component({
  selector: 'app-menu-vertical',
  templateUrl: './menu-vertical.component.html',
  styleUrls: ['./menu-vertical.component.css']
})
export class MenuVerticalComponent implements OnInit {

  constructor(public preguntasService: PreguntasService, private elRef: ElementRef) { }

  ngOnInit(): void {
  }
  onSubmit(pregunta: NgForm): void {
    
  this.preguntasService.Agregar(pregunta.value);

  }

}
