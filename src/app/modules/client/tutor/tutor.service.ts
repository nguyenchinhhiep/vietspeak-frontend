import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint } from 'src/app/core/http/api.model';

@Injectable()
export class TutorService {
  constructor(private _httpClient: HttpClient) {}

  /**
   * Upload certificates
   *
   * @param certificates
   */
  uploadCertificates(certificates: any[]): Observable<any> {
    const formData = new FormData();

    for (let item of certificates) {
      formData.append('certificates', item);
    }

    return this._httpClient.post(ApiEndpoint.Certificates, formData);
  }
}
