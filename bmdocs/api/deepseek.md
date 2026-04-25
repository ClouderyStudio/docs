# API 基本信息

|配置项|说明|
|--|--|
|API 名称|DeepSeek API|
|API 基础 URL (OpenAI)|`https://api.deepseek.com`|
|API 基础 URL (Anthropic)|`https://api.deepseek.com/anthropic`|
|官方文档|[DeepSeek 平台](https://platform.deepseek.com/)|
|API 路径|`chat/completions`|
|API 密钥|请登录平台自行查看|
|模型名称|`deepseek-v4-flash` — 高速推理模型<br/>`deepseek-v4-pro` — 深度推理模型|
|其他|兼容 OpenAI / Anthropic 协议；API 便宜|

## 模型说明

|模型名|说明|弃用状态|
|--|--|--|
|`deepseek-v4-flash`|DeepSeek-V4-Flash 高速推理模型，支持非思考与思考模式|活跃|
|`deepseek-v4-pro`|DeepSeek-V4-Pro 深度推理模型|活跃|
|`deepseek-chat`|对应 `deepseek-v4-flash` 的非思考模式|**将于 2026/07/24 弃用**|
|`deepseek-reasoner`|对应 `deepseek-v4-flash` 的思考模式|**将于 2026/07/24 弃用**|

> `deepseek-chat` 与 `deepseek-reasoner` 将于 **2026/07/24** 弃用，请尽快迁移至 `deepseek-v4-flash`。

## 首调用 API

DeepSeek API 使用与 OpenAI/Anthropic 兼容的 API 格式，通过修改配置，您可以使用 OpenAI/Anthropic SDK 来访问 DeepSeek API，或使用与 OpenAI/Anthropic API 兼容的软件。

|参数|值|
|--|--|
|`base_url` (OpenAI)|`https://api.deepseek.com`|
|`base_url` (Anthropic)|`https://api.deepseek.com/anthropic`|
|`api_key`|申请 API Key|
|`model`|`deepseek-v4-flash` / `deepseek-v4-pro`|

## 快速开始

### 获取 API 密钥

1. 登录 [DeepSeek 平台](https://platform.deepseek.com/)
2. 进入「API keys」管理页面
3. 创建或复制您的 API 密钥

### 调用示例

在创建 API Key 之后，可以使用以下样例脚本通过 OpenAI API 格式访问 DeepSeek 模型。

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
        "model": "deepseek-v4-pro",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "thinking": {"type": "enabled"},
        "reasoning_effort": "high",
        "stream": false
      }'
```

```python
from openai import OpenAI

client = OpenAI(
    api_key="<DEEPSEEK_API_KEY>",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ],
    thinking={"type": "enabled"},
    reasoning_effort="high",
    stream=False
)

print(response.choices[0].message.content)
```

## 模型能力

|功能|deepseek-v4-flash|deepseek-v4-pro|
|--|--|--|
|思考模式|支持非思考与思考模式（默认）|支持|
|上下文长度|1M|1M|
|输出长度|最大 384K|最大 384K|
|JSON Output|支持|支持|
|Tool Calls|支持|支持|
|对话前缀续写 (Beta)|支持|支持|
|FIM 补全 (Beta)|仅非思考模式支持|仅非思考模式支持|

## 价格

下表所列模型价格以"百万 tokens"为单位。

|模型|deepseek-v4-flash|deepseek-v4-pro|
|--|--|--|
|BASE URL (OpenAI)|`https://api.deepseek.com`|`https://api.deepseek.com`|
|BASE URL (Anthropic)|`https://api.deepseek.com/anthropic`|`https://api.deepseek.com/anthropic`|
|百万 tokens 输入（缓存命中）|**0.2 元**|**1 元**|
|百万 tokens 输入（缓存未命中）|**1 元**|**12 元**|
|百万 tokens 输出|**2 元**|**24 元**|

### 扣费规则

扣减费用 = token 消耗量 × 模型单价，对应的费用将直接从充值余额或赠送余额中进行扣减。当充值余额与赠送余额同时存在时，优先扣减赠送余额。
