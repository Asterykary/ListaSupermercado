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

  porcentaje: number = 0;

  estaActualizando: boolean = false;
  indice: number;

  listaSuper: Producto[] = [];

  get nombre(): AbstractControl {return this.productForm.get('nombre')}
  get cantidad(): AbstractControl {return this.productForm.get('cantidad')}

  constructor(private fb: FormBuilder){
    const _lista = JSON.parse(localStorage.getItem("lista"));
    this.listaSuper =  !_lista ?  [] : _lista;
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });
    
   
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
      this.listaSuper.push(product);
      this.nombre.setValue('');
      this.cantidad.setValue('');
      this.actualizarPorcentaje();
      localStorage.setItem("lista", JSON.stringify(this.listaSuper));
      
    }else{
      alert('Formulario invalido');
    }
  }

  actualizarPorcentaje(){
    const largoLista = this.listaSuper.length;
    const listos = this.listaSuper.filter((prod) => {
      return prod.listo == true;
    });
    const cantProductListos = listos.length;
    const resultado = (cantProductListos * 100) / largoLista;
    if(isNaN(resultado)){
      this.porcentaje = 0;
    }
    else{
      this.porcentaje = resultado;
    }
    
  }

  checkProducto(producto: Producto){
    producto.listo = !producto.listo;
    this.actualizarPorcentaje();
  }

  eliminarProducto(indice:number){
    if(this.estaActualizando){
      alert('No se puede eliminar mientras se esta actualizando...');
    }
    else{
      this.listaSuper.splice(indice,1);
      localStorage.setItem("lista", JSON.stringify(this.listaSuper));
      this.actualizarPorcentaje();
    }
    
  }

  editarProducto(product, index){
    this.indice = index;
    this.nombre.setValue(product.nombre);
    this.cantidad.setValue(product.cantidad);
    this.estaActualizando = true;
  }

  actualizar(){
    if(this.productForm.valid){
    console.log(this.indice);
    const producto = this.listaSuper[this.indice];
    producto.nombre = this.nombre.value;
    producto.cantidad = this.cantidad.value;
    this.nombre.setValue("");
    this.cantidad.setValue("");
    this.estaActualizando = false;
    localStorage.setItem("lista", JSON.stringify(this.listaSuper));
    console.log(this.nombre.value);
    }else{
      alert('Debe rellenar los campos');
    }
  }

}

export interface Producto{
  nombre: string;
  cantidad: number;
  listo: boolean;
}
