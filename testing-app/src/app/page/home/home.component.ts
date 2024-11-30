import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { Sort_Circle, User_Circle } from '../../../assets/icon/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ComponentComponent } from './component/component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzIconModule,NzModalModule ,NzInputModule, NzAvatarModule, CommonModule,NzPaginationModule,NzSelectModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private iconService: NzIconService, private cdr: ChangeDetectorRef,    private modal: NzModalService,
  ) {
    this.iconService.addIconLiteral('ng-zorro:user_circle', User_Circle)
    this.iconService.addIconLiteral('ng-zorro:sort_circle', Sort_Circle)
  }
  ngOnInit(): void {
    this.checkForLoop();
  }

  userAcoutn: string = '';
  pageSize: number = 10;
  ListUser: any[] = [ {
    id: 166,
    status: {
      id: 1,
      title: 'ok',
      created_at: '2024-11-19T21:44:34.748363',
      updated_at: '2024-11-19T21:44:34.748443',
      user: 1,
    },
    source: {
      id: 83,
      title: 'string',
      description: null,
      created_at: '2024-11-30T00:19:03.743880',
      updated_at: '2024-11-30T00:19:03.743920',
      user: 63,
    },
    social_media: {
      id: 52,
      title: 'string',
      created_at: '2024-11-30T00:34:12.743255',
      updated_at: '2024-11-30T00:34:12.743312',
      user: 63,
    },
    comment: [
      {
        id: 218,
        title: 'string',
        time: '2024-11-30T00:34:12.743255',
        status_id: 1,
        status: {
          id: 1,
          title: 'ok',
          created_at: '2024-11-19T21:44:34.748363',
          updated_at: '2024-11-19T21:44:34.748443',
          user: 1,
        },
      },
    ],
    service: [
      {
        id: 76,
        title: 'string',
        description: null,
        effect: null,
        price: null,
        status: 'active',
        created_at: '2024-11-30T00:07:06.244803',
        updated_at: '2024-11-30T00:07:06.244891',
        user: 63,
      },
    ],
    service_request: [],
    medicine: [],
    customer_code: 'YW04170',
    status_service: 1,
    status_treatment: null,
    full_name: 'string',
    gender: 'Nam',
    date_of_birth: '2024-11-30T00:34:12.743255',
    phone_number: '0702458485',
    email: null,
    follow_up_date: '2024-11-30T00:34:12.743255',
    follow_down_date: '2024-11-30T00:34:12.743255',
    address: 'string',
    city: 'Ha noi',
    district: 'tan',
    ward: 'string',
    notes: 'tesst',
    diagnosis: null,
    treatment: null,
    appointment_time: null,
    actual_arrival_time: null,
    created_at: '2024-11-30T15:09:10.674834',
    updated_at: '2024-11-30T15:09:10.674856',
    sales_person: null,
    doctor_performed: null,
    user: 63,
  },];
  pageNumber: number = 1;
  ListItem: any[] = [
   
  ];
  // Hàm tạo lại mảng
  checkForLoop() {
    this.ListItem = Array.from({ length: this.pageSize }, (_, i) => {
      const user = this.ListUser[((this.pageNumber-1) * this.pageSize) + i];
      return user ? user : {};
    });
  }
  // Reset pagenumber Khi thay đổi page size
  restPage(data:any){
    if(
      typeof data === 'number' && !isNaN(data)
    ){
      this.pageNumber=1
      this.pageSize=data
      this.checkForLoop()
      this.cdr.detectChanges()
      return
    }
    this.pageNumber=1
    this.pageSize=10 
  }
    // Change Page
  onPageChange( data:any){
    this.checkForLoop()
  }
  // Mở modal  thêm mới khách hàng
  openCustomer(){
    const Modal = this.modal.create<ComponentComponent>({
      nzTitle: '',
      nzContent: ComponentComponent,
      nzWrapClassName: "modaleCss",
      nzData: {
      },
      nzStyle:{ top: '20px' },
      nzWidth: 1200,
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: null
    });
  }
}
