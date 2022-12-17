import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/core/navigation/navigation.service';
import { I18nService } from 'src/app/core/translation/i18n.service';
import { languages } from 'src/app/core/translation/language.model';
import { NavigationItem } from '../navigation/navigation.model';
import { NavigationComponentService } from '../navigation/navigation.service';
import { VerticalNavigationComponent } from '../navigation/vertical/vertical.component';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _i18nService: I18nService,
    private _navigationComponentService: NavigationComponentService,
    private _navigationService: NavigationService
  ) {}

  selectedLanguage: any = null;
  languages = languages;

  ngOnInit(): void {
    this.selectedLanguage = this.languages.find(
      (language) => language.value === this._translateService.currentLang
    );
    this._translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectedLanguage = this.languages.find(
        (language) => language.value == event.lang
      );

      this._updateNavigation(event.lang);
    });
  }

  onLanguageChanged(language: any): void {
    this._i18nService.language = language.value;
  }

  private _updateNavigation(lang: string): void {
    // Get nav component
    const navComponent =
      this._navigationComponentService.getComponent<VerticalNavigationComponent>(
        'adminNavigation'
      );

    // Return if the navigation component does not exist
    if (!navComponent) {
      return;
    }

    // Get the flat navigation data
    const navigation = navComponent.navigation;

    // Update the language of  the navigation
    this._navigationService.updateLanguageNavigation(navigation);

    // Refresh the navigation component
    navComponent.refresh();
  }
}
