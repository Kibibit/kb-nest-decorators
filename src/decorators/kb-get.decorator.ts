import { noop } from 'lodash';

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

import { IClassNewable } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function KbGet<DbGenericType>(
  type: IClassNewable<DbGenericType>,
  path?: string | string[],
  options: {
    successDescription?: string;
    summary?: string;
    neverFails?: boolean;
  } = {}
) {
  return applyDecorators(
    Get(path),
    ApiOperation({ summary: options.summary || `Get an existing ${ type.name }` }),
    ApiOkResponse({ description: options.successDescription || `Return a single ${ type.name }`, type }),
    options.neverFails ? noop : ApiNotFoundResponse({ description: `${ type.name } not found` }),
    options.neverFails ? noop : ApiBadRequestResponse({ description: 'Invalid identifier supplied' }),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
