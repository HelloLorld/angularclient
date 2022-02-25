import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import CryptoES from 'crypto-es';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    const decrString = CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8);
    if (Number(decrString.slice(0, decrString.lastIndexOf('&'))) !== 1) {
      router.navigate(['/login']).then(r => location.reload());
    }
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }
}
