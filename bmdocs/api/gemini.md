---
description: Google Gemini API配置教程，需要科学上网使用，支持Gemini系列模型调用
---

# API 基本信息

::: tip 提示
需要科学上网,且节点为美国,获得key之后,可以用中转api直连
:::

|配置项|说明|
|--|--|
|API 名称|Google API|
|API 基础 URL|`https://generativelanguage.googleapis.com/v1beta/openai/` <br>(这么填并不规范,但是按规范的填会报错😅)|
|中转API 基础 URL|`https://gemini.114514.fan/v1` <br>(由云术工作室搭建❤)|
|官方文档|[Google AI平台](https://aistudio.google.com/)|
|API 路径|`chat/completions`|
|API 密钥|请登录平台自行查看|
|模型名称|有许多模型,推荐免费高速的 `gemini-2.0-flash` ,其他的自行查看|
|其他|速度快,但ai味略重|

## 快速开始

### 获取API密钥

1. 登录 [Google 平台](https://aistudio.google.com/)
2. 进入「[API keys](https://aistudio.google.com/apikey)」管理页面
3. 创建或复制您的API密钥
