import { Config, OpenAPIRequest, GroupAPI } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';
import { TMessage, TMessageResult, TMedia, TFileResult } from '@src/types/openapi/v1/group-and-c2c';

export default class Group implements GroupAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  public postMessage(group_openid: string, message: TMessage): Promise<RestyResponse<TMessageResult>> {
    const options = {
      method: 'POST' as const,
      url: getURL('groupPostMessageURI'),
      rest: {
        group_openid,
      },
      data: message,
    };
    return this.request(options);
  }

  public delMessage(group_openid: string, message_id: string): Promise<RestyResponse<unknown>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('groupDelMessageURI'),
      rest: {
        group_openid,
        message_id,
      },
    };
    return this.request(options);
  }

  public files(group_openid: string, file: TMedia): Promise<RestyResponse<TFileResult>> {
    const options = {
      method: 'POST' as const,
      url: getURL('groupFilesURI'),
      rest: {
        group_openid,
      },
      data: file,
    };
    return this.request(options);
  }
}
