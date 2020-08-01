import { MainService } from './../../services/main.service';
import { Person } from './../../interfaces/person';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people$: Observable<Person[]>;

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.people$ = this.mainService.getPeople();
  }

}
