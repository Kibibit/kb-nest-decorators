import { noop } from 'lodash';

import {
  applyDecorators,
  ClassSerializerInterceptor,
  Get,
  UseInterceptors
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { IClassNewable } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function KbGetAll<DbGenericType>(
  model: IClassNewable<DbGenericType>,
  path?: string | string[],
  options: {
    successDescription?: string;
    summary?: string;
    neverFails?: boolean;
  } = { neverFails: true }
) {
  return applyDecorators(
    Get(path),
    ApiOperation({ summary: options.summary || `Get all ${ model.name }s` }),
    ApiOkResponse({ description: options.successDescription || `Return a list of all ${ model.name }s` }),
    options.neverFails ? noop : ApiNotFoundResponse({
      description: `Failed to fetch all ${ model.name }`
    }),
    options.neverFails ? noop : ApiBadRequestResponse({ description: 'Invalid Request' }),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
