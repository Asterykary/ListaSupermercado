import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Usuario} from 'src/app/models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: firebase.User;

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    firebaseAuth.authState.subscribe((user)=>{
      if(user){
        this.user = user;
      }else{
        this.user = null;
      }

    });
  }

  loginGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    this.firebaseAuth.signInWithPopup(provider).then((resp) => {
      const usuario: Usuario = {
        id : resp.user.uid,
        nombre: resp.user.displayName,
        correo: resp.user.email
      };
      this.crearUsuario(usuario);
    }).catch((error) =>{
      console.log(error);
    })
    
  }

  cerrarSesion(){
    this.firebaseAuth.signOut();
  }

  crearUsuario(usuario: Usuario){
    return this.firestore.collection<Usuario>('usuarios').doc(usuario.id).set(usuario);
  }
}
