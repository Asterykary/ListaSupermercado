import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() productForm: FormGroup;

  @Output() añadirProducto = new EventEmitter<Producto>();

  @Input() estaActualizando: boolean = false;

  @Output() estaActualizado = new EventEmitter();

  get nombre(): AbstractControl {return this.productForm.get('nombre')}
  get cantidad(): AbstractControl {return this.productForm.get('cantidad')}

  constructor() {
    
  }

  ngOnInit(): void {
  }

  agregarProducto(){
    console.log(this.productForm);
    if(this.productForm.valid){
      console.log('Formualrio valido');
      const product: Producto = {
        nombre: this.nombre.value,
        cantidad: this.cantidad.value,
        listo: false
      }
      this.añadirProducto.emit(product);
      this.productForm.reset();
      
    }else{
      alert('Formulario invalido');
    }
  }

  guardarProducto(){
    this.estaActualizado.emit();
  }

  
}

export interface Producto{
  nombre: string;
  cantidad: number;
  listo: boolean;
}

