import { Component, OnInit } from '@angular/core';
import { Place } from '../models/place';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {

  items: Place[] = [];
  endpoint: string ="/api/escola";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Place[]>(environment.url+this.endpoint)
    .subscribe(data => this.items = data);
  }

}
