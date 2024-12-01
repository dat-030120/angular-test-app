import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { ApiService } from '../../../../core/api/api.service';
import { CommonModule } from '@angular/common';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { Observable, Subscription, map } from 'rxjs';
import { NzModalRef,NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../../../core/service/notification.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';

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
    NzSelectModule,
    CommonModule,
    NzTimePickerModule,
    NzDividerModule
  ],
  templateUrl: './component.component.html',
  styleUrl: './component.component.scss',
})
export class ComponentComponent implements OnInit, OnDestroy {
  readonly nzModalData: any = inject(NZ_MODAL_DATA);

  constructor(
    private modal: NzModalRef,
    private iconService: NzIconService,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private noti: NotificationService
  ) {
    this.iconService.addIconLiteral('ng-zorro:delete', Delete);
    this.searchCity();
    this.timeCheckSwap();
  }
  public cityUnchange?: Subscription;
  public districtUnchange?: Subscription;

  ngOnDestroy(): void {
    this.cityUnchange?.unsubscribe();
    this.districtUnchange?.unsubscribe();
  }
  ngOnInit(): void {
    this.getListStatus()
    this.getListSource()
    this.getListSocial()
    this.getListServices()
    // xử lý khi edit
    
      if(this.nzModalData.data){
        let data = this.nzModalData.data
        let service =this.nzModalData.data.service.map((value:any)=> value.id)
        
        this.form.patchValue({
          source: data.source.id,
    social_media:data.social_media.id,
    service: [...service] ,
    status: data.status.id,
    full_name:  data.full_name,
    gender:  data.gender,
    date_of_birth: data.date_of_birth,
    phone_number:  data.phone_number,
    follow_up_date: data.follow_up_date,
    follow_down_date: data.follow_down_date,
    address: data.address,
    detailed_info: data.detailed_info||undefined,
    notes: data.notes,
    email: data.email,
    customer_code: data.customer_code,
        })

        this.form.patchValue({
          city: data.city,
          district: data.district,
          ward: data.ward,
        },{emitEvent:false})
        setTimeout(()=>{     this.getAllDistricts(data.city)
          this.getAllWards(data.district)
 } ,200)
        this.comments =[...data.comment]
      }
    

  }
  public form: FormGroup = new FormGroup({
    source: new FormControl(null, Validators.required),
    social_media: new FormControl(null),
    service: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
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
    detailed_info: new FormControl(null),
    notes: new FormControl(null),
    email: new FormControl(null, Validators.email),
    customer_code: new FormControl(null),

  });
  // List city
  Listcity: any[] = [];
  listdistrict: any[] = [];
  wardData: any[] = [];
  listStatus:any[]=[]
  listSource:any[]=[]
  listSocial:any[]=[]
  listServices:any[]=[]


  //kiểm danh sách các vị trí lỗi
  listError:any[]=[]
  // api trả về cá status lỗi
  listErrorCheckAPi:any[]=[]
  //List comments
  comments: any[] = [
   
  ];

