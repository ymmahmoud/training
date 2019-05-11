import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider} from 'angularx-social-login';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.authService.authState.subscribe((usr) => {
      if (usr) {
        this.user = usr;
        this.router.navigate(['/dashboard']);
      }
    });
   }

  ngOnInit() {

  }

  login(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // Prevents sending a request that is invalid
      if (user != null && user.hasOwnProperty('idToken') != null) {
        this.userService.verifyUser(user.idToken).subscribe((verifiedUser) => {
          console.log(verifiedUser);
          if (verifiedUser.success) {
            localStorage.setItem('id_token', user.idToken);
            // It is okay to "create" the user everytime because if they already exist it just returns them
            this.userService.createUser(verifiedUser.user).subscribe((created) => {
              this.router.navigate(['/dashboard']);
            });
          } else {
            localStorage.removeItem('id_token');
          }
        });
      } else {
        localStorage.removeItem('id_token');
      }
    });
  }

}
