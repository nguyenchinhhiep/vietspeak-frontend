import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/core/translation/i18n.service';
import { languages } from 'src/app/core/translation/language.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _i18nService: I18nService
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
    });
  }

  onLanguageChanged(language: any): void {
    this._i18nService.language = language.value;
  }
}
