import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit,faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService} from 'src/app/services/producto.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ionEdit = faEdit;
  ionDelete = faTrash;
  ionCheck = faCheck;

  get productos() {return this.productoService.productos}

  get porcentaje() {
    const numP = this.productos.length;
    let cantidadListo = 0;
    this.productos.forEach((producto) =>{
      if(producto.listo){
        cantidadListo++;
      }
    })
    return cantidadListo * 100 / numP;
  }
  
  @Output() cambiarPorcentaje = new EventEmitter();

  @Output() actualizarProducto = new EventEmitter();

  constructor(private auth: AuthService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos(this.auth.user.uid);
  }

  eliminarProducto(index){
    const producto = this.productos[index];
    this.productoService.borrarProducto(producto);
  }

  check(index){

    const producto = this.productos[index];
    producto.listo = !producto.listo;
    this.productoService.actualizarProducto(producto);
  }

  editarProducto(index){
    this.actualizarProducto.emit(index);
  }



}
