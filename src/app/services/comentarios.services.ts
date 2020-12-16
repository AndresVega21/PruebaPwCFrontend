import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Titulo } from '../models/titulo.model';
import { Observable } from 'rxjs';
import { responseModel } from '../models/response.model';

@Injectable({
    providedIn: 'root'
})
export class ComentarioService{
//   getListComentario() {
//     throw new Error('Method not implemented.');
//   }
    myAppUrl = 'https://localhost:44361';
    myApiUrl = '/api/Comentario/';

httpOptions = {

    headers: new HttpHeaders({
        'Content-Type': 'application/json'
})
 
};
    
    constructor(private http: HttpClient) { }
    
    getHeadLines(){
        return this.http.get<Titulo[]>(this.myAppUrl+ this.myApiUrl);
    }

    deleteComentario(id: number): Observable<responseModel> {
        return this.http.delete<responseModel>(this.myAppUrl + this.myApiUrl + id );
    }
    guardarComentario(Comentario: Titulo): Observable<responseModel> {
        return this.http.post<responseModel>(this.myAppUrl + this.myApiUrl, Comentario, this.httpOptions);
    }

    cargarComentario(id: number): Observable<Titulo> {
        return this.http.get<Titulo>(this.myAppUrl + this.myApiUrl + id);
    }
    actualizarComentario(id: number, Comentario: Titulo): Observable<responseModel>{
        return this.http.put<responseModel>(this.myAppUrl + this.myApiUrl+id, Comentario, this.httpOptions);
    }
    
}