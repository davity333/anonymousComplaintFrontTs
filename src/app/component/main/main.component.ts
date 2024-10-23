import { Component, EventEmitter, Input, Output, output, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from "../../app.component";
import { StudentService } from '../../services/student.service';
import { FormularioComponent } from "../formulario/formulario.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormularioComponent, AppComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{

  constructor(private modal : StudentService, private student : StudentService){
  }

  @ViewChild(FormularioComponent) hijo =0;

  @Output()
  actualizarDatos = new EventEmitter<{nombre: string, apellido: string, edad: string}>()
  
  edad : number=0;

  closeModal(){
    this.modal.$theModal.emit(false)
  }

  updateModal(nombreAct: string, apellidoAct: string, edadAct: string,){
    this.edad=Number(edadAct);

    this.student.updateStu(nombreAct,apellidoAct,this.edad,this.student.getIndex())

    console.log(this.student.getStudents());
    console.log(this.student.getIndex())
  }
  receiveIndex(index : number){
    alert("Recibi " + index)
  }

}

