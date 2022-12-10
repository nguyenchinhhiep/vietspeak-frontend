import { IndividualConfig } from 'ngx-toastr';
import { AlertAppearance, AlertType } from '../alert/alert.model';

export interface IPayload {
   type?: AlertType;
   appearance?: AlertAppearance;
   dismissable?: boolean;
   showIcon?: boolean;
}
export interface IToastrConfig extends Partial<IndividualConfig> {
  payload?: IPayload
}

export interface IToastConfig {
  message: string;
  title?: string;
  type?: string;
  configs?: IToastrConfig;
}
