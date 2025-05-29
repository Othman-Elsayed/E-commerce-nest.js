import { SetMetadata } from '@nestjs/common';

export const RESPONSE_META_KEY = 'response_meta';

export interface ResponseMetaOptions {
  message?: string;
  status?: string;
}

export const ResponseMeta = (options: ResponseMetaOptions) =>
  SetMetadata(RESPONSE_META_KEY, options);
