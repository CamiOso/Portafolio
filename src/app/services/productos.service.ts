import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando=true;
  productos: Producto[] = [];

  constructor(private http:HttpClient) {
    this.cargarProductos();

  }

 private cargarProductos(){
  this.cargando = true;
  this.http.get<Producto[]>('https://angular-html-89f0a-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe({
      next: (resp: Producto[]) => {

        this.productos = resp;



          this.cargando = false;


      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.cargando = false;
      }
    });

  }


  getProducto(id: string){

    return this.http.get<ProductoDescripcion>(`https://angular-html-89f0a-default-rtdb.firebaseio.com/productos/${id}.json`);


  }



}
