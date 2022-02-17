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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private typeService: TypeService
  ) {
    if (Number(CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8)
      .slice(0, 1)) !== 1) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.type = new Type();
    this.changeType = false;
    typeService.findAll().subscribe(data => this.types = data);
  }

  addType(): void {
    this.typeService.save(this.type).subscribe(result => {
      location.reload();
    });
  }

  setType(): void {
    this.typeService.change(this.type).subscribe(result => {
      location.reload();
    });
  }

  change(): void {
    this.changeType = !this.changeType;
  }

  chooseType(e: any): void {
    const index = e.target.value;
    console.log(index);
    if (Number(index) !== -1) {
      this.type = this.types[index];
    }
    else {
      this.type = new Type();
    }
  }

}
