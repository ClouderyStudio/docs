---
description: API代理地址服务列表，支持聊天补全、图像生成、语音转文字等多平台API代理
---

# 🌐 支持的 API 服务列表

[开源地址](https://github.com/ClouderyStudio/api-proxy)  
以下是该代理服务支持的所有 API 平台及其对应关系：

## 🤖 AI 平台服务

| 代理路径 | 目标平台 | 原始端点 | 主要用途 |
|----------|----------|----------|----------|
| **`/openai`** | OpenAI | `https://api.openai.com` | GPT 系列模型、DALL·E、Whisper |
| **`/claude`** | Anthropic Claude | `https://api.anthropic.com` | Claude 系列大语言模型 |
| **`/gemini`** | Google Gemini | `https://generativelanguage.googleapis.com` | Gemini 多模态模型 |
| **`/groq`** | Groq | `https://api.groq.com/openai` | 高速推理 API |
| **`/cohere`** | Cohere | `https://api.cohere.ai` | 生成和嵌入模型 |
| **`/meta`** | Meta AI | `https://www.meta.ai/api` | Meta 的 AI 服务 |
| **`/xai`** | xAI | `https://api.x.ai` | xAI 的 Grok 模型 |
| **`/together`** | Together AI | `https://api.together.xyz` | 开源模型托管平台 |
| **`/novita`** | Novita AI | `https://api.novita.ai` | 图像生成和编辑 |
| **`/fireworks`** | Fireworks AI | `https://api.fireworks.ai` | 推理优化平台 |
| **`/openrouter`** | OpenRouter | `https://openrouter.ai/api` | 多模型统一接口 |

## 💬 消息平台服务

| 代理路径 | 目标平台 | 原始端点 | 主要用途 |
|----------|----------|----------|----------|
| **`/discord`** | Discord | `https://discord.com/api` | Discord 机器人 API |
| **`/telegram`** | Telegram | `https://api.telegram.org` | Telegram 机器人 API |

## 🛠️ 开发工具服务

| 代理路径 | 目标平台 | 原始端点 | 主要用途 |
|----------|----------|----------|----------|
| **`/huggingface`** | Hugging Face | `https://api-inference.huggingface.co` | 模型推理和托管 |
| **`/portkey`** | Portkey | `https://api.portkey.ai` | AI 网关和管理 |

## 📋 完整路径映射表

```javascript
const apiMapping = {
  // AI 平台
  '/openai': 'https://api.openai.com',           // OpenAI API
  '/claude': 'https://api.anthropic.com',        // Claude API
  '/gemini': 'https://generativelanguage.googleapis.com', // Gemini API
  '/groq': 'https://api.groq.com/openai',        // Groq API
  '/cohere': 'https://api.cohere.ai',            // Cohere API
  '/meta': 'https://www.meta.ai/api',            // Meta AI API
  '/xai': 'https://api.x.ai',                    // xAI API
  '/together': 'https://api.together.xyz',       // Together AI API
  '/novita': 'https://api.novita.ai',            // Novita AI API
  '/fireworks': 'https://api.fireworks.ai',      // Fireworks AI API
  '/openrouter': 'https://openrouter.ai/api',    // OpenRouter API

  // 消息平台
  '/discord': 'https://discord.com/api',         // Discord API
  '/telegram': 'https://api.telegram.org',       // Telegram API

  // 开发工具
  '/huggingface': 'https://api-inference.huggingface.co', // Hugging Face API
  '/portkey': 'https://api.portkey.ai'           // Portkey API
};
```

## 🎯 使用示例

### OpenAI 示例
```bash
# 聊天补全
curl https://api.114514.fan/openai/v1/chat/completions

# 图像生成
curl https://api.114514.fan/openai/v1/images/generations

# 语音转文字
curl https://api.114514.fan/openai/v1/audio/transcriptions
```

### Claude 示例
```bash
# 消息API
curl https://api.114514.fan/claude/v1/messages

# 流式响应
curl https://api.114514.fan/claude/v1/stream
```

### Discord 示例
```bash
# 获取用户信息
curl https://api.114514.fan/discord/users/@me

# 发送消息
curl https://api.114514.fan/discord/channels/123/messages
```

### Hugging Face 示例
```bash
# 模型推理
curl https://api.114514.fan/huggingface/models/gpt2

# 文本生成
curl https://api.114514.fan/huggingface/text-generation
```

## 🔄 路径转换规则

**格式：** `https://api.114514.fan/{service-prefix}/{rest-of-path}`

**示例转换：**
- `https://api.114514.fan/openai/v1/chat/completions`
  → `https://api.openai.com/v1/chat/completions`

- `https://api.114514.fan/discord/users/@me`
  → `https://discord.com/api/users/@me`

- `https://api.114514.fan/claude/v1/messages`
  → `https://api.anthropic.com/v1/messages`

## 📊 服务分类统计

- **AI 平台**: 11 个服务
- **消息平台**: 2 个服务  
- **开发工具**: 2 个服务
- **总计**: 15 个 API 服务

## 🚀 扩展说明

你可以轻松添加新的服务支持：

```javascript
// 添加新的 API 服务
const additionalMapping = {
  '/new-service': 'https://api.new-service.com',
  '/another-api': 'https://api.another.com/v1'
};

// 合并到现有映射
const fullMapping = { ...apiMapping, ...additionalMapping };
```

这个代理服务提供了统一的入口来访问所有主流 AI 和消息平台 API，简化了多平台集成的复杂性。
