import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Course } from  './models/class.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
// const apiUrl = "http://localhost:1337/localhost:3000/api/classroom";
const apiUrl = "http://192.168.0.7:3000/api/classroom";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }
  classes = ['Java','React','Angular','Machine Learning'];
  courses = [
    {
      "id": "12",
      "className": "Angular",
      "instructor": "John",
      "schedule": {},
      "description": "This class is cool",
      "maximumStudents": "10",
      "icon": "",
      "students": "",
      "createdAt": "01/01/2001"
    },
        {
      "id": "13",
      "className": "Machine Learning",
      "instructor": "John",
      "schedule": {},
      "description": "This class is cool",
      "maximumStudents": "10",
      "icon": "",
      "students": "",
      "createdAt": "01/01/2001"
    },
        {
      "id": "14",
      "className": "Java",
      "instructor": "John",
      "schedule": {},
      "description": "This class is cool",
      "maximumStudents": "10",
      "icon": "",
      "students": "",
      "createdAt": "01/01/2001"
    },
        {
      "id": "15",
      "className": "React",
      "instructor": "John",
      "schedule": {},
      "description": "This class is cool",
      "maximumStudents": "10",
      "icon": "",
      "students": "",
      "createdAt": "01/01/2001"
    }];

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getClassroom(): Observable<Array<Course>> {
     let observable=Observable.create(observer => {
          setTimeout(() => {
           let listing = this.generateMockListing();
            observer.next(listing);
            observer.complete();
          }, 2000);

        });
    return observable;
  }

  getClassroomById(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postClassroom(data): Observable<any> {
    const url = `${apiUrl}/add_with_students`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateClassroom(id: string, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteClassroom(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  generateMockListing(): Array<Course> {
    let mockListing : Array<Course>;
    mockListing = new Array<Course>();
    for(let i = 1; i <= 5 ; i++) {
      let listing: any = new Course;
      listing.id = i;
      listing.class_name = this.classes[Math.floor(Math.random()*this.classes.length)];
      listing.createdAt = new Date(); 
      mockListing.push(listing);
    }
    return mockListing;
  }
}
