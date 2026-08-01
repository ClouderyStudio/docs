---
title: RimJobWorld 下载与安装指南
description: RimWorld环世界RimJobWorld(RJW)成人向模组下载、安装、加载顺序教程，含18+内容警告
---

# RimJobWorld 下载与安装指南

::: danger 18+ 内容警告
本页面涉及 **RimJobWorld（RJW）** 模组的下载与安装说明。该模组包含大量**成人向（18+）内容**，如性行为、性取向、色情相关疾病与手术、违禁类药物等。

**未满 18 周岁请立即关闭本页面，不要下载、安装或游玩该模组。**

同时请注意：部分国家和地区禁止制作、传播或使用此类内容，请自行确认当地法律法规；请勿在公开场合（直播间、公开群聊、社交平台）展示或传播该模组的游戏画面，避免封号或引发纠纷。
:::

RimJobWorld（简称 **RJW**）是《环世界》最著名的成人向模组框架之一，由社区长期维护。它提供性需求系统、性取向、手术、妊娠系统、直接控制等内容，并拥有大量附属模组（Add-On）。

::: warning 为什么不在 Steam 创意工坊
由于 Steam 创意工坊禁止 NSFW 内容，**RJW 本体和绝大多数附属模组都不会出现在创意工坊**，只能通过官方仓库、LoversLab 等渠道手动下载安装。
:::

## 1. 前置要求

| 项目 | 说明 |
| --- | --- |
| 游戏本体 | 环世界 RimWorld（官方仓库内提供 1.1 ~ 1.6 版本的构建） |
| `HugsLib` | 必需前置。可在 [Steam 创意工坊](https://steamcommunity.com/sharedfiles/filedetails/?id=818773962) 订阅（ID：818773962），也可从 [GitHub](https://github.com/UnlimitedHugs/RimworldHugsLib) 获取 |
| `Harmony` | 必需前置，绝大多数核心模组都依赖它 |
| DLC | 部分附属模组需要 Ideology、Biotech 等 DLC，详见各附属模组说明 |

## 2. 下载

RJW 官方发布渠道：

| 渠道 | 地址 | 用途 |
| --- | --- | --- |
| 官方仓库（GitGud） | <https://gitgud.io/Ed86/rjw> | 源码与最新构建 |
| 直接下载压缩包 | <https://gitgud.io/Ed86/rjw/-/archive/master/rjw-master.zip> | 免登录直接下载最新版 |
| LoversLab 发布帖 | <https://www.loverslab.com/files/file/7257-rimjobworld/> | 发布公告、更新日志与社区讨论 |
| 官方 Wiki | <https://rjw.miraheze.org/wiki/RimJobWorld> | 玩法、加载顺序等详细说明 |
| 官方 Discord | <https://discord.gg/CXwHhv8> | 社区交流与反馈 |
| SubscribeStar | <https://subscribestar.adult/Ed86> | 自愿赞助开发者（非必需） |

建议优先使用 GitGud 仓库的 **master 分支 zip 直链**，该链接始终指向最新构建；LoversLab 帖子用于查看更新说明和讨论。

## 3. 安装

### 3.1 自动安装（推荐）

可以使用 **Libidinous Loader** 这类自动化工具安装和更新 RJW 及其附属模组，具体用法参见 [Libidinous Loader Wiki](https://rjw.miraheze.org/wiki/Libidinous_Loader)。

### 3.2 手动安装

::: warning 更新时务必先删除旧文件
**升级 RJW 版本前，必须先删除 Mods 目录里上一版 RJW 的所有文件**，再解压新版本，否则容易出现残留文件导致的报错或存档问题。
:::

1. 下载 `rjw-master.zip` 压缩包。
2. 解压到 RimWorld 游戏目录的 Mods 文件夹下，重命名为 `RJW`（若已存在同名文件夹，先整个删除）。
   - 完成后应看到这样的目录结构：`RimWorld/Mods/RJW/About`
3. 启动游戏，在 **Mods 界面**勾选 RJW 以及前置模组（HugsLib、Harmony）。
4. **完全退出并重启游戏**，让模组正式加载。

::: tip Mods 目录在哪
Steam 版默认路径为 `Steam 库目录\steamapps\common\RimWorld\Mods`；在 Steam 中右键《环世界》→ 管理 → 浏览本地文件 可直接打开游戏根目录。
:::

## 4. 加载顺序

RJW 及其附属模组**必须排在加载列表最底部**（其他内容模组之后），官方推荐的顺序是：

```text
RimWorld Core（游戏本体）
  ↓
HugsLib
  ↓
其他内容模组
  ↓
RimJobWorld
  ↓
RJW 附属模组（Add-On）
  ↓
性能优化类模组
```

::: warning 注意 RimSort
RimSort 等模组管理器可能不会自动把 RJW 及其附属模组排到最底部，需要手动把它们拖到加载顺序列表末尾。
:::

## 5. 常用附属模组（可选）

以下模组均在 LoversLab 或 GitHub/GitGud 发布，**不在创意工坊**。完整列表见 [RJW Add-On List（官方 Wiki）](https://rjw.miraheze.org/wiki/RJW_Add-On_List)。

| 模组 | 作用 |
| --- | --- |
| RimNudeWorld | 增加身体细节纹理显示（[LoversLab](https://www.loverslab.com/files/file/14271-rimnudeworld/)、[GitHub](https://github.com/ShauaPuta/RimNudeWorld)） |
| RJW Animation Framework | 性互动动画框架（[LoversLab](https://www.loverslab.com/topic/140386-16-rjw-animation-framework/)） |
| Anim Addons | 动画框架补充包：语音、额外动作、动物动画（[LoversLab](https://www.loverslab.com/files/file/13979-anim-addons/)） |
| RJW Race Support | 增加对 HAR 外星种族框架的支持（[LoversLab](https://www.loverslab.com/topic/199907-rjw-race-support/)） |
| RJW Genes | 需 Biotech DLC，添加性相关基因与种族 |
| C0ffee's RJW Ideology Addons | 需 Ideology DLC，添加性相关文化信条与仪式 |
| RJW Sexperience | 增加性技能、经验记录与淫乱度系统 |

附属模组同样要求 **加载在 RJW 本体之后**（第 4 节顺序）。

## 6. 注意事项

- **性能影响**：RJW 与动画类附属模组会显著增加运算负载，可能导致 TPS 下降、后期卡顿，配置较低的机器请酌情取舍。
- **存档兼容**：大型版本更新（如跨游戏大版本）通常不兼容旧存档，更新前建议备份存档。
- **未成年人保护**：请勿向未成年人分享该模组及本页面链接。

## 相关页面

- [RimTalk 配置指南](/game/rimworld/)
- [RimTalk 提示词与常识库建议](/game/rimworld/prompts.md)
- [RimTalk 生成失败与常见错误解决](/game/rimworld/errors.md)
