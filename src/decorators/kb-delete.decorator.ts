import {
  applyDecorators,
  ClassSerializerInterceptor,
  Delete,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger';

import { IClassNewable } from '@kb-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function KbDelete<DbGenericType>(
  type: IClassNewable<DbGenericType>,
  path?: string | string[]
) {
  return applyDecorators(
    Delete(path),
    ApiOperation({
      summary: `Delete an existing ${ type.name }`
    }),
    ApiOkResponse({ type: type, description: `${ type.name } deleted` }),
    ApiNotFoundResponse({
      description: `${ type.name } not found`
    }),
    ApiBadRequestResponse({ description: 'Invalid identifier supplied' }),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
