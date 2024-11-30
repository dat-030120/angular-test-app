import { ChangeDetectorRef, Component } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { Delete } from '../../../../assets/icon/icon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzDatePickerModule,
    NzSelectModule
  ],
  templateUrl: './component.component.html',
  styleUrl: './component.component.scss',
})
export class ComponentComponent {
  constructor(
    private modal: NzModalService,
    private iconService: NzIconService,
    private cdr: ChangeDetectorRef
  ) {
    this.iconService.addIconLiteral('ng-zorro:delete', Delete);
  }
  public form: FormGroup = new FormGroup({
    source: new FormControl(null, Validators.required),
    social_media: new FormControl(null, Validators.required),
    service: new FormControl(null, Validators.required),
    full_name: new FormControl(null, Validators.required),
    gender: new FormControl('Nam'),
    date_of_birth: new FormControl(undefined),
    phone_number: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$'
      ),
    ]),
    follow_up_date: new FormControl(null, Validators.required),
    follow_down_date: new FormControl(null, Validators.required),
    address: new FormControl(null),
    city: new FormControl(null),
    district: new FormControl(null),
    ward: new FormControl(null),
    detailed_info: new FormControl(null, Validators.required),
    notes: new FormControl(null),
    email: new FormControl(null, Validators.email),
  });
}
