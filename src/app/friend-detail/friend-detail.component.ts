import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Friend } from '../friend';
import { FriendService } from '../friend.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit {
  @Input() friend: Friend;

  constructor(private route: ActivatedRoute,
              private friendService: FriendService,
              private location: Location,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getFriend();
  }

  getFriend(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.friendService.getFriend(userId).subscribe(friend => this.friend = friend);
  }

  goBack(): void {
    this.location.back();
  }

  setLastName(): void {
    this.friendService.setLastName(this.friend);
  }

  setFirstName(): void {
    this.friendService.setFirstName(this.friend);
  }

  setUserStatus(): void {
    this.friendService.setUserStatus(this.friend);
  }

}
