import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  signUp(user: User) {
    return this.http.post<ApiResponse>(`${environment.baseApiUrl}/users`, user).pipe(
      map((response: ApiResponse) => {
        if (response) {
          localStorage.setItem('token', response.payload.token);
          return response;
        }
        return null;
      }),
      catchError((e) => throwError(e))
    );
  }
}
