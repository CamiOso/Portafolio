import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cargando = true;
      this.http.get<Producto[]>('https://angular-html-89f0a-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe({
          next: (resp: Producto[]) => {
            this.productos = resp;
            this.cargando = false;
            resolve();
          },
          error: (err) => {
            console.error('Error al cargar productos', err);
            this.cargando = false;
            reject(err);
          }
        });
    });
  }

  getProducto(id: string) {
    return this.http.get<ProductoDescripcion>(`https://angular-html-89f0a-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      }).catch((err) => {
        console.error('Error al cargar productos para búsqueda', err);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if (prod.categoria.toLowerCase().indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
