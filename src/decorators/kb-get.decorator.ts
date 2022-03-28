import {
  applyDecorators,
  ClassSerializerInterceptor,
  Get,
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
export function KbGet<DbGenericType>(
  type: IClassNewable<DbGenericType>,
  path?: string | string[]
) {
  return applyDecorators(
    Get(path),
    ApiOperation({ summary: `Get an existing ${ type.name }` }),
    ApiOkResponse({ description: `Return a single ${ type.name }`, type }),
    ApiNotFoundResponse({ description: `${ type.name } not found` }),
    ApiBadRequestResponse({ description: 'Invalid identifier supplied' }),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
