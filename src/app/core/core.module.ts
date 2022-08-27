import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnce } from './ensure-module-loaded-once';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';
import { StorageService } from './storage/storage.service';
import { TranslationModule } from './translation/translation.module';
import { ConfigModule } from './config/config.module';

import { SeoService } from './seo/seo.service';
import { UtilsService } from './utils/utils.service';
import { MediaWatcherService } from './media-watcher/media-watcher.service';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpModule,
    AuthModule,
    TranslationModule,
    ConfigModule,
  ],
  providers: [
    { provide: 'Window', useValue: window },
    { provide: 'Document', useValue: document },
    StorageService,
    SeoService,
    MediaWatcherService,
    UtilsService,
    UserService,
  ],
  exports: [TranslationModule],
})
export class CoreModule extends EnsureModuleLoadedOnce {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
