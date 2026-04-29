---
description: 阿里云百炼API配置教程，提供新人免费额度，集成千问及主流第三方大模型
---

# API 基本信息

::: tip 提示
本平台有新人免费额度 详情看下面
:::

|配置项|说明|
|--|--|
|API 名称|阿里云百炼 API|
|API 基础 URL|`https://dashscope.aliyuncs.com/compatible-mode/v1`|
|官方文档|[阿里云百炼平台](https://bailian.console.aliyun.com/)|
|模型广场|[模型广场](https://bailian.console.aliyun.com/#/model-market)|
|API 路径|`chat/completions`|
|API 密钥|请登录平台自行查看|
|模型名称|如 `qwen3.6-plus`，请参考官方文档选择合适模型|
|其他|兼容 OpenAI 协议；新人免费额度|

## 产品介绍

阿里云百炼是一站式大模型开发与应用平台，集成了千问及主流第三方模型。它为开发者提供了兼容OpenAI的API及全链路模型服务；同时，也提供可视化应用构建能力，让业务人员能快速创建智能体、知识库问答等AI应用。

借助阿里云百炼，您可以：

- **API 调用** — 只需几行代码，即可与大模型进行对话，实现内容创作、摘要生成等
- **构建智能客服** — 可视化的应用构建，让您可以快速构建一个AI助手来应对客户咨询
- **编排流程** — 可视化的流程编排，让无代码基础的业务人员也能进行流程设计
- **微调模型** — 可视化的微调功能，即使不熟悉微调的工程代码，也能完成模型定制

### 模型服务

阿里云百炼平台提供开箱即用的模型服务，无需自行部署或运维，即可直接调用自研千问（Qwen）全系列模型，以及DeepSeek、Kimi、GLM等第三方大模型。

千问（Qwen）系列旗舰模型：

- **千问 Max** — Qwen系列效果最好的模型，适合处理复杂、多步骤任务
- **千问 Plus** — 在效果、速度和成本上表现均衡，是多数场景的推荐选择
- **千问 Flash** — 高性价比、低延迟，适合需要快速响应的简单任务

### 产品计费

开通阿里云百炼并不会产生费用，调用、微调、部署模型会产生相应费用。

## 新人免费额度

当您首次开通阿里云百炼时，平台会自动为您发放各模型的新人专属免费额度。

> 仅中国内地版模型享有免费额度，其他地域无免费额度。

### 规则说明

|项目|说明|
|--|--|
|有效期|新人免费额度有效期通常是 **30~90 天**，从开通阿里云百炼或模型申请通过之日起计算|
|适用范围|仅支持抵扣模型实时推理（调用）产生的费用。**不支持**抵扣Batch调用、上下文缓存、模型调优、模型部署、自定义模型产生的费用|
|共享规则|阿里云主账号与其RAM子账号共享免费额度|

> 自2025年9月8日11点起，首次开通阿里云百炼的用户，获赠的新人免费额度有效期调整为 **90 天**，在此之前已开通的用户不受影响。

### 获取免费额度

访问 [阿里云百炼-中国大陆版](https://bailian.console.aliyun.com/)，阅读并同意协议后，系统将自动开通阿里云百炼并发放免费推理额度。

> 如果未弹出服务协议，表示您已经开通过阿里云百炼且获得免费额度。

### 查看剩余额度

可通过以下两种方式查看模型的免费额度：

**方式一：通过模型用量查看**

在控制台的 [模型用量](https://bailian.console.aliyun.com/?tab=model_usage#/model-market/usage) 页面，点击「免费额度」页签，查看所有模型的免费额度余量及过期时间。

**方式二：通过模型广场查看**

在控制台的 [模型广场](https://bailian.console.aliyun.com/#/model-market) 页面，找到目标模型系列并单击进入详情页，在模型Code选择模型的版本，在「免费额度」区域进行查看。

> 控制台显示的免费额度分钟级更新（需手动刷新页面）。

### 免费额度用完即停

默认状态下，免费额度消耗完后继续使用会扣费。启用「免费额度用完即停」功能后，免费额度耗尽将无法继续调用（返回错误 code：`AllocationQuota.FreeTierOnly`），避免产生额外费用。

**如何开启：**

方式一：在 [模型用量](https://bailian.console.aliyun.com/?tab=model_usage#/model-market/usage) 页面 → 免费额度页签 → 找到目标模型 → 打开「免费额度用完即停」开关。

方式二：在模型广场 → 目标模型详情页 → 开启「免费额度用完即停」开关。

> 该功能默认为关闭状态。若已启用，需在控制台显示的免费额度用完后才可以关闭。

### 常见问题

**免费额度用完是否有通知？**

有通知。当免费额度余量剩余 20% 或已用尽时，系统会通过短信、站内信、邮件发送通知。

**免费额度用完会有什么影响？**

若没有开启「免费额度用完即停」功能，超出免费额度的Token将按模型列表中的输入/输出成本计费，产生的费用会以按量后付费的方式自动从阿里云账户中扣除。

> 如果账户欠费，其他模型即使仍有免费额度也无法进行调用。

**如何避免扣费？**

进入 [阿里云百炼 API-Key](https://bailian.console.aliyun.com/?apiKey=1#/api-key) 页面删除已创建的 API-Key，删除后将无法通过API调用百炼上的模型，因此也不会再产生模型调用费用。

## 快速开始

### 获取 API 密钥

1. 登录 [阿里云百炼控制台](https://bailian.console.aliyun.com/)
2. 进入「[API-Key](https://bailian.console.aliyun.com/?apiKey=1#/api-key)」管理页面
3. 创建您的 API Key

### 调用示例

阿里云百炼兼容 OpenAI 接口规范，您只需调整 API Key、base_url 和模型名称，即可将原有 OpenAI 代码迁移至阿里云百炼。

> 注意：不同地域的base_url不通用（下方示例使用北京地域的 base_url）
> - 华北2（北京）: `https://dashscope.aliyuncs.com/compatible-mode/v1`
> - 美国（弗吉尼亚）: `https://dashscope-us.aliyuncs.com/compatible-mode/v1`
> - 新加坡: `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)
completion = client.chat.completions.create(
    model="qwen3.6-plus",
    messages=[{'role': 'user', 'content': '你是谁？'}]
)
print(completion.choices[0].message.content)
```

```bash
curl https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_DASHSCOPE_API_KEY" \
  -d '{
    "model": "qwen3.6-plus",
    "messages": [
      {"role": "user", "content": "你是谁？"}
    ]
  }'
```

## 更新日志

- **2026-03-25 13:47:35** — 更新文档内容

