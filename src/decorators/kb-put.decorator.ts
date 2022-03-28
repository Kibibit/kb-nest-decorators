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

import { KbApiValidateErrorResponse } from '@kb-decorators';
import { KbPublicError } from '@kb-models';
import { IClassNewable } from '@kb-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function KbPut<DbGenericType, ErrorGenericType>(
  type: IClassNewable<DbGenericType>,
  path?: string | string[],
  errorType: IClassNewable<ErrorGenericType | KbPublicError> = KbPublicError
) {
  return applyDecorators(
    Put(path),
    ApiOperation({
      summary: `Update an existing ${ type.name }`,
      description: `Expects a full ${ type.name }`
    }),
    ApiOkResponse({ type: type, description: `${ type.name } updated` }),
    ApiNotFoundResponse({
      description: `${ type.name } not found`
    }),
    ApiBadRequestResponse({ description: 'Invalid identifier supplied' }),
    KbApiValidateErrorResponse(errorType),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
