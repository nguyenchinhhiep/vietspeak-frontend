import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { animations } from 'src/app/core/animations/public-api';
import { AlertAppearance, AlertType } from '../alert/alert.model';
import { IPayload } from './toast.model';

@Component({
  selector: 'custom-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent extends Toast implements OnInit {
  type: AlertType;
  appearance!: AlertAppearance;
  dismissable!: boolean;
  showIcon!: boolean;
  payload!: IPayload;
  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

  ngOnInit(): void {
    this.payload = this.options.payload;
    if (this.payload == null) {
      this.type = 'primary';
      this.appearance = 'fill';
      this.dismissable = false;
      this.showIcon = true;
    } else {
      this.type = this.payload.type || 'primary';
      this.appearance = this.payload.appearance || 'fill';
      this.dismissable = !!this.payload.dismissable;
      this.showIcon =
        this.payload.showIcon == null ? true : !!this.payload.showIcon;
    }
  }

  dismissedChanged(event: any) {
    this.remove();
  }
}
