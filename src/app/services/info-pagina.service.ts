import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info:InfoPagina={};
  cargada=false;
  equipo:any[]=[];


  constructor(private http: HttpClient) {


    this.cargarInfo();
    this.cargarEquipo();



   }


   private cargarInfo(){
    this.http.get('assets/data/data-pagina.json').subscribe((resp:InfoPagina)=>{
      this.cargada=true;
      this.info=resp;



    });


   }

   private cargarEquipo() {

    this.http.get<{ equipo: any[] }>('https://angular-html-89f0a-default-rtdb.firebaseio.com/.json')
    .pipe(
      map(resp => resp.equipo || []), // Accede a la propiedad equipo o devuelve un array vacío
      catchError(error => {
        console.error('Error al cargar los datos del equipo:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    )
    .subscribe((equipo: any[]) => {
      this.equipo = equipo;
   
    });

  }


}
