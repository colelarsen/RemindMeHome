import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScraperServiceService {

  constructor(private http: HttpClient) { }

  
  public getCards(cards:{name:String}[]) {
    return this.http.post<{urls:String[]}>("http://remindmehome.com/yugioh", cards);
  }
}
