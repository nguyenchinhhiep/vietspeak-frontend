import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { IToastConfig } from './toast.model';

@Injectable()
export class ToastService {
  constructor(private _toastrService: ToastrService) {}

  open(configs: IToastConfig): ActiveToast<any> {
    return this._toastrService.show(
      configs.message,
      configs.title,
      configs.configs,
      configs.type
    );
  }
}
