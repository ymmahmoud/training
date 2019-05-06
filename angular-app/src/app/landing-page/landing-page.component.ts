import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider} from 'angularx-social-login';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    // Get's the current state of the user
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // Prevents sending a request that is invalid
      if (user.hasOwnProperty('idToken') != null) {
        this.userService.getInfo(user.idToken).subscribe((verifiedUser) => {
          console.log(verifiedUser);
        });
      }
    });
  }

  login(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout(): void {
    this.authService.signOut();
  }
}
