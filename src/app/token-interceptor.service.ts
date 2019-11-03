import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { RegisterService } from './register.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injetor: Injector) { }

  intercept(req, next) {
    let registerService = this.injetor.get(RegisterService)
    let tokenizedRequest = req.clone ({

      setHeaders : {
        Authorization : `Bearer ${registerService.getToken()}`
      }
    })

    return next.handle(tokenizedRequest)
  }

}
