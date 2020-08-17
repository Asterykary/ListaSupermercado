import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  iconCart = faShoppingCart;
  get user() {return this.auth.user}
  
  
  constructor(private auth: AuthService) { 
    console.log(this.iconCart);
  }

  ngOnInit(): void {
  }

  loginGoogle(){
    this.auth.loginGoogle();
  }

  cerrarSesion(){
    this.auth.cerrarSesion();
  }

}
