import { noop } from 'lodash';

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

import { IClassNewable } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function KbDelete<DbGenericType>(
  type: IClassNewable<DbGenericType>,
  path?: string | string[],
  options: {
    successDescription?: string;
    summary?: string;
    neverFails?: boolean;
  } = {}
) {
  return applyDecorators(
    Delete(path),
    ApiOperation({
      summary: options.summary || `Delete an existing ${ type.name }`
    }),
    ApiOkResponse({ type: type, description: options.successDescription || `${ type.name } deleted` }),
    options.neverFails ? noop : ApiNotFoundResponse({
      description: `${ type.name } not found`
    }),
    options.neverFails ? noop : ApiBadRequestResponse({ description: 'Invalid identifier supplied' }),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
