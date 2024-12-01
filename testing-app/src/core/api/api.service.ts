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
}
