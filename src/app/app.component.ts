import { ChangeDetectorRef, Component} from '@angular/core';
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
      if (Number(CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8)
        .slice(0, 1)) !== 1) {
        this.adminLogged = false;
      }
      else { this.adminLogged = true; }
    }
  }

  exit(): void {
    localStorage.clear();
    this.router.navigate(['']).then(r => location.reload());
  }
}
