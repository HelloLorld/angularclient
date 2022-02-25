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
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    if (localStorage.getItem('userId') === null) {
      router.navigate(['/login']).then(r => location.reload());
    }
  }

  ngOnInit(): void {
    console.log(CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8));
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
    this.unchanged = false;
  }

  saveUser(): void {
    this.userService.change(this.user).subscribe(data => {
      console.log(data);
      if (data != null) { this.changedUser = true; }
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  }
}
