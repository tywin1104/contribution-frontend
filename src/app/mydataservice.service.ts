import { Injectable } from '@angular/core';  
import { HttpClient , HttpHeaders  } from '@angular/common/http';  
  
@Injectable()  
export class MydataserviceService {  
  
  constructor(private http: HttpClient) { }  
  
  // Method to call api to get images  
  getMyPhotos(page: number)  
  {  
    return this.http.get('https://jsonplaceholder.typicode.com/photos?_page='+page);  
  }  
}  