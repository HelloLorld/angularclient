import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Tour} from '../model/tour.model';
import CryptoES from 'crypto-es';


@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit {
  user: User;
  changedUser = false;
  unchanged = true;
  buttonClicked = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    if (localStorage.getItem('userId') === null) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.user = new User();
    this.user.tours = [];
  }

  ngOnInit(): void {
    const decrString = CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8);
    this.userService.getUserById(Number(decrString
      .slice(0, decrString.lastIndexOf('&')))).subscribe(data => this.user = data);
    setTimeout(() => {
      if (this.user == null) {
        localStorage.clear();
        location.reload();
      }
    }, 500);
  }

  gotoUserList(): void {
    this.router.navigate(['/users']);
  }

  handleTour(tour: Tour): void {
    if (!this.user.tours.includes(tour)) { this.user.tours.push(tour); }
    else {
      let remove: number;
      for (let i = 0; i < this.user.tours.length; i++){
        if (this.user.tours[i] === tour) { remove = i; break; }
      }
      this.user.tours.splice(remove, 1);
    }
    this.unchanged = false;
  }

  saveUser(): void {
    this.userService.change(this.user).subscribe(result => {
      this.buttonClicked = true;
      if (result != null) {
        this.changedUser = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
      else {
        this.changedUser = false;
        setTimeout(() => {
          this.buttonClicked = false;
        }, 2000);
        this.unchanged = true;
      }
    });
  }
}
