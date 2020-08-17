import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from './services/auth.service';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  productForm: FormGroup;

  indiceProducto;

  estaActualizando = false;

  listaSuper: Producto[] = [];

  get user() {return this.auth.user}

  get loading() {return this.productoService.loading}
  
  constructor(private fb: FormBuilder, private auth: AuthService, private productoService: ProductoService){
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }


  agregarProducto(producto: Producto){
    producto.idusuario = this.auth.user.uid;
    this.productoService.agregarProducto(producto);

  }


  actualizarProducto(index){
    const producto = this.productoService.productos[index];
    this.productForm.controls['nombre'].setValue(producto.nombre);
    this.productForm.controls['cantidad'].setValue(producto.cantidad);
    this.estaActualizando = true;
    this.indiceProducto = index;
  }

  guardarProducto(){
    const nombre = this.productForm.controls['nombre'].value;
    const cantidad = this.productForm.controls['cantidad'].value;

    const producto = this.productoService.productos[this.indiceProducto];

    producto.nombre = nombre;
    producto.cantidad = cantidad;

    this.productoService.actualizarProducto(producto);
    this.productForm.reset();
    this.estaActualizando = false;
  }

  
  
}

 
