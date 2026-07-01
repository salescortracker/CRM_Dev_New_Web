import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, tap } from 'rxjs';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl =
        'https://localhost:44361/api/Auth'; // Change Port

    private currentUserSubject =
        new BehaviorSubject<LoginResponse | null>(
            this.getStoredUser()
        );

    currentUser$ =
        this.currentUserSubject.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    login(
        request: LoginRequest
    ): Observable<LoginResponse> {

        return this.http.post<LoginResponse>(
            `${this.apiUrl}/login`,
            request
        ).pipe(

            tap((response) => {

                if (typeof window !== 'undefined') {

                    localStorage.setItem(
                        'token',
                        response.token
                    );

                    localStorage.setItem(
                        'user',
                        JSON.stringify(response)
                    );
                }

                this.currentUserSubject.next(response);

            })

        );
    }

    logout(): void {

        if (typeof window !== 'undefined') {

            localStorage.removeItem('token');

            localStorage.removeItem('user');
        }

        this.currentUserSubject.next(null);
    }

    getToken(): string | null {

        if (typeof window === 'undefined') {
            return null;
        }

        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {

        return !!this.getToken();
    }

    getCurrentUser(): LoginResponse | null {

        return this.currentUserSubject.value;
    }

    private getStoredUser(): LoginResponse | null {

        if (typeof window === 'undefined') {
            return null;
        }

        const user = localStorage.getItem('user');

        return user
            ? JSON.parse(user)
            : null;
    }
}
