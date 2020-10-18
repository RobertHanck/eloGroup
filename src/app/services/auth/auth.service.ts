import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post<ApiResponse>(`${environment.baseApiUrl}/auth/login`, user).pipe(
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
