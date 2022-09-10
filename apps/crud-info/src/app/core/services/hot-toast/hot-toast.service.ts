import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class MyHotToastService {
  constructor(readonly hotToastService: HotToastService) {}

  success(message: string) {
    this.hotToastService.success(message, {
      duration: 1500,
    });
  }

  error(message: string) {
    this.hotToastService.error(message, {
      duration: 1500,
    });
  }

  warning(message: string) {
    this.hotToastService.warning(message, {
      duration: 1500,
    });
  }
}
