import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './component/main/main.component';
import { Student, StudentService } from './services/student.service';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormularioComponent } from "./component/formulario/formulario.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormularioComponent, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  modal: boolean = false;
  public dataa : Student[] = [];
  
  constructor(
    private student : StudentService,
    private closeModal : StudentService
  ){
    
  }
  
  @Input() indexPass : number=0;


  ngOnInit(): void {
    this.dataa = this.student.getStudents(); 
    this.closeModal.$theModal.subscribe((valor) => {this.modal = valor})
  }


  addStudent(nombre : string, apellido : string, edad : string){
      let data : Student= {
        nombre: nombre,
        apellido: apellido,
        edad: Number(edad)
      }
      

      if(nombre.length == 0 || apellido.length == 0 || edad.length == 0){
        alert("NO DEJAR CAMPOS VACIOS")
      }else{
        this.student.addStudent(data);
      alert("Estudiante agregado 7u7")
      console.log(data)
      }
      console.log(this.modal)
    }
    
    getStudent(){
      this.dataa = this.student.getStudents();
      let dato = JSON.stringify(this.dataa)
      alert(dato);
     console.log(dato); 
    }

    searchStudent(nombre : string){
      if(this.student.findStudent(nombre)){
        let studnt = this.student.findStudent(nombre);
        alert("Se encontro"+ studnt?.nombre)
        
      }
        
      else
        alert("No hay nada")
    }

    update(){

    }

    deleted(id : number, nombre : string){
      console.log(id);
      console.log(nombre)
        this.student.deleteStudent(nombre)
    }

    openModal(index : number){
      this.modal = true;
      this.indexPass=index;
      console.log(index)
    }
}

