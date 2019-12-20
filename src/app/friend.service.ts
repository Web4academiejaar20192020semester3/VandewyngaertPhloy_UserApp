import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Friend } from './friend';
import { FRIENDS } from './mock-friends';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class FriendService {
  private url = 'http://localhost:8080/Controller';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getServerFriends(): Observable<Friend[]> {
    // TODO: send the message _after_ fetching the friends
    this.messageService.add('FriendService: fetched friends');
    return this.http.get<any>(this.url, {params: new HttpParams().set('action', 'GetUsers')});
  }
  setFirstName(friend: Friend): void {
    const body = new HttpParams().append('firstName', friend.firstName).append('userId', friend.userId);
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<any>(this.url + '?action=SetFriendAppFirstName&firstName=' + friend.firstName + '&userId=' +
      friend.userId, body, {headers: header}).subscribe((res) => console.log(res), (err) => console.log(err));
  }
  setLastName(friend: Friend): void {
    const body = new HttpParams().append('lastName', friend.lastName).append('userId', friend.userId);
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<any>(this.url + '?action=SetFriendAppLastName&lastName=' + friend.lastName + '&userId=' +
      friend.userId, body, {headers: header}).subscribe((res) => console.log(res), (err) => console.log(err));
  }

    getFriend(userId: string): Observable<Friend> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`FriendService: fetched friend userId=${userId}`);
    return this.http.get<Friend>(this.url + '?action=GetSpecificUser&userId=' + userId);
  }
}
