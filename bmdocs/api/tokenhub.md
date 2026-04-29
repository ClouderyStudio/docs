---
description: TokenHub API配置教程，提供免费额度，支持多种AI模型的一站式调用
---

# API 基本信息

::: tip 提示
本平台有免费额度 详情看下面
:::

|配置项|说明|
|--|--|
|API 名称|腾讯云大模型服务平台 TokenHub API|
|API 基础 URL|`https://tokenhub.tencentmaas.com/v1`|
|备用 API 基础 URL|`https://tokenhub.tencentmaas.cn/v1` (境内备用)|
|官方文档|[腾讯云 TokenHub 平台](https://cloud.tencent.com/document/product/1823)|
|模型广场|[模型广场](https://console.cloud.tencent.com/tokenhub/models)|
|API 路径|`chat/completions`|
|API 密钥|请登录控制台自行查看|
|模型名称|如 `deepseek-v4-flash`、`deepseek-v4-pro`、`hy3-preview` 等，详见下方模型列表|
|其他|兼容 OpenAI 协议，可直接用 OpenAI SDK 接入|

## 模型列表

平台提供多种模型，以下是部分模型及其 `model` 参数值：

|模型名称|model 参数值|说明|
|--|--|--|
|DeepSeek-V4-Flash|`deepseek-v4-flash`|高速推理|
|DeepSeek-V4-Pro|`deepseek-v4-pro`|深度推理|
|Hy3 preview|`hy3-preview`|腾讯混元最新模型|
|HY 2.0 Think|`hunyuan-2.0-thinking-20251109`|深度推理|
|Deepseek-v3.2|`deepseek-v3.2`|DeepSeek 最新版|
|Deepseek-v3.1|`deepseek-v3.1-terminus`|DeepSeek 稳定版|
|Deepseek-v3-0324|`deepseek-v3-0324`|DeepSeek 经典版|
|Deepseek-r1-0528|`deepseek-r1-0528`|DeepSeek 推理模型|
|GLM-5.1|`glm-5.1`|智谱 GLM|
|Kimi-K2.6|`kimi-k2.6`|月之暗面 Kimi|
|MiniMax-M2.7|`minimax-m2.7`|MiniMax 模型|

> 更多模型请前往 [模型广场](https://console.cloud.tencent.com/tokenhub/models) 查看

## 免费额度

新用户可领取免费体验包，每个主账号限领取并使用一次，以下为语言模型的免费额度：

|模型|免费额度|有效期|
|--|--|--|
|**DeepSeek-V4-Flash**|**100 万 Tokens**|**90 天**|
|**DeepSeek-V4-Pro**|**100 万 Tokens**|**90 天**|
|Hy3 preview|100 万 Tokens|90 天|
|HY 2.0 Think|50 万 Tokens|90 天|
|HY 2.0 Instruct|50 万 Tokens|90 天|
|Hunyuan-role|100 万 Tokens|90 天|
|Deepseek-v3.2|50 万 Tokens|90 天|
|Deepseek-v3.1|50 万 Tokens|90 天|
|Deepseek-v3-0324|50 万 Tokens|90 天|
|GLM-5.1|50 万 Tokens|90 天|
|GLM-5|100 万 Tokens|90 天|
|Kimi-K2.6|50 万 Tokens|90 天|
|Kimi-K2.5|50 万 Tokens|90 天|
|MiniMax-M2.7|100 万 Tokens|90 天|
|MiniMax-M2.5|100 万 Tokens|90 天|

### 领取方式

1. 登录 [腾讯云 TokenHub 控制台](https://console.cloud.tencent.com/tokenhub/models)
2. 在 [模型广场](https://console.cloud.tencent.com/tokenhub/models) 页面，单击右上角「新用户福利免费体验」
3. 在弹窗中勾选模型后，单击立即领取

> 也可直接调用模型，平台会自动为你领取免费额度

### 注意事项

- 免费额度从领取时起算，**90 天内有效**，过期未使用的额度将自动失效
- 调用模型时，系统优先消耗免费额度
- 免费额度用尽后，服务将自动停止，需开启后付费按量计费

## 快速开始

### 获取 API 密钥

1. 登录 [腾讯云 TokenHub 控制台](https://console.cloud.tencent.com/tokenhub/models)
2. 进入「API 密钥管理」页面
3. 创建或复制您的 API 密钥

### 调用示例

```bash
curl https://tokenhub.tencentmaas.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'
```

