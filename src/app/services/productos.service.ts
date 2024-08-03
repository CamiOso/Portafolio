import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando=true;

  constructor(private http:HttpClient) {
    this.cargarProductos();

  }

 private cargarProductos(){
  this.cargando = true; // Asegúrate de inicializar 'cargando' antes de hacer la llamada HTTP
  this.http.get<Producto[]>('https://angular-html-89f0a-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe({
      next: (resp: Producto[]) => {
        console.log(resp);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.cargando = false;
      }
    });

  }
}
