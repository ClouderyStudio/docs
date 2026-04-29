---
description: 硅基流动SiliconFlow API配置教程，提供高速推理、高性价比的大模型API服务，有免费额度
---

# API 基本信息

::: tip 提示
本平台有免费额度 详情看下面
:::

|配置项|说明|
|--|--|
|API 名称|siliconflow(硅基流动) API|
|API 基础 URL|`https://api.siliconflow.cn/v1`|
|官方文档|[siliconflow 平台](https://cloud.siliconflow.cn/)|
|模型广场|[模型广场](https://cloud.siliconflow.cn/models)|
|API 路径|`chat/completions`|
|API 密钥|请登录平台自行查看|
|模型名称|模型名字为模型广场中的完整名字,如 `deepseek-ai/DeepSeek-R1`，请参考官方文档选择合适模型|
|其他|高速推理、高性价比、兼容 OpenAI 协议|

## 产品介绍

作为集合顶尖大模型的一站式云服务平台，SiliconFlow 致力于为开发者提供更快、更全面、体验更丝滑的模型 API，助力开发者和企业聚焦产品创新，无须担心产品大规模推广所带来的高昂算力成本。

### 产品功能

- 提供开箱即用的大模型 API，按量收费
- 已上架包括 Qwen2.5-72B、DeepSeek-V2.5、SD3 Medium、GLM-4-9B-Chat 等多种开源大语言模型、图片生成模型、代码生成模型、向量与重排序模型以及多模态大模型
- 25 年 1 月上线基于华为云昇腾云服务的 DeepSeek-V3、DeepSeek-R1 推理服务
- 提供模型微调与部署的托管服务

### 产品特性

- **高速推理** — 自研高效算子和优化框架，推理加速引擎全球领先
- **高扩展性** — 动态扩容支持弹性业务，一键部署自定义模型
- **高性价比** — 端到端极致优化，推理和部署成本显著降低，支持国产异构 GPU
- **高稳定性** — 经过开发者验证，完善的监控和容错机制
- **高智能** — 提供多种先进模型服务，包括大语言模型、音视频等多模态
- **高安全性** — 支持 BYOC 部署，数据隐私与业务安全保障

## 免费模型

硅基流动提供以下免费模型（更细节的请自行在 [模型广场](https://cloud.siliconflow.cn/models) 查看）：

|模型|类型|
|--|--|
|`Qwen/Qwen3.5-4B`|语言模型|
|`Qwen/Qwen3-8B`|语言模型|
|`Qwen/Qwen2.5-7B-Instruct`|语言模型|
|`THUDM/GLM-4.1V-9B-Thinking`|语言模型|
|`THUDM/GLM-Z1-9B-0414`|语言模型|
|`THUDM/GLM-4-9B-0414`|语言模型|
|`deepseek-ai/DeepSeek-R1-0528-Qwen3-8B`|语言模型|
|`deepseek-ai/DeepSeek-OCR`（限免）|OCR|
|`tencent/Hunyuan-MT-7B`|翻译|
|`TeleAI/TeleSpeechASR`|语音识别|
|`FunAudioLLM/SenseVoiceSmall`|语音识别|
|`PaddlePaddle/PaddleOCR-VL-1.5`|OCR|
|`BAAI/bge-m3`|向量/重排序|
|`BAAI/bge-reranker-v2-m3`|向量/重排序|
|`BAAI/bge-large-zh-v1.5`|向量|
|`BAAI/bge-large-en-v1.5`|向量|
|`netease-youdao/bce-embedding-base_v1`|向量|
|`netease-youdao/bce-reranker-base_v1`|向量/重排序|
|`Kwai-Kolors/Kolors`|文生图|
|`Pro/deepseek-ai/DeepSeek-R1`|语言模型（Pro）|
|`Pro/BAAI/bge-m3`|向量（Pro）|
|`Pro/BAAI/bge-reranker-v2-m3`|重排序（Pro）|

## 快速开始

### 获取 API 密钥

1. 登录 [siliconflow 平台](https://cloud.siliconflow.cn/)（支持短信登录、邮箱登录、GitHub/Google OAuth）
2. 进入「[API密钥](https://cloud.siliconflow.cn/account/ak)」管理页面
3. 点击「新建API密钥」，创建您的 API Key

### 调用示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.siliconflow.cn/v1"
)

response = client.chat.completions.create(
    model="Qwen/Qwen2.5-72B-Instruct",
    messages=[
        {'role': 'user', 'content': '你好'}
    ],
    stream=True
)

for chunk in response:
    if not chunk.choices:
        continue
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
    if chunk.choices[0].delta.reasoning_content:
        print(chunk.choices[0].delta.reasoning_content, end="", flush=True)
```

```bash
curl https://api.siliconflow.cn/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "Qwen/Qwen2.5-72B-Instruct",
    "messages": [
      {"role": "user", "content": "你好"}
    ],
    "stream": true
  }'
```

> 推理模型（如 DeepSeek-R1）的调用需使用 `Pro/deepseek-ai/DeepSeek-R1` 作为模型名

### 免费额度

在用手机号注册时使用邀请链接或邀请码可获得 16 元平台额度：
- [邀请链接](https://cloud.siliconflow.cn/i/Bsl2A8Mv)
- 邀请码 `Bsl2A8Mv`

