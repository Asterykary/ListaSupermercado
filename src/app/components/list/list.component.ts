import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit,faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ionEdit = faEdit;
  ionDelete = faTrash;
  ionCheck = faCheck;

  @Input () listaSuper: Producto[] = [];

  @Input () porcentaje;
  
  @Output() cambiarPorcentaje = new EventEmitter();

  @Output() actualizarProducto = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    //console.log(this.listaSuper);
  }

  eliminarProducto(index){
    this.listaSuper.splice(index,1);
    this.cambiarPorcentaje.emit();
  }

  check(index){

    const producto = this.listaSuper[index];
    producto.listo = !producto.listo;
    this.cambiarPorcentaje.emit();
    //console.log(this.listaSuper);
  }

  editarProducto(index){
    //const producto = this.listaSuper[index];
    this.actualizarProducto.emit(index);
  }


}

export interface Producto{
  nombre: string;
  cantidad: number;
  listo: boolean;
}