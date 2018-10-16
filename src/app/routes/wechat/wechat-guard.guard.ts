import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad, Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { CacheService } from '@delon/cache';

@Injectable({
  providedIn: 'root'
})
export class WechatGuardGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private cache: CacheService,
              private router: Router,
              @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const tokenData = this.tokenService.get<JWTTokenModel>(JWTTokenModel);

    if (!tokenData.token || tokenData.isExpired()) {
      this.cache.set('redirectUri', state.url);
      this.router.navigateByUrl('/login');
      return false;
    }

    const useragent = navigator.userAgent.toLocaleLowerCase();
    // if (!useragent.match(/MicroMessenger/i)) {
    //   this.router.navigateByUrl('/open-wechat');
    //   return false;
    // }

    return true;

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route):  boolean {

    const tokenData = this.tokenService.get<JWTTokenModel>(JWTTokenModel);
    if (!tokenData.token || tokenData.isExpired()) {
      console.log(tokenData);
      this.cache.set('redirectUri', route.path);
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }



}
