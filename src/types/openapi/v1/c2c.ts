import { RestyResponse } from 'resty-client';
import { TFileResult, TMedia, TMessage, TMessageResult } from './group-and-c2c';

/**
 * =============  C2c 接口  =============
 */
export interface C2cAPI {
  /** 发送消息 */
  postMessage: (openid: string, message: TMessage) => Promise<RestyResponse<TMessageResult>>;
  /** 撤回消息 */
  delMessage: (openid: string, message_id: string) => Promise<RestyResponse<unknown>>;
  /** 富媒体消息 */
  files: (openid: string, file: TMedia) => Promise<RestyResponse<TFileResult>>;
}
