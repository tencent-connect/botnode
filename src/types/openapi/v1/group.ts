import { RestyResponse } from 'resty-client';
import { TFileResult, TMedia, TMessage, TMessageResult } from './group-and-c2c';

/**
 * =============  Group 接口  =============
 */
export interface GroupAPI {
  /** 发送消息 */
  postMessage: (group_openid: string, message: TMessage) => Promise<RestyResponse<TMessageResult>>;
  /** 撤回消息 */
  delMessage: (group_openid: string, message_id: string) => Promise<RestyResponse<unknown>>;
  /** 富媒体消息 */
  files: (group_openid: string, file: TMedia) => Promise<RestyResponse<TFileResult>>;
}
