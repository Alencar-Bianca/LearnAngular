import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dream } from 'models/dream.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public dre: any[] = [];
  public d: Dream[] = [];

  public title: String = "Meus Objetivos";
  public form: FormGroup;


  constructor( private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

   /*this.dre.push("1");
   this.dre.push(`Data Atual -> ${new Date()}`);
   this.dre.push("Bianca");

   this.d.push(new Dream(1,"Viajar",true))
   this.d.push(new Dream(2,"Ir na Academia",true))
   this.d.push(new Dream(3,"Passear",false))
   this.d.push(new Dream(4,"false",false))*/
   this.load()
  }


  add(){
    const title= this.form.controls['title'].value;
    const id = this.d.length + 1;
    this.d.push(new Dream(id,title,false))
    this.save();
    this.clear();
  }
  clear(){
    this.form.reset();
  }

  alterarTexto(){
    this.title="Texto alterado"
  }

  remove(sonho: Dream){
    const index = this.d.indexOf(sonho)
    if(index !== 1){
      this.d.splice(index, 1)
    }
    this.save();
  }

  markAsdone(sonho: Dream){
    sonho.done = true;
    this.save();
  }

  markAsUndone(sonho: Dream){
    sonho.done = false;
    this.save();
  }

  save(){
    const data = JSON.stringify(this.d);
    localStorage.setItem('d',data)
  }

  load(){
    this.d = JSON.parse(localStorage.getItem('d') || '{}');
  }
}
