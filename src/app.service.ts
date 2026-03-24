import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  ultimo<T>(array: T[]): T | null {
    if (array.length === 0) {
      console.log(null)
      return null;
    } else {
      console.log(array[array.length - 1]);
      return array[array.length - 1];
    }
  }

}
