import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery:MediaQueryList;

  menuNav=[
    {name:"Home",route:"home",icon:"home"},
    {name:"Categorias",route:"category",icon:"category"},
    {name:"Productos",router:"product",icon:"production_quantity_limits"}
  ]

  constructor(private media:MediaMatcher) {
    this.mobileQuery=media.matchMedia('(max-width: 600px)')//para el diseño responsivo
  }

  ngOnInit(): void {
  }

}
