import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  productForm: FormGroup;

  indiceProducto;

  estaActualizando = false;

  listaSuper: Producto[] = [];

  porcentaje = 0;

  constructor(private fb: FormBuilder){
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });
  }

  agregarProducto(producto: Producto){
    this.listaSuper.push(producto);
    this.cambiarPorcentaje();
    //console.log(this.listaSuper);

  }

  cambiarPorcentaje(){
    const numP = this.listaSuper.length;
    let cantidadListo = 0;
    this.listaSuper.forEach((producto) =>{
      if(producto.listo){
        cantidadListo++;
      }
    })
    this.porcentaje = cantidadListo * 100 / numP;
    //console.log(this.porcentaje); 
  }

  actualizarProducto(index){
    const producto = this.listaSuper[index];
    this.productForm.controls['nombre'].setValue(producto.nombre);
    this.productForm.controls['cantidad'].setValue(producto.cantidad);
    this.estaActualizando = true;
    this.indiceProducto = index;
  }

  guardarProducto(){
    const nombre = this.productForm.controls['nombre'].value;
    const cantidad = this.productForm.controls['cantidad'].value;

    const producto = this.listaSuper[this.indiceProducto];

    producto.nombre = nombre;
    producto.cantidad = cantidad;

    this.productForm.reset();
    this.estaActualizando = false;
  }
  
}

 export interface Producto{
   nombre: string;
   cantidad: number;
   listo: boolean;
 }
