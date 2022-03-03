import {Component} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import CryptoES from 'crypto-es';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  pass: string;
  mail: string;
  loginInfo: Map<string, string>;
  getLogged: Map<string, number>;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    if (localStorage.getItem('userId') !== null) {
      router.navigate(['/account']).then(r => location.reload());
    }
    this.loginInfo = new Map<string, string>();
    this.getLogged = new Map<string, number>();
  }

  onSubmit(): void {
    this.loginInfo.set('password', this.pass);
    this.loginInfo.set('email', this.mail);
    this.userService.getUserByEmail(this.loginInfo).subscribe( data => {
      // @ts-ignore
      this.getLogged.set('email', data.email);
      // @ts-ignore
      this.getLogged.set('password', data.password);
      if (this.getLogged.get('email') && this.getLogged.get('password')) { // @ts-ignore
        localStorage.setItem('userId', CryptoES.AES.encrypt(data.userId.toString() + '&somebigstring', 'idForUser').toString());
        this.router.navigate(['/account']).then(r => location.reload());
      }
    });
  }

}
