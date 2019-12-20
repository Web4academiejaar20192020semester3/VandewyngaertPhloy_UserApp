import { Component, OnInit } from '@angular/core';

import { Friend } from '../friend';
import { FriendService } from '../friend.service';

import { timer } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: [ './friends.component.css' ]
})
export class FriendsComponent implements OnInit {
  friends: Friend[];

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    this.getFriends();
  }

  getFriends(): void {
    timer(0, 2500).subscribe(() => {
      this.friendService.getServerFriends().subscribe(friends => this.friends = friends);
    });
  }
}
