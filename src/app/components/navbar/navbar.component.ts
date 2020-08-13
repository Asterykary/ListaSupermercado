import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  iconCart = faShoppingCart;
  
  
  constructor() { 
    console.log(this.iconCart);
  }

  ngOnInit(): void {
  }

}
