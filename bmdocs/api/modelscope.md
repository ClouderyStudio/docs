# API 基本信息

::: tip 提示
本平台有免费额度 详情看下面
:::

|配置项|说明|
|--|--|
|API 名称|魔搭 ModelScope API|
|API 基础 URL|`https://api-inference.modelscope.cn/v1`|
|官方文档|[ModelScope API 推理介绍](https://www.modelscope.cn/docs/model-service/API-Inference/intro)|
|API 路径|`chat/completions`|
|API 密钥|请登录平台获取您的 Access Token|
|模型名称|使用魔搭上开源模型的 Model Id，如 `Qwen/Qwen3.5-35B-A3B`|
|其他|兼容 OpenAI 协议，注册用户免费使用|

## 快速开始

### 获取 API 密钥

1. 注册并登录 [ModelScope](https://www.modelscope.cn)（需绑定阿里云账号并完成实名认证）
2. 进入「[Access Token](https://modelscope.cn/my/myaccesstoken)」管理页面
3. 创建或复制您的 Access Token

### 调用示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="MODELSCOPE_ACCESS_TOKEN",  # 请替换成您的 Access Token
    base_url="https://api-inference.modelscope.cn/v1/"
)

response = client.chat.completions.create(
    model="Qwen/Qwen3.5-35B-A3B",  # ModelScope Model-Id
    messages=[
        {
            'role': 'system',
            'content': 'You are a helpful assistant.'
        },
        {
            'role': 'user',
            'content': '用python写一下快排'
        }
    ],
    stream=True
)

for chunk in response:
    print(chunk.choices[0].delta.content, end='', flush=True)
```

### curl 调用

```bash
curl https://api-inference.modelscope.cn/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "model": "Qwen/Qwen3.5-35B-A3B",
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'
```

## Anthropic API 兼容调用

魔搭也支持 Anthropic API 兼容的调用方式（Beta 测试阶段）：

```bash
# 先安装 anthropic SDK
pip install anthropic
```

```python
import anthropic

client = anthropic.Anthropic(
    api_key="MODELSCOPE_ACCESS_TOKEN",  # 请替换成您的 Access Token
    base_url="https://api-inference.modelscope.cn"
)

message = client.messages.create(
    model="Qwen/Qwen3.5-35B-A3B",  # ModelScope Model-Id
    messages=[
        {"role": "user", "content": "write a python quicksort"}
    ],
    max_tokens=1024
)
print(message.content[0].text)
```

## 注意事项

- API-Inference 面向 ModelScope 注册用户**免费提供**
- 账号注册后需绑定阿里云账号，并通过实名认证后才可使用
- 模型名称使用魔搭上的 Model Id，不同模型可能在不同时间上线或下线
- 具体使用额度请关注官方使用限制说明
- 如需高并发、大额度的使用，可考虑通过 API-Provider 能力绑定外部 API 提供方