  searchCity() {
    this.apiService.getCities().subscribe((data: any) => {
      this.Listcity = data;
      this.cdr.detectChanges();
      const city = this.form.get('city') as FormControl;

      this.cityUnchange = city.valueChanges.subscribe((value) => {
        this.form.patchValue({ district: null, ward: null });
        this.listdistrict = [];
        this.wardData = [];
        this.cdr.detectChanges;
        this.getAllDistricts(value);
      });
      const districtControl = this.form.get('district') as FormControl;
      this.districtUnchange = districtControl.valueChanges.subscribe(
        (value) => {
          this.form.patchValue({ ward: null }, { emitEvent: false });
          this.wardData = [];
          this.cdr.detectChanges;
          this.getAllWards(value);
        }
      );
    });
  }
  // Get list tỉnh huyện xã
  getAllDistricts(value: string) {
    this.apiService.getDistricts(value).subscribe((data: any) => {
      this.listdistrict = data;
      if (data[0]?.parent) {
        this.form.patchValue(
          {
            province: data[0]?.parent,
          },
          { emitEvent: false }
        );
      }
    });
    this.cdr.detectChanges;
    return;
  }
  getAllWards(id: string) {
    this.apiService.getWards(id).subscribe((data: any) => {
      if (!data) return;
      this.wardData = data;
      if (data[0]?.parent) {
        this.form.patchValue(
          {
            district: data[0].parent,
          },
          { emitEvent: false }
        );
      }
      this.cdr.detectChanges();
    });
    return;
  }
  // hoán đổi thời gian
  timeCheckSwap() {
    let follow_down_date = this.form.get('follow_down_date')?.value;
    let follow_up_date = this.form.get('follow_up_date')?.value;
    if (follow_down_date && follow_up_date) {
      if (
        new Date(follow_up_date).getTime() >
        new Date(follow_down_date).getTime()
      ) {
        this.form.patchValue(
          {
            follow_up_date: follow_down_date,
            follow_down_date: follow_up_date,
          },
          { emitEvent: false }
        );
      }
    }
  }
  //comments
  addComments() {
    this.comments.push({
      title: '',
      time: null,
      status_id: 1,
    });
    this.cdr.detectChanges()
  }

  // đóng models
  closeModels(){
    this.modal.close()
  }
  // lưu dữ liệu
  saveData(){
    if(this.form.invalid){
      Object.values(this.form.controls).forEach((controlr)=>{
        if(controlr.invalid){
          controlr.markAsDirty()
          controlr.updateValueAndValidity()
        }
      })
    }
    let body ={... this.form.value,comments:this.comments}
    //Danh cho update

    if(!body.customer_code){
      delete body.customer_code
    }
    this.apiService.createCustomer(body).subscribe({next:(value) =>{
        this.noti.success('Thành công')
        this.modal.close()
    },error:(err)=> {
      
    },})
    console.log(this.form.value)
  }
  // get list Status
  getListStatus(){
    this.apiService.getListStatus().subscribe({
      next:(value) =>{
        this.listStatus = value
      },
      error:(err)=> {
        this.noti.error('Hệ thống đang gặp lỗi vui lòng f5')
      },
    })
  }
  // get List Source
  getListSource(){
    this.apiService.getListSource().subscribe({
      next:(value) =>{
        this.listSource = value.results
      },
      error:(err)=> {
        this.noti.error('Hệ thống đang gặp lỗi vui lòng f5')
      },
    })
  }
    // add Source

  addSource(input: HTMLInputElement){
    const value = input.value;

    this.apiService.createSource({title:value.toString() }).subscribe({
      next:(value) =>{
        this.listSource.push(value)
      },
      error:(err)=> {
        this.noti.error('Vui lòng thử lại')
      },
    })
  }
   // get List Source
   getListSocial(){
    this.apiService.getListSocial().subscribe({
      next:(value) =>{
        this.listSocial = value.results
      },
      error:(err)=> {
        this.noti.error('Hệ thống đang gặp lỗi vui lòng f5')
      },
    })
  }
    // add Source

  addSocial(input: HTMLInputElement){
    const value = input.value;

    this.apiService.createSocial({title:value.toString() }).subscribe({
      next:(value) =>{
        this.listSocial.push(value)
      },
      error:(err)=> {
        this.noti.error('Vui lòng thử lại')
      },
    })
  }
     // get List Services
     getListServices(){
      this.apiService.getListServices().subscribe({
        next:(value) =>{
          this.listServices = value.results
        },
        error:(err)=> {
          this.noti.error('Hệ thống đang gặp lỗi vui lòng f5')
        },
      })
    }
      // add Source
  
    addServices(input: HTMLInputElement){
      const value = input.value;
  
      this.apiService.createServices({title:value.toString() }).subscribe({
        next:(value) =>{
          this.listServices.push(value)
        },
        error:(err)=> {
          this.noti.error('Vui lòng thử lại')
        },
      })
    }
}
