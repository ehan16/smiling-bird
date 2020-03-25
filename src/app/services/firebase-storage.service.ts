import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class FirebaseStorageService {

  basePath = '/images';
  file: File;
  url = '';

  constructor(
    private storage: AngularFireStorage
  ) { }

  // Upload file
  public uploadCloudStorage(fileName: string, data: any) {
    return this.storage.upload(fileName, data);
  }

  // File reference
  public referenceCloudStorage(fileId: string) {
    return this.storage.ref(fileId);
  }

}
