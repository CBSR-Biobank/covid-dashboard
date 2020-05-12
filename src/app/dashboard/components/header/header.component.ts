import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@app/services/layout.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  isLoggedIn = false;
  user: any;

  userMenu = [
    {
      title: 'Profile',
      icon: 'person-outline'
    },
    {
      title: 'Log out',
      link: 'auth/logout',
      icon: 'lock-outline'
    }
  ];

  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private accessChecker: NbAccessChecker,
    private authService: NbAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        const payload = token.getPayload();
        this.user = {
          name: payload.name
        };
      }
    });

    this.accessChecker
      .isGranted('edit', 'user')
      .pipe(takeUntil(this.destroy$))
      .subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  login() {
    this.router.navigate(['/auth/login']);
  }
}
