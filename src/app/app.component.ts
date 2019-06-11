
import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
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
    /* this.courses$ = this.http
      .get<Course[]>("https://angular-http-guide.firebaseio.com/courses.json").pipe(
          map((data => _.values(data)))); */
      /* const params = new HttpParams()
          .set('orderBy', '"$key"')
          .set('limitToFirst', "1");
      this.courses$ = this.http
          .get("https://angular-http-guide.firebaseio.com/courses.json", { params }).pipe(
              map((data => _.values(data)))); */
      const headers = new HttpHeaders()
          .set("Content-Type", "application/json");
      this.http.put("https://angular-http-guide.firebaseio.com/courses/-KgVwECOnlc-LHb_B0cQ.json/",
          {
              "courseListIcon": ".../main-page-logo-small-hat.png",
              "description": "Angular Tutorial For Beginners TEST",
              "iconUrl": ".../angular2-for-beginners.jpg",
              "longDescription": "...",
              "url": "new-value-for-url"
          },
          { headers })
            .subscribe(
                val => {
                    console.log("PUT call successful value returned in body",
                        val);
                },
                response => {
                    console.log("PUT call in error", response);
                },
                () => {
                    console.log("The PUT observable is now completed.");
                }
            );
    }

  }

