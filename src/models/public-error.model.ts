import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class KbPublicError {
  @ApiProperty()
  statusCode: HttpStatus;

  // toISOString formatted Date
  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    oneOf: [ { type: 'string' }, { type: '[string]' } ]
  })
  error: string | string[];

  constructor(partial: Partial<KbPublicError> = {}) {
    Object.assign(this, partial);
  }
}
