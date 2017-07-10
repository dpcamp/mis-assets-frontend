import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';

@Injectable()
export class UserService {
  private usersUrl: string = 'http://192.168.235.96:3000/api/users';

  // observable source
  private userCreatedSource = new Subject<User>();
  private userDeletedSource = new Subject();

  // observable stream
  userCreated$ = this.userCreatedSource.asObservable();
  userDeleted$ = this.userDeletedSource.asObservable();

  constructor(private http: Http) {}

  /**
   * Get all users
   */
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(res => res.json())
      .map(users => users.map(this.toUser))
      .catch(this.handleError);
  }

  /**
   * Get a single user
   */
  getUser(id: number): Observable<User> {
    // attaching a token
    let headers = new Headers();
    //let token   = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.usersUrl}/${id}`)
      .map(res => res.json())
      .map(this.toUser)
      .catch(this.handleError);
  }

  /**
   * Create the user
   */
  createUser(user: User): Observable<User> {
    return this.http.post(this.usersUrl, user)
      .map(res => res.json())
      .do(user => this.userCreated(user))
      .catch(this.handleError);
  }

  /**
   * Update the user
   */
  updateUser(user: User): Observable<User> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Delete the user
   */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`)
      .do(res => this.userDeleted())
      .catch(this.handleError);
  }
  /**
   * Convert user info from the API to our standard/format
   */
  
  private toUser(user): User {
    return {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      website: user.website
    };
  }

  /**
   * The user was created. add this info to our stream
   */
  userCreated(user: User) {
    this.userCreatedSource.next(user);
  }

  /**
 * The user was deleted. add this info to our stream
 */
  userDeleted() {
    this.userDeletedSource.next();
  }

  
  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}
