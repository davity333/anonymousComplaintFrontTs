import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  $theModal = new EventEmitter<any>
  
  private estudiantes :Student[] = [];
  private index : number=0;
  constructor() { }

  public addStudent(student : Student):boolean {
    let tam=this.estudiantes.length;
    let flag = false;
    this.estudiantes.push(student);
    if(this.estudiantes.length - tam === 1) 
      flag = true;
    return true;
  }

  public findStudent(firsName : string): Student | undefined{
    return this.estudiantes.find(student => student.nombre === firsName)
  }

  public deleteStudent(firsName : string):number{
    let index = this.estudiantes.findIndex(student => student.nombre === firsName)
    let num = 0;

    if(index !== -1)
      num = this.estudiantes.splice(index,1).length;
    return num;
  }

  public getStudents() : Student[]{
    return this.estudiantes;
  }

public updateStu(firsName : string, lastname : string, age: number, index : number) : boolean {
      this.estudiantes[index].nombre = firsName;
      this.estudiantes[index].apellido = lastname;
      this.estudiantes[index].edad = age;
      return true;
}

  public setIndex(indexPass: number){
        this.index=indexPass;
  }

  public getIndex(){
    return this.index;
  }
}

export interface Student{
  nombre: string,
  apellido: string,
  edad: number
}