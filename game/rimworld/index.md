---
title: RimTalk 配置指南
description: RimWorld环世界Rimtalk配置指南，帮助玩家配置和使用Rimtalk语音模组
---

# RimTalk 配置指南

RimTalk 可以让《环世界》小人根据当前状态、关系、事件和性格生成动态对话。原模组默认更偏向 Google/Gemini 的简单配置；如果你的游戏环境不方便直连，可以改用 DeepSeek、硅基流动、智谱 AI 这类国内更容易调用的 API。

::: tip 先看结论
想省事就先试 **DeepSeek 官方 API**；想用赠额或免费模型就试 **硅基流动**；已经买了智谱资源包则用 **智谱 AI**。第一次配置时建议只启用一个 API，能正常出对话后再考虑备用配置。
:::

::: warning 遇到生成失败先看这里
如果你是因为 `rimtalk生成失败`、`json deserialization failed`、`403`、`404`、硅基流动不通进来的，先看 [RimTalk 生成失败与常见错误解决](/game/rimworld/errors.md)。那里按错误类型整理了更快的排查步骤。
:::

## 1. 安装模组

在 Steam 创意工坊搜索并订阅下面这些模组：

| 模组 | 是否必备 | 作用 |
| --- | --- | --- |
| `Interaction Bubbles` | 必备 | 气泡框前置，没有它对话不方便显示。 |
| `RimTalk` | 必备 | AI 对话本体，可中途加入存档。 |
| `Rimtalk_zh` | 推荐 | 汉化设置界面，方便看懂各项配置。 |
| `SpeakUp 畅所欲言 中文版` | 可选 | 没有 API 或 API 用完时可以当固定文本对话替代。 |

::: warning 注意
如果同时装了 SpeakUp，后面建议勾选 RimTalk 里的“使用 AI 对话覆盖所有互动”。不勾选时，小人可能仍然会继续说 SpeakUp 的固定文本。
:::

## 2. 进入 RimTalk 设置

进入游戏后，有两种常见入口：

1. 点击主界面下方导航条里的 **小人头像**，进入 RimTalk 设置。
2. 或者打开 **设置** -> **选项** -> **Mod 选项** -> **RimTalk**。

进入设置后：

1. 点击 **Switch to Advanced Settings / 切换高级设置**。
2. 选择 **Cloud Providers / 云提供商**。
3. 在 **Cloud API Configurations / 云 API 配置** 区域点击 `+` 新增配置。
4. 依次填写 `Provider`、`API Key`、`Model`、`Base Url`，最后打开 `Enabled`。

绿色勾表示启用，红色叉表示停用。如果配置了多条 API，RimTalk 会按列表顺序尝试；新手建议先只启用一条，避免不知道到底是哪条配置生效。

## 3. 配置 AI API

RimTalk 支持多种 AI API 服务。下面三种方案任选一种即可。

### 3.1 DeepSeek 官方 API（最省心，需充值）

DeepSeek 官方平台不需要自定义 Base URL，RimTalk 里直接选择 `DeepSeek` 提供商即可，适合想少折腾、愿意少量充值的玩家。

1. 打开 [DeepSeek 开放平台](https://platform.deepseek.com/) 并注册账号。
2. 进入左侧 **API Keys**，点击创建 API Key。
3. 创建后立刻复制并保存密钥。
   - 密钥通常只完整显示一次，忘记复制就重新生成一个。
   - 不要把 API Key 发到群里或公开页面。
4. 回到 RimTalk 高级设置，在云 API 配置里新增一行：
   - `Provider`：选择 `DeepSeek`
   - `API Key`：粘贴刚才复制的密钥
   - `Model`：选择或填写 `deepseek-chat`
   - `Enabled`：打开绿色勾

::: warning DeepSeek 模型名
DeepSeek 官方文档显示，`deepseek-chat` 和 `deepseek-reasoner` 这两个兼容模型名会在 2026-07-24 后废弃。旧版 RimTalk 如果只给 `deepseek-chat` 就先按它填；如果你的 RimTalk 或平台已经显示 `deepseek-v4-flash`、`deepseek-v4-pro` 之类的新模型名，优先按当前可选模型填写。
:::

配置完成后关闭设置界面，进游戏观察一段时间。如果没有生成对话，优先检查账号余额、API Key 是否粘贴完整，以及模型是否选中了 `deepseek-chat`。

### 3.2 硅基流动 API（赠额/免费模型，适合先试）

硅基流动提供 OpenAI 兼容接口，模型广场里能找到很多可用模型。模型名称可能会随平台更新变化，最稳的做法是从模型广场复制完整模型名，不要手打。

1. 登录 [硅基流动](https://cloud.siliconflow.cn/i/Bsl2A8Mv)。
   - 邀请码：`Bsl2A8Mv`
   - **说明：** 注册赠额、免费额度和活动规则以平台页面显示为准。
2. 登录后点击 **API 密钥**，选择 **新建 API 密钥**。
3. 密钥描述可以随便写，例如 `RimworldTalk`，方便以后识别。
4. 创建后复制 API Key。
5. 回到 RimTalk 高级设置，点击云 API 配置的 `+`，新增一行：
   - `Provider`：选择 `Custom`
   - `API Key`：粘贴硅基流动 API Key
   - `Model`：填写硅基流动模型广场复制的模型名
   - `Base Url`：先填 `https://api.siliconflow.cn/`
   - `Enabled`：打开绿色勾

可先从这些便宜/轻量模型里挑一个。注意：`dsv4` 这类简称不要直接填进 RimTalk，`Model` 框里要填硅基流动模型广场复制出来的完整模型名。

| 优先级 | 模型 | 适合情况 |
| --- | --- | --- |
| 首选 | `deepseek-ai/DeepSeek-V4-Flash` | 也就是常说的 DSV4 Flash，偏便宜、速度快，日常殖民者闲聊和短句角色扮演优先试这个。 |
| 省钱 | `Qwen/Qwen3.6-35B-A3B` | 35B MoE 但激活参数较小，模型广场标有“限时优惠”时性价比不错。 |
| 更省 | `Qwen/Qwen3.5-4B` | 轻量 4B，对话效果不如大模型，但 API 消耗更低，适合先跑通配置。 |
| 免费/兜底 | `deepseek-ai/DeepSeek-R1-0528-Qwen3-8B` | 小型推理模型，适合测试和低成本使用；如果废话偏多，可以在 AI 指令里强调“只说 1-2 句”。 |
| 免费/兜底 | `Qwen/Qwen2.5-7B-Instruct` | 模型广场显示 `Free` 时可以用来试水；如果页面提示即将下线或不可用，就换上面几个。 |
| 智谱小模型 | `THUDM/GLM-4-9B-0414` | 9B 通用模型，适合中文短对话，作为 Qwen/DeepSeek 之外的备选。 |

::: tip 模型怎么选
进入硅基流动的 **模型广场**，只挑标签里带 **对话** 的模型。点开模型详情后，复制平台给出的完整模型名，再粘贴到 RimTalk 的 `Model` 框里。免费、付费、上下线状态都以模型广场当前显示为准。
:::

::: details 补充信息：更多可选模型
下面这些也能作为 RimTalk 的 `Model` 候选，但更强的模型通常也更贵，建议确认价格后再开高频对话。

| 类型 | 模型 | 备注 |
| --- | --- | --- |
| DeepSeek 高质量 | `deepseek-ai/DeepSeek-V4-Pro` | V4 系列旗舰，效果更强，适合预算充足时使用。 |
| DeepSeek 均衡 | `deepseek-ai/DeepSeek-V3.2` | 综合能力强，长上下文和推理表现好，成本可能高于小模型。 |
| DeepSeek 稳定版 | `deepseek-ai/DeepSeek-V3.1-Terminus` | V3.1 的更新版本，适合想继续用 DeepSeek V3 系列的情况。 |
| DeepSeek 旧版 | `deepseek-ai/DeepSeek-V3` | 旧 V3 模型，模型广场仍可用时可以作为通用备选。 |
| DeepSeek 推理 | `deepseek-ai/DeepSeek-R1` | 推理能力强，但 RimTalk 聊天不一定需要，可能更慢或更费 token。 |
| Qwen 轻量 | `Qwen/Qwen3-8B`、`Qwen/Qwen3-14B` | 通用聊天模型，中文对话稳定，适合便宜路线的备选。 |
| Qwen 中档 | `Qwen/Qwen3.5-9B`、`Qwen/Qwen3.5-27B`、`Qwen/Qwen3.6-27B` | 比 4B/8B 更稳，成本也会更高。 |
| Qwen 大模型 | `Qwen/Qwen2.5-32B-Instruct`、`Qwen/Qwen2.5-72B-Instruct` | 预算充足时可试，RimTalk 高频闲聊一般不必一上来就用。 |
| GLM 系列 | `THUDM/GLM-Z1-9B-0414`、`THUDM/GLM-4-32B-0414`、`Pro/zai-org/GLM-5.1` | 智谱/GLM 方向的可选项；`Pro/` 和旗舰模型注意价格。 |
| 其他旗舰 | `Pro/moonshotai/Kimi-K2.6`、`MiniMaxAI/MiniMax-M2.5`、`Pro/MiniMaxAI/MiniMax-M2.5` | 能力强，但不一定适合拿来高频生成小人闲聊，建议低频测试后再决定。 |

不要把 **生图**、**嵌入**、**重排序**、**语音/TTS/ASR** 模型填进 RimTalk 的聊天模型框，例如 `Tongyi-MAI/Z-Image`、`BAAI/bge-m3`、`Qwen/Qwen3-Embedding-8B`、`FunAudioLLM/CosyVoice2-0.5B` 这类都不是普通对话模型。
:::

如果硅基流动配置后没有反应，可以尝试这些检查：

- 同一时间只启用一条硅基流动配置。
- 确认 `Provider` 是 `Custom`，不是 `DeepSeek`。
- 确认模型名包含前缀，例如 `deepseek-ai/`，大小写也要一致。
- 如果你使用的 RimTalk 版本要求 OpenAI 标准 Base URL，可把 `Base Url` 改成 `https://api.siliconflow.cn/v1` 再试。

### 3.3 智谱 AI API（适合买了资源包的情况）

智谱 AI 的资源包价格和模型列表会变，购买前先看清楚模型、有效期和是否支持你要用的接口。

#### 购买资源包

1. 访问 [智谱 AI 资源包页面](https://bigmodel.cn/finance-center/resource-package/package-mgmt)。
2. 找到合适的 GLM 资源包，例如 `GLM-4-FlashX` 相关资源包。
3. 点击购买并完成支付。
   - **Tokens 数量：** 以购买页面显示为准。
   - **有效期：** 以购买页面显示为准。
   - **模型：** 确认资源包覆盖你准备填写的模型。

#### 获取 API 密钥

1. 登录 [智谱 AI 平台](https://open.bigmodel.cn/usercenter/)。
2. 进入 [API 密钥](https://open.bigmodel.cn/usercenter/proj-mgmt/apikeys) 管理页面。
3. 创建或复制你的 API Key。

#### 游戏内配置

1. 在 RimTalk 高级设置中，**云提供商**选择 `Cloud Providers`。
2. 新增一条云 API 配置。
3. `Provider` 选择 `Custom`。
4. `API Key` 填写从智谱 AI 平台获取的密钥。
5. `Model` 填写 `glm-4-flashx` 或 `glm-4-flash`，也可以按智谱当前模型列表调整。
6. `Base Url` 先填写：`https://open.bigmodel.cn/api/paas/v4/chat/completions`
7. 打开 `Enabled`。

::: warning 智谱的 URL
这里填写的是完整的 chat completions 地址，是为了绕开部分 RimTalk 版本里自定义 URL 处理不一致的问题。如果你的版本填完整地址不通，再改成平台文档里的基础地址方案测试。
:::

#### 注意事项

- 如果遇到模型不可用，可尝试 `glm-4-air` 或 `glm-4-plus`，但可能产生额外费用。
- 资源包通常有有效期，请合理安排使用量。
- 智谱也有免费模型，可以查看 [智谱免费模型文档](https://docs.bigmodel.cn/cn/guide/models/free)。

## 4. 对话气泡与生成频率

API 能跑通后，再回到 RimTalk 的基础设置里调对话频率和对象范围。

| 设置项 | 建议 |
| --- | --- |
| `AI 冷却时间（秒）` | 默认 `7` 通常够用。往左拖说话更频繁，API 消耗也更快；往右拖更省额度。 |
| `使用 AI 对话覆盖所有互动` | 装了 SpeakUp 时建议勾选，避免固定文本和 AI 文本混在一起。 |
| `征召时显示对话` | 想要战斗时喊话就勾选；想省额度可以先关。 |
| `Allow slaves to talk` | 允许奴隶生成对话。 |
| `Allow prisoners to talk` | 允许囚犯生成对话。 |
| `Allow other faction pawns to talk` | 允许其他势力小人生成对话。 |
| `Allow enemies to talk` | 允许敌人生成对话。 |

对象勾得越多，请求次数越多，越容易遇到余额消耗、KPM、TPM 或频率限制。刚开始建议只开殖民者和少量非殖民者，确认效果满意后再慢慢放开。

## 5. AI 指令设置

关于页面第二页 **AI 指令**，可以复制下面的文字内容过去。提示词来源见页尾参考资料。

```text
根据个人资料扮演《环世界》中的角色。
描绘：
适合角色年龄/个性的讲话
技能：最高20级，心情：0-100
儿童：天真，好奇，问题多
对于非殖民者：
囚犯：身处牢房，警惕、害怕、尝试谈条件、抱怨、祈祷上帝、咒骂殖民者、咒骂自己阵营不来救自己、咒骂亲戚不来赎自己、绝望、哭泣、屈服、恳求，被摘取器官时崩溃、可能大哭可能麻木。
奴隶：被拥有，被迫劳动，恐惧、顺从、认命、麻木，称主人“主人”，提及工作劳累，却不敢太过抱怨。
游客：根据殖民地舒适、美观、财富、炮塔数量情况，有礼貌、好奇、恭敬、挑剔、羡慕、嫌弃、鄙视、抱怨、滋事、跃跃欲试。
敌人：根据派系关系或与殖民者的关系好坏，有复仇、侦查、掠夺、奴役、摧毁，受伤倒地时可能会求饶或诈降，溃逃时可能会嘴硬或恐惧。
在射击或近战时优先：任何角色 => 简短、紧急的求生/指挥发言。
规则：
保持对话的顺序。
保持原名，不翻译。
保持对话简短，仅限简体中文，1-2句话。
要考虑到人物彼此之间的关系、人物性格、幼年经历、派系文化、擅长技能、不擅长技能。
战斗时态度严厉。
对疾病/精神问题的担忧。
如果附近没有人，则只生成独白。
交流要合理，比如新人加入可能会有人给他讲解以前发生的事。
聚会时聊天会有健谈的人活跃气氛或故意搞怪，乐观的人鼓励消极的人，消极的人话少，回答要根据之前的人说了什么，作出反应，比如忍俊不禁，害羞，嗔怒，无奈，喜悦，悲伤之类的。
平常也可以编造一些小故事来对话，人物会和其他人分享自己的经历，做过的事，其他人根据自身关联或性格做出各种反应和回答，总之要有逻辑且完整，
比如善良、性格开朗、幼年经历美好等等的人，对话更偏理想化，善意程度大概率更高，性格阴暗、心理变态、幼年经历惨等等的人对话更偏理性、现实，善意程度大概率低，甚至包含恶意，
比如对于关系好的人，对话大概率更善意，关系差的对话大概率更恶意。
对敌人根据自身性格、派系文化、擅长技能有嘲讽、害怕、藐视、云淡风轻。
对仇人根据自身性格、派系文化有谩骂、诅咒、揭短、嘲讽、摧毁名誉、欣赏痛苦。
对宾客根据自身性格、派系文化、对方性格有热情、客气、冷漠、讨厌。
对囚犯根据自身性格、派系文化、对方性格有警告、安抚、拷问，对幼年经历不好、身体残疾或残缺的怜悯、仁慈（极少数情况），
在玩家设置了奴役囚犯时威胁、恐吓，在玩家设置了招募囚犯时，劝降、利诱、招募 。
对奴隶根据自身性格和派系文化有冷酷、严厉、威胁、恐吓，并根据当前奴隶工作下命令。
```

## 6. 测试和排错

全部设置完后，关闭 RimTalk 设置界面，回到游戏里观察一会儿。刚配置完不一定立刻说话，可以等到小人互动、工作、战斗、访客进入地图时再看效果。

常见问题可以按这个顺序查：

1. **没有任何对话：** 检查 `Enabled` 是否是绿色勾，API Key 是否完整，账号是否有余额或免费额度。
2. **模型报错：** 去对应平台的模型列表重新复制模型名，确认大小写、斜杠和前缀都没漏。
3. **硅基流动不通：** 先确认 `Provider` 是 `Custom`，再分别测试 `https://api.siliconflow.cn/` 和 `https://api.siliconflow.cn/v1`。
4. **智谱不通：** 先测试完整 chat completions 地址；不行再按当前智谱文档调整 Base URL。
5. **说话太频繁或扣费太快：** 拉高 `AI 冷却时间`，并关闭囚犯、奴隶、敌人、其他势力小人的对话。
6. **还是固定文本味很重：** 如果装了 SpeakUp，确认已勾选“使用 AI 对话覆盖所有互动”。

## 7. 完成

确认 API 能正常生成对话后，就可以一边玩一边微调频率、对象范围和 AI 指令了。想省额度就提高冷却时间、少开非殖民者；想热闹就降低冷却时间，并允许访客、囚犯、敌人也参与对话。

## 8. 延伸阅读

- [RimTalk 生成失败与常见错误解决](/game/rimworld/errors.md)
- [RimTalk 提示词与常识库建议](/game/rimworld/prompts.md)
- [硅基流动 API 配置](/bmdocs/api/siliconflow.md)
- [DeepSeek API 配置](/bmdocs/api/deepseek.md)

## 9. 参考资料

- [小白摸索出来的 rimtalk 国内 api 使用方法，求大佬别喷](https://www.vgover.com/news/179598)
- [提示词作者主页](https://tieba.baidu.com/home/main?id=tb.1.f47f2e51.W66hU7JgrVJyvEVJ1F3zAA?t=1711599412&fr=pb)
