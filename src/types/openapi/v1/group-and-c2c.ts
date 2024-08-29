export interface TMessage {
  /** 文本内容 */
  content?: string;
  /** 消息类型
   ** `0` 文本
   ** `2` markdown
   ** `3` ark
   ** `4` embed
   ** `7` media 富媒体
   */
  msg_type: 0 | 2 | 3 | 4 | 7;
  markdown?: TMarkdown;
  keyboard?: TKeyboard;
  ark?: TArk;
  media?: TMedia;
  /**
   * 消息引用
   * @future 暂未支持
   */
  message_referance?: unknown;
  /**
   * 前置收到的事件 ID，用于发送被动消息
   * 支持事件：`INTERACTION_CREATE`、`C2C_MSG_RECEIVE`、`FRIEND_ADD`、`GROUP_ADD_ROBOT`、`GROUP_MSG_RECEIVE`
   */
  event_id?: string;
  /** 前置收到的用户发送过来的消息 ID，用于发送被动消息（回复） */
  msg_id?: string;
  /**
   * 回复消息的序号，与 msg_id 联合使用，避免相同消息id回复重复发送，不填默认是 1。
   * 相同的 msg_id + msg_seq 重复发送会失败。
   */
  msg_seq?: number;
}

export interface TMessageResult {
  /** 消息唯一 ID */
  id: string;
  /** 发送时间 */
  timestamp: number;
}

export interface TMarkdown {
  /** 原生 markdown 文本内容 */
  content?: string;
  /** markdown 模版id，申请模版后获得 */
  custom_template_id?: string;
  /** 模版内变量与填充值的kv映射 */
  params?: { key: unknown; values: unknown }[];
}

export interface TKeyboard {
  /** 按钮ID：在一个keyboard消息内设置唯一 */
  id?: string;
  render_data: {
    /** 按钮上的文字 */
    label: string;
    /** 点击后按钮的上文字 */
    visited_label: string;
    /** 按钮样式
     ** `0` 灰色线框
     ** `1` 蓝色线框
     */
    style: 0 | 1;
  };
  action: {
    /**
     ** `0` (跳转按钮)http 或 小程序 客户端识别 scheme
     ** `1` (回调按钮)回调后台接口, data 传给后台
     ** `2` (指令按钮)自动在输入框插入`@bot data`
     */
    type: 0 | 1 | 2;
    permission: {
      /**
       ** `0` 指定用户可操作
       ** `1` 仅管理者可操作
       ** `2` 所有人可操作
       ** `3` 指定身份组可操作（仅频道可用）
       */
      type: 0 | 1 | 2 | 3;
      /** 有权限的用户 id 的列表 */
      specify_user_ids?: string[];
      /** 有权限的身份组 id 的列表（仅频道可用） */
      specify_role_ids?: string[];
    };
    /** 操作相关的数据 */
    data: string;
    /** 指令按钮可用，指令是否带引用回复本消息，默认 false。支持版本 8983 */
    reply?: boolean;
    /** 指令按钮可用，点击按钮后直接自动发送 data，默认 false。支持版本 8983 */
    enter?: boolean;
    /** 本字段仅在指令按钮下有效，设置后后会忽略 action.enter 配置。
     * 设置为 1 时 ，点击按钮自动唤起启手Q选图器，其他值暂无效果。
     *（仅支持手机端版本 8983+ 的单聊场景，桌面端不支持）
     */
    anchor?: number;
    /**
     * @deprecated 已弃用
     * 可操作点击的次数，默认不限
     */
    click_limit?: number;
    /**
     * @deprecated 已弃用
     * 指令按钮可用，弹出子频道选择器，默认 false
     */
    at_bot_show_channel_list?: boolean;
    /** 客户端不支持本action的时候，弹出的toast文案 */
    unsupport_tips: string;
  };
}

interface SimpleKV {
  key: string;
  value: string;
}
interface ComplexKV {
  key: string;
  obj: {
    obj_kv: {
      key: string;
      value: string;
    }[];
  }[];
}

export interface TArk {
  /**
   * 模版 id，管理端可获得或内邀申请获得
   *
   * 以下默认可使用:
   ** `23` [链接+文本列表模板](https://bot.q.qq.com/wiki/develop/api-v2/server-inter/message/type/template/template_23.html)
   ** `24` [文本+缩略图模板](https://bot.q.qq.com/wiki/develop/api-v2/server-inter/message/type/template/template_24.html)
   ** `37` [大图模板](https://bot.q.qq.com/wiki/develop/api-v2/server-inter/message/type/template/template_37.html)
   */
  template_id: number;
  /** 模版内变量与填充值的kv映射 */
  kv: (SimpleKV | ComplexKV)[];
}

export interface TMedia {
  /**
   * 媒体类型
   ** `1` 图片
   ** `2` 视频
   ** `3` 语音
   ** `4` 文件（暂不开放）
   
   * *资源格式要求*:
   ** 图片：`png/jpg`
   ** 视频：`mp4`
   ** 语音：`silk`
   */
  file_type?: 1 | 2 | 3 | 4;
  /** 需要发送媒体资源的url */
  url?: string;
  /** 设置 true 会直接发送消息到目标端，且会占用主动消息频次 */
  srv_send_msg?: boolean;
  /**
   * @future 【暂未支持】
   */
  file_data?: unknown;
  /** 来自富媒体消息上传 */
  file_info?: string;
}

export interface TFileResult {
  /** 文件 ID */
  file_uuid: string;
  /** 文件信息，用于发消息接口的 media 字段使用 */
  file_info: string;
  /** 有效期，表示剩余多少秒到期，到期后 file_info 失效，当等于 0 时，表示可长期使用 */
  ttl: number;
  /** 发送消息的唯一ID，当srv_send_msg设置为true时返回 */
  id: string;
}
