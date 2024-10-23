import { Component,EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { MainComponent } from '../main/main.component';
import { Student, StudentService } from '../../services/student.service';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterOutlet, MainComponent ,NgFor,NgIf],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  modal: boolean = false;
  public dataa : Student[] = [];
  
  constructor(
    private student : StudentService,
    private closeModal : StudentService
  ){
    
  }
  
  @Output()
  indexPass = new EventEmitter<number>()


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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No podeir dejar campos vacios",
          footer: 'MIRA ESE WEY'
        });
      }else{
        this.student.addStudent(data);
        Swal.fire({
          title: "Estudiante agregado",
          text: "Nombre: "+nombre + " Apellido:"+apellido + " Edad:"+edad,
          icon: "success"
        });
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
      Swal.fire("No se encontro el estudiante");
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
      this.indexPass.emit(index);
      console.log("SDJKAF "+index)
      this.student.setIndex(index);
    }


}
