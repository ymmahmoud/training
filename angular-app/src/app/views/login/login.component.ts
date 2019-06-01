import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider} from 'angularx-social-login';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'

})


export class LoginComponent implements OnInit {

  user: SocialUser;
  error: string | undefined;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.authService.authState.subscribe((usr) => {
      if (usr && !this.error) {
        this.user = usr;
        this.router.navigate(['/dashboard']);
      }
    });
   }

  ngOnInit() {

  }

  async login(): Promise<void> {
    try {
      const authedUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      // It's okay for this to be a cliet side verification as if the client edits it, it just ruins their experience
      if (!authedUser.email.includes('@rpiambulance.com')) {
        await this.authService.signOut(true);
        throw 'Not a valid RPIA email';
      }
      this.authService.authState.subscribe((user) => {
        // Clears the old error
        this.error = undefined;
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
            }
          });
        }
      });
    } catch (err) {
      console.error(err);
      this.error = err;
      return;
    }
  }

}
