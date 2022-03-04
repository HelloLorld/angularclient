import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import CryptoES from 'crypto-es';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

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
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.title = 'Турфирма "Самолётик"';
    iconRegistry.addSvgIcon(
      'plane', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icon-plane.svg')
    );
    if (localStorage.getItem('userId') === null ) { this.userLogged = false; }
    else {
      this.userLogged = true;
      const decrString = CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8);
      this.adminLogged = Number(decrString.slice(0, decrString.lastIndexOf('&'))) === 1;
    }
  }

  exit(): void {
    localStorage.clear();
    this.userLogged = false;
    this.adminLogged = false;
  }
}
