import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Type} from '../../model/type.model';
import {TypeService} from '../../service/type.service';
import CryptoES from 'crypto-es';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent {
  type: Type;
  types: Type[];
  changeType: boolean;
  haveChange: boolean;
  buttonClicked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private typeService: TypeService
  ) {
    const decrString = CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8);
    if (Number(decrString.slice(0, decrString.lastIndexOf('&'))) !== 1) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.type = new Type();
    this.changeType = false;
    typeService.findAll().subscribe(data => this.types = data);
  }

  addType(): void {
    this.typeService.save(this.type).subscribe(result => {
      this.buttonClicked = true;
      location.reload();
    });
  }

  setType(): void {
    this.typeService.change(this.type).subscribe(result => {
      this.buttonClicked = true;
      if (result != null) {
        this.haveChange = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
      else {
        this.haveChange = false;
        setTimeout(() => {
          this.buttonClicked = false;
        }, 2000);
      }
    });
  }

  change(): void {
    this.changeType = !this.changeType;
    this.type = new Type();
  }

  chooseType(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.type = this.types[index];
    }
    else {
      this.type = new Type();
    }
  }

}
