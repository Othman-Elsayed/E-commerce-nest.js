import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string): string {
    if (!isMongoId(value)) {
      throw new BadRequestException(`Invalid MongoID: ${value}`);
    }
    return value;
  }
}
