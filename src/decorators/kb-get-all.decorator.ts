import {
  applyDecorators,
  ClassSerializerInterceptor,
  Get,
  UseInterceptors
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { IClassNewable } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function KbGetAll<DbGenericType>(
  model: IClassNewable<DbGenericType>,
  path?: string | string[]
) {
  return applyDecorators(
    Get(path),
    ApiOperation({ summary: `Get all ${ model.name }s` }),
    ApiOkResponse({ description: `Return a list of all ${ model.name }s` }),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
