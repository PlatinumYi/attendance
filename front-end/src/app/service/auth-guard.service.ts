import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (sessionStorage.getItem('token') != null) {
      return true; }

    // Store the attempted URL for redirecting
    sessionStorage.setItem('redirectUrl', url);

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
