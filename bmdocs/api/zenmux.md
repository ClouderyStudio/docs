---
description: ZenMux企业级大模型聚合平台API配置，支持OpenAI/Anthropic/Gemini协议，具备AI保险赔付机制
---

# API 基本信息

|配置项|说明|
|--|--|
|API 名称|ZenMux API|
|API 基础 URL (OpenAI)|`https://zenmux.ai/api/v1`|
|API 基础 URL (Anthropic)|`https://zenmux.ai/api/anthropic`|
|API 基础 URL (Google Gemini)|`https://zenmux.ai/api/vertex-ai`|
|官方文档|[ZenMux 平台](https://zenmux.ai)|
|模型列表|[模型广场](https://zenmux.ai/models)|
|API 路径|`chat/completions` / `v1/messages`|
|API 密钥|请登录平台自行查看|
|模型名称|格式为 `provider/model-name`，如 `google/gemini-3.1-pro-preview`|
|其他|兼容 OpenAI / Anthropic / Google Gemini 协议；全球边缘加速；AI 模型保险服务|

## 产品介绍

ZenMux 是全球首个具备保险赔付机制的企业级大模型聚合平台。平台提供一站式接入各大厂商最新模型的服务，当使用过程中出现输出质量不佳、延迟过高等问题时，智能保险检测与赔付机制会自动进行补偿，解决企业对 AI 幻觉和质量不稳定的担忧。

核心优势：

- **原生双协议支持** — 完全兼容 OpenAI 和 Anthropic 协议标准，无缝对接 Claude Code 等主流工具
- **智能路由 + 保险** — 自动选择最优模型，并提供保险赔付保障
- **企业级服务** — 高容量储备、自动故障转移、全球边缘加速

::: tip 💡 充值赠送
当前充值可获赠 20% 额外 Credits，支持 Stripe 信用卡和支付宝充值。
:::

### 产品名称含义

ZenMux 是 Zen 和 Mux（Multiplexer）的组合词：

- **Zen（禅）** — 体现产品核心理念：将复杂的多模型选择、风险管理、API 调用等通过智能自动化简化为"一个 API、一个 SDK、一个平台"的极简体验，并提供保险托底，消除使用 AI 时的后顾之忧
- **Mux（多路复用器）** — 代表产品核心能力：聚合多家 AI 模型厂商（OpenAI、Anthropic、Google、DeepSeek 等），通过智能路由从众多模型中选出最适合当前任务的那一个

## 主要功能

### 大模型聚合平台

ZenMux 聚合了主流闭源与开源大语言模型，为开发者提供统一的调用平台。

::: tip 一站式集成体验
只需创建一个 API Key，使用统一的 API 标准即可调用不同厂商的模型，无需在多个平台注册、管理多个密钥、充值多个钱包。
:::

主要优势：

- **统一身份管理** — 一个 API Key 控制所有厂商的访问权限
- **统一账单** — 透明的用量和费用追踪，集中管理账户
- **丰富的模型选择** — 接入 OpenAI、Anthropic、Google、DeepSeek 等主流厂商的最新模型

### 双协议支持

ZenMux 提供业界首创的双协议支持，让开发者能以最熟悉的方式集成 AI 模型。

::: tip 灵活的协议选择
- OpenAI 兼容协议 — 通过 OpenAI 标准 API 调用平台上所有模型
- Anthropic 兼容协议 — 通过 Anthropic 标准 API 调用平台上所有模型，无缝对接 Claude Code 等工具
:::

这意味着您可以根据项目和团队偏好选择最合适的 API 协议，无需担心不同模型厂商之间的协议差异。

### 高容量与高可用

我们为每个 LLM 维持充足的容量储备，确保您的业务不受厂商容量限制影响。

::: tip 企业级服务保障
- 高容量储备 — 几乎所有模型都拥有 Tier 5 容量配额
- 多厂商支持 — 关键模型由多家厂商提供支持
- 自动故障转移 — 当某家厂商容量不足时，系统自动切换到其他厂商，避免服务中断
:::

### AI 模型保险服务

ZenMux 是全球首个提供 AI 模型保险服务的平台，为模型输出质量提供保障。

::: tip 创新保险机制
我们对 LLM 使用过程中出现的表现不佳、幻觉、延迟过高等场景进行承保，通过每日自动化检测与赔付，为您的 AI 应用提供质量托底。
:::

保险特点：

- **全面覆盖** — 涵盖表现不佳、幻觉输出、响应延迟高等场景
- **自动检测赔付** — 每日对平台调用数据进行保险检测，次日完成赔付
- **数据飞轮价值** — 保险算法识别出的数据本身就是高质量的 Bad Case，可直接用于改进 AI 产品
- **持续改进** — 从保险赔付数据中构建产品数据飞轮，持续提升 AI 表现

### 智能模型路由

如果您希望在模型质量和调用成本之间取得最佳平衡，ZenMux 的智能路由是最佳选择。

::: tip 自动最优选择
系统会分析请求内容和任务特征，自动选择最合适的模型，在保证效果的同时最小化成本。
:::

智能路由优势：

- **质量与成本平衡** — 在高性能模型和经济型模型之间自动优化
- **任务感知选择** — 深度分析请求，匹配最合适的模型能力
- **持续学习** — 路由策略基于历史数据不断优化
- **透明可控** — 详细的路由决策日志，支持自定义路由规则

### 开发者友好的可观测性

ZenMux 为开发者打造，提供全面的可观测性和调试能力。

::: tip 全方位数据洞察
从多维度深入了解模型使用情况，帮助您快速定位问题、优化成本、改善效果。
:::

核心功能：

- **详细日志分析** — 每次 API 调用的请求和响应详情完整记录
- **聚合成本分析** — 按项目、模型、时间等维度分析成本分布
- **用量分析** — 实时监控 Token 消耗和调用频率
- **性能分析** — 追踪响应时间、并发量等关键性能指标
- **模型质量对比** — 对比不同模型的输出质量
- **可视化仪表盘** — 直观的图表和报表，快速掌握全局

### 全球边缘节点

借助 Cloudflare 的强大基础设施，ZenMux 在全球范围内部署分布式边缘计算节点。

::: tip 全球加速网络
无论您的用户身在何处，都能从最近的边缘节点调用模型，享受低延迟、高性能的服务。
:::

技术优势：

- **全球覆盖** — 边缘节点遍布各大洲
- **智能路由** — 自动将请求路由到最近的节点
- **低延迟保障** — 大幅降低网络传输延迟，提升响应速度
- **高可用架构** — 多节点冗余，保障服务稳定性

## 计费方案

ZenMux 提供两种计费方案：

### 按量付费（Pay As You Go）

**适用场景**：生产环境、商业产品、高并发应用

按量付费采用 **预充值 + 按量计费** 模式，专为生产负载设计：

- **无速率限制** — 支持高并发调用
- **按 Token 计费** — 透明可预测的成本

前往 [按量付费管理页面](https://zenmux.ai/platform/pay-as-you-go) 充值并创建 API Key。

### 订阅计划（Builder Plan）

**适用场景**：个人开发、学习探索、Vibe Coding、快速原型

订阅计划提供固定月费，可预测的 AI 模型访问：

- **固定月费** — 起价 $20/月
- **全明星模型阵容** — 一个订阅解锁 100+ 全球顶级模型
- **全场景覆盖** — 编程 + 图片生成 + 视频生成 + 对话，一应俱全

前往 [定价页面](https://zenmux.ai/pricing/subscription) 查看方案详情并订阅。

### 方案对比

|维度|按量付费|订阅计划|
|--|--|--|
|适用场景|生产环境、商业产品|个人开发、学习探索|
|计费方式|按量计费，按 Token 计费|固定月费|
|速率限制|无限制|10–15 RPM|
|并发|无限制|每周限额|
|限制|无|禁止用于生产环境|

::: warning 注意
如果您的项目已上线或即将商业化，**必须使用按量付费方案**。订阅计划仅限个人开发和学习使用，禁止用于生产环境。
:::

## 支持的 API 协议

ZenMux 支持四种主流 API 协议，您可以使用偏好的 SDK 调用平台上任意模型：

|协议|Base URL|兼容 SDK|说明|
|--|--|--|--|
|**OpenAI Chat Completions**|`https://zenmux.ai/api/v1`|OpenAI SDK|最通用的 Chat API|
|**OpenAI Responses**|`https://zenmux.ai/api/v1`|OpenAI SDK|OpenAI 下一代 Responses API|
|**Anthropic Messages**|`https://zenmux.ai/api/anthropic`|Anthropic SDK|Claude 系列原生协议|
|**Google Gemini**|`https://zenmux.ai/api/vertex-ai`|Google GenAI SDK|Gemini 系列原生协议|

::: tip 跨协议调用
ZenMux 的核心优势之一是**协议无关性**——您可以通过任意支持的协议调用任意模型。例如，使用 OpenAI SDK 调用 Claude 模型，或使用 Anthropic SDK 调用 Gemini 模型。
:::

### 获取模型名称

每个模型在 ZenMux 平台上都有唯一的名称（slug）。您可以在 [模型页面](https://zenmux.ai/models) 或 [模型详情页](https://zenmux.ai/google/gemini-3.1-pro-preview) 查看。

## 快速开始

### 获取 API 密钥

1. 访问 [ZenMux 登录页面](https://zenmux.ai/login)，使用邮箱、GitHub 或 Google 账号登录
2. 根据使用场景选择 [按量付费](https://zenmux.ai/platform/pay-as-you-go) 或 [订阅计划](https://zenmux.ai/pricing/subscription)
3. 在对应管理页面创建 API Key

### 调用示例

#### OpenAI Chat Completions 协议

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://zenmux.ai/api/v1",
    api_key="<your ZENMUX_API_KEY>",
)

completion = client.chat.completions.create(
    model="google/gemini-3.1-pro-preview",
    messages=[
        {"role": "user", "content": "你好"}
    ]
)

print(completion.choices[0].message.content)
```

```bash
curl https://zenmux.ai/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ZENMUX_API_KEY" \
  -d '{
    "model": "google/gemini-3.1-pro-preview",
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'
```

#### Anthropic Messages 协议

```python
from anthropic import Anthropic

client = Anthropic(
    base_url="https://zenmux.ai/api/anthropic",
    api_key="<your ZENMUX_API_KEY>",
)

message = client.messages.create(
    model="google/gemini-3.1-pro-preview",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "你好"}
    ]
)

print(message.content[0].text)
```

```bash
curl https://zenmux.ai/api/anthropic/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ZENMUX_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "google/gemini-3.1-pro-preview",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'
```

#### Google Gemini 协议

```python
from google import genai
from google.genai import types

client = genai.Client(
    api_key="<your ZENMUX_API_KEY>",
    vertexai=True,
    http_options=types.HttpOptions(
        api_version='v1',
        base_url='https://zenmux.ai/api/vertex-ai'
    )
)

response = client.models.generate_content(
    model="google/gemini-3.1-pro-preview",
    contents="你好"
)

print(response.text)
```

## Platform API

ZenMux 提供了一套平台管理 API，您可以通过编程方式查询账户用量、余额、订阅状态等信息。

::: warning 注意
Platform API 需要使用 **Management API Key** 进行认证。前往 [ZenMux 控制台 > 管理](https://zenmux.ai/platform/management) 创建 Management API Key。
:::

### 查询调用详情

```
GET https://zenmux.ai/api/v1/management/generation?id=<generation_id>
```

```bash
curl https://zenmux.ai/api/v1/management/generation?id=gen_01abc123def456 \
  -H "Authorization: Bearer $ZENMUX_API_KEY"
```

### 查询余额

```
GET https://zenmux.ai/api/v1/management/payg/balance
```

```bash
curl https://zenmux.ai/api/v1/management/payg/balance \
  -H "Authorization: Bearer $ZENMUX_MANAGEMENT_API_KEY"
```

### 查询订阅详情

```
GET https://zenmux.ai/api/v1/management/subscription/detail
```

```bash
curl https://zenmux.ai/api/v1/management/subscription/detail \
  -H "Authorization: Bearer $ZENMUX_MANAGEMENT_API_KEY"
```

### 查询 Flow Rate

```
GET https://zenmux.ai/api/v1/management/flow_rate
```

```bash
curl https://zenmux.ai/api/v1/management/flow_rate \
  -H "Authorization: Bearer $ZENMUX_MANAGEMENT_API_KEY"
```

## 邀请奖励

分享 ZenMux，获得 $5。分享您的邀请链接，您的朋友首次充值可获得 5% 奖励，您的 $5 奖励将在对方充值 24 小时后发放。

邀请链接：<https://zenmux.ai/invite/GPTF4K>

## 联系我们

- 官方网站：<https://zenmux.ai>
- 技术支持邮箱：[support@zenmux.ai](mailto:support@zenmux.ai)
- 商务合作邮箱：[bd@zenmux.ai](mailto:bd@zenmux.ai)
- Twitter：[@ZenMuxAI](https://twitter.com/ZenMuxAI)
- Discord 社区：<http://discord.gg/vHZZzj84Bm>

