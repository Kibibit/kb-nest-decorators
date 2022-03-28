import {
  applyDecorators,
  ClassSerializerInterceptor,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { KbApiValidateErrorResponse } from '../decorators';
import { KbPublicError } from '../models';
import { IClassNewable } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function KbPost<DbGenericType, ErrorGenericType>(
  type: IClassNewable<DbGenericType>,
  path?: string | string[],
  errorType: IClassNewable<ErrorGenericType | KbPublicError> = KbPublicError
) {
  return applyDecorators(
    Post(path),
    ApiOperation({ summary: `Create a new ${ type.name }` }),
    ApiCreatedResponse({
      description: `The ${ type.name } has been successfully created.`,
      type
    }),
    KbApiValidateErrorResponse(errorType),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
