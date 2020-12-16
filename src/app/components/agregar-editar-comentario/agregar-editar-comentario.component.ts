import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { responseModel } from 'src/app/models/response.model';
import { ComentarioService } from 'src/app/services/comentarios.services';
import { RouterModule } from '@angular/router';
import { Titulo } from 'src/app/models/titulo.model';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {
  comentarios: FormGroup;
  idComentario = 0;
  accion = 'agregar';
  responseModel : responseModel;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _comentariosService : ComentarioService,
              private _router : Router) {
    this.comentarios = this.fb.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    if (+this.route.snapshot.paramMap.get('id') > 0) {
      this.idComentario = +this.route.snapshot.paramMap.get('id');
    }
   }

  ngOnInit(): void {
    this.esEditar();
  }
  guardarComentario(){
    if(this.idComentario >0){
      this._comentariosService.actualizarComentario(this.idComentario, this.comentarios.value).subscribe(data=>{
        this.responseModel = data;
        if(this.responseModel !== null){
          alert(this.responseModel.mensaje);
          if(this.responseModel.resultado){
            this._router.navigate(['/']);
          }
        }
      });
    }
    else{
      this._comentariosService.guardarComentario(this.comentarios.value).subscribe(data=>{
        this.responseModel = data;
        alert(this.responseModel.mensaje);
        if(this.responseModel.resultado){
          this._router.navigate(['/']);
        }
      });
    }
  }

  esEditar() {
    if (this.idComentario > 0) {
      this.accion = 'Editar';
      this._comentariosService.cargarComentario(this.idComentario).subscribe(data=>{
        this.comentarios.patchValue({
          titulo: data.titulo,
          creador: data.creador,
          descripcion : data.descripcion
        })
      });
      
    }
  }
}
