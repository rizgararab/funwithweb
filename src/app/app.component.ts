
import { Component, OnInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface Course {
  description: string;
  courseListIcon: string;
  iconUrl: string;
  longDescription: string;
  url: string;
}

@Component({
  selector: 'app-root',
  template: `
      <ul *ngIf="courses$ | async as courses else noData">
          <li *ngFor="let course of courses">
              {{course.description}}
          </li> 
      </ul>
      <ng-template #noData>No Data Available</ng-template>
  `})
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.courses$ = this.http
      .get<Course[]>("https://angular-http-guide.firebaseio.com/courses.json").pipe(
        map((data => _.values(data))));
        }
}

