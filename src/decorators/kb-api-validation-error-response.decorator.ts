

import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { IClassNewable } from '../types';


export function KbApiValidateErrorResponse<T>(ErrorClass: IClassNewable<T>) {
  return applyDecorators(
    ApiResponse({
      description: 'Some validation error as accured on the given model',
      status: HttpStatus.METHOD_NOT_ALLOWED,
      type: ErrorClass
    })
  );
}
