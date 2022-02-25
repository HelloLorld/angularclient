import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import CryptoES from 'crypto-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  userLogged: boolean;
  adminLogged: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Турфирма';
    if (localStorage.getItem('userId') === null ) { this.userLogged = false; }
    else {
      this.userLogged = true;
      const decrString = CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8);
      this.adminLogged = Number(decrString.slice(0, decrString.lastIndexOf('&'))) === 1;
    }
  }

  exit(): void {
    localStorage.clear();
    this.router.navigate(['']).then(r => location.reload());
  }
}
