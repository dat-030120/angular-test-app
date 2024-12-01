import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, Observable, of } from 'rxjs';
import { City, District, Ward } from '../../app/models/Address';

// import { injectConfigs } from '../config/utils';
// import { DomainService } from '../services/domain-config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  endpointAddress = '../../assets/config/address';
  endpointApiConfig = 'https://dev.thabicare.zenix.com.vn/api/v1/';

  getCities(): Observable<any> {
    return this.http.get<City[]>(this.endpointAddress + '/cities.json');
  }
  getDistricts(cityName: string): Observable<District[]> {
    return this.http.get<District[]>(this.endpointAddress + '/districts.json').pipe(
      map((districts) => {
        return districts.filter((district) => district.parent === cityName);
      })
    );
  }

  getWards(districtName: string): Observable<Ward[]> {
    return this.http.get<Ward[]>(this.endpointAddress + '/wards.json').pipe(
      map((wards) => {
        return wards.filter((ward) => ward.parent === districtName);
      })
    );
  }
  login(body:any): Observable<any> {
    return this.http.post<any>(
      this.endpointApiConfig + `user-login/`
    ,body );
  }
  register(body:any): Observable<any> {
    return this.http.post<any>(
      this.endpointApiConfig + `create-user-account/`
    ,body );
  }

  getCustomer(): Observable<any>{
    return this.http.get<any>(
      this.endpointApiConfig + `customers/`
     );
  }
  createCustomer(body:any): Observable<any>{
    return this.http.post<any>(
      this.endpointApiConfig + `customers/`
    ,body );
  }
  getListStatus(): Observable<any>{
    return this.http.get<any>(
      this.endpointApiConfig + `customer-status/`
     );
  }
  getListSource(): Observable<any>{
    return this.http.get<any>(
      this.endpointApiConfig + `customer-source/`
     );
  }
  createSource(body:any): Observable<any>{
    return this.http.post<any>(
      this.endpointApiConfig + `customer-source/`
    ,body );
  }
  getListSocial(): Observable<any>{
    return this.http.get<any>(
      this.endpointApiConfig + `customer-social/`
     );
  }
  createSocial(body:any): Observable<any>{
    return this.http.post<any>(
      this.endpointApiConfig + `customer-social/`
    ,body );
  }
  getListServices(): Observable<any>{
    return this.http.get<any>(
      this.endpointApiConfig + `services/`
     );
  }
  createServices(body:any): Observable<any>{
    return this.http.post<any>(
      this.endpointApiConfig + `services/`
    ,body );
  }
  
}
