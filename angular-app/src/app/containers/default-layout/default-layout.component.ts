import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private router: Router, 
    private authService: AuthService, 
    private userService: UserService, 
    @Inject(DOCUMENT) _document?: any) {
    this.modifyNavBar();
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout(): void {
    this.authService.signOut(true).then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Dynamically changes the navigational bar
  modifyNavBar() : void {
    this.userService.getUserIdToken().subscribe((token) => {
      this.userService.getUserInfo(token).subscribe((resp) => {
        console.log(resp);
        this.navItems[0].name = `Weclome, ${resp.user.name.givenName}`;
      });
    });
  }
}
