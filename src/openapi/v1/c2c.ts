import { Config, OpenAPIRequest, C2cAPI } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';
import { TMessage, TMessageResult, TMedia, TFileResult } from '@src/types/openapi/v1/group-and-c2c';

export default class C2c implements C2cAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  public postMessage(openid: string, message: TMessage): Promise<RestyResponse<TMessageResult>> {
    const options = {
      method: 'POST' as const,
      url: getURL('c2cPostMessageURI'),
      rest: {
        openid,
      },
      data: message,
    };
    return this.request(options);
  }

  public delMessage(openid: string, message_id: string): Promise<RestyResponse<unknown>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('c2cDelMessageURI'),
      rest: {
        openid,
        message_id,
      },
    };
    return this.request(options);
  }

  public files(openid: string, file: TMedia): Promise<RestyResponse<TFileResult>> {
    const options = {
      method: 'POST' as const,
      url: getURL('c2cFilesURI'),
      rest: {
        openid,
      },
      data: file,
    };
    return this.request(options);
  }
}
