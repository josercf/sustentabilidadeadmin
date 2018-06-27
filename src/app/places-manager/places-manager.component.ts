import { Component, OnInit } from '@angular/core';
import { Place, Content } from '../models/place';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

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

  endpoint: string = "/api/escola/";
  private sub: any;
  wait: boolean;
  constructor(private http: HttpClient,
    private route: ActivatedRoute) {
    this.model = new Place();
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      if (params['key']) {
        this.wait = true;
        this.http.get(environment.url + this.endpoint + params['key'])
          .subscribe((res: any) => {
            this.model = res;
            this.endereco = res.location;
            this.wait = false;
          });
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  add() {
    this.model.content.push(new Content());
  }

  remove(item: Content) {
    let index = this.model.content.indexOf(item);
    this.model.content.splice(index, 1);
  }

  salvar() {
    this.wait = true;
    this.buscarEndereco();
    this.http.post(environment.url + this.endpoint, this.model)
      .subscribe((res: any) => {

        this.wait = false;
      }, error => {
        this.wait = false;
        alert("Ocorreu um erro: ");
      });
  }

  public buscarCEP() {

    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.cep}&key=AIzaSyCVZP3oI_G0mgy2Mo5VMKchrJ6PLLZHKcQ`;

    this.http.get(url)
      .subscribe((res: any) => {

        this.wait = true;

        let googleResponse = res.results[0];

        this.endereco = googleResponse.formatted_address;
        this.model.location = this.endereco;
        this.model.position = googleResponse.geometry.location;
        console.log(googleResponse);
        this.wait = false;
      });
  }

  public buscarEndereco() {

    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.endereco}&key=AIzaSyCVZP3oI_G0mgy2Mo5VMKchrJ6PLLZHKcQ`;

    this.http.get(url)
      .subscribe((res: any) => {

        this.wait = true;
        let googleResponse = res.results[0];
        this.endereco = googleResponse.formatted_address;
        this.model.location = this.endereco;
        this.model.position = googleResponse.geometry.location;
        console.log(googleResponse);
        this.wait = false;
      });
  }
}
