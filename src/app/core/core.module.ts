import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthGuard} from './guards';
import {throwIfAlreadyLoaded} from './guards';
import {CachingInterceptor, LoggingInterceptor, TokenInterceptor} from './interceptors';
import {RequestCache, RequestCacheWithMap, HttpErrorHandler, MessageService} from './services';


@NgModule({
  imports: [
    HttpClientModule,

  ],
  providers: [
    AuthGuard,
    MessageService,
    HttpErrorHandler,
    {
      provide: RequestCache,
      useClass: RequestCacheWithMap,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }

  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
