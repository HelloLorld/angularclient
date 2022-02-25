import { Component } from '@angular/core';
import {User} from '../../model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  user: User;
  trouble = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    if (localStorage.getItem('userId') !== null) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.user = new User();
  }

  onSubmit(): void {
    this.userService.save(this.user).subscribe(result => {
      if (result != null) {
      this.router.navigate(['/login']).then(r => location.reload());
      }
      else {
        this.trouble = true;
        setTimeout(() => {
        this.trouble = false;
      }, 3000); }
    });
  }

  gotoUserList(): void {
    this.router.navigate(['/users']);
  }
}
