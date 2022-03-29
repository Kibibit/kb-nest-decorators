import {
  applyDecorators,
  ClassSerializerInterceptor,
  Put,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger';

import { KbApiValidateErrorResponse } from '../decorators';
import { KbPublicError } from '../models';
import { IClassNewable } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function KbPut<DbGenericType, ErrorGenericType>(
  type: IClassNewable<DbGenericType>,
  path?: string | string[],
  errorType: IClassNewable<ErrorGenericType | KbPublicError> = KbPublicError,
  options: {
    successDescription?: string;
    summary?: string;
  } = {}
) {
  return applyDecorators(
    Put(path),
    ApiOperation({
      summary: options.summary || `Update an existing ${ type.name }`,
      description: `Expects a full ${ type.name }`
    }),
    ApiOkResponse({ type: type, description: options.successDescription || `${ type.name } updated` }),
    ApiNotFoundResponse({
      description: `${ type.name } not found`
    }),
    ApiBadRequestResponse({ description: 'Invalid paramters supplied' }),
    KbApiValidateErrorResponse(errorType),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
