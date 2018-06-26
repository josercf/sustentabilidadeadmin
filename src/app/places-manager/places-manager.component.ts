import { Component, OnInit } from '@angular/core';
import { Place, Content } from '../models/place';

import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-places-manager',
  templateUrl: './places-manager.component.html',
  styleUrls: ['./places-manager.component.css']
})
export class PlacesManagerComponent implements OnInit {

  model: Place;
  cep: string;
  endereco: string;
  numero: string;

  wait: boolean;
  constructor(private http: HttpClient) {
    this.model = new Place();
  }

  ngOnInit() {
    this.add();
  }

  add() {
    this.model.Content.push(new Content());
  }

  remove(item: Content) {
    let index = this.model.Content.indexOf(item);
    this.model.Content.splice(index, 1);
  }

  salvar() {
    this.buscarEndereco();
    alert(JSON.stringify(this.model));
  }

  public buscarCEP() {
    
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.cep}&key=AIzaSyCVZP3oI_G0mgy2Mo5VMKchrJ6PLLZHKcQ`;

    this.http.get(url)
      .subscribe((res :any) => {

        this.wait = true;

        let googleResponse = res.results[0];

        this.endereco = googleResponse.formatted_address;
        this.model.Location = googleResponse.geometry.location;
        console.log(googleResponse);
        this.wait = false;
      });
  }

  public buscarEndereco() {
    
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.endereco}&key=AIzaSyCVZP3oI_G0mgy2Mo5VMKchrJ6PLLZHKcQ`;

    this.http.get(url)
      .subscribe((res :any) => {

        this.wait = true;
        let googleResponse = res.results[0];
        this.model.Position = googleResponse.formatted_address;
        this.model.Location = googleResponse.geometry.location;
        console.log(googleResponse);
        this.wait = false;
      });
  }



}
