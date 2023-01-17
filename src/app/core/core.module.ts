import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EnsureModuleLoadedOnce } from './ensure-module-loaded-once';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';
import { TranslationModule } from './translation/translation.module';
import { ConfigModule } from './config/config.module';
import { IconsModule } from './icons/icons.module';
import { UtilsModule } from './utils/utils.module';
import { UserModule } from './user/user.module';
import { SeoModule } from './seo/seo.module';
import { MediaWatcherModule } from './media-watcher/media-watcher.module';
import { StorageModule } from './storage/storage.module';
import { SplashScreenModule } from './splash-screen/splash-screen.module';

@NgModule({
  declarations: [],
  imports: [
    SplashScreenModule,
    HttpModule,
    AuthModule,
    TranslationModule,
    ConfigModule,
    IconsModule,
    UserModule,
    UtilsModule,
    SeoModule,
    MediaWatcherModule,
    StorageModule,
  ],
  providers: [
    { provide: 'Window', useValue: window },
    { provide: 'Document', useValue: document },
  ],
  exports: [TranslationModule],
})
export class CoreModule extends EnsureModuleLoadedOnce {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
