---
description: 云术工作室对外开放 API 的开发与自动化参考：分区维护约定、插件编译方法（本机 Roslyn 手工编译），以及把插件从 GitHub / Gitee / CNB 自动发布到 SCForge 平台的完整配置说明，含 CI 密钥配置手把手教程
---

# 开发与自动化参考

> 本页有三个读者，内容都写在一起：
>
> - **维护文档站的人 / AI 助手**：本页前半部分是 `/api` 分区的**维护约定**，改这个目录之前先读它。
> - **插件作者 / 服主**：**附录一**是**发布自动化教程** ——
>   怎么让打一个 tag 就自动把插件发到 SCForge 平台，**不需要你会写 CI**，照着抄即可。
> - **要在这个仓库里改代码的 AI 助手**：**附录二**是**编译方法** ——
>   这个仓库没有 `.csproj`、本机也没有 .NET SDK，插件是靠 Roslyn 的 `csc.dll` 手工编出来的，动手前先读它。
>
> 接口字段以[接入指南](./index.md)与 [SCForge 接口参考](./scforge.md) 为准，本页只讲"怎么维护""怎么编"和"怎么自动化"。

**作用域仅限本目录（`api/`）**，对应线上 `/api/` 分区。仓库其它分区（`/docs`、`/serve`、`/game`、`/bmdocs`、`/nav`、`/hearttree`）不在本页约束范围内，改之前请先读对应目录的说明或问人。

## 这个分区是干什么的

`/api` 只讲一件事：**第三方怎么调云术工作室对外开放的 HTTP 接口**。

- 入口固定 `https://api.cldery.com`，路径规则 `/{模块}/{资源}`（例如 `GET /scforge/addons`）。
- 读者是外部开发者，不是内部同事：写清楚"怎么调通"，不写内部实现、后台接口、未开放端点。

## 目录里只有两类文件，改法完全不同

| 文件 | 性质 | 能不能手改 |
| --- | --- | --- |
| `index.md` | 手写总览：入口、鉴权、作用域、调用示例、错误形状、约定 | ✅ 可以直接编辑 |
| `scforge.md` | vitepress-openapi 的渲染壳：开头两段说明 + `<script setup>` + `<OASpec :spec="spec" />` | ⚠️ 只能改开头说明段，**接口细节一律不改** |
| `AGENTS.md` | 本文件。分区维护约定 + 插件编译方法 + 发布自动化教程 | ✅ 可以直接编辑 |
| `../openapi/scforge-public.json` | OpenAPI 产物（页面构建期 `import` 的正本） | ❌ 禁止手改 |
| `../public/openapi/scforge-public.json` | 同一份产物的静态副本（供 `/openapi/scforge-public.json` 下载） | ❌ 禁止手改 |

**接口细节的唯一真源是 ClouderyApi 的运行时 OpenAPI**，`scforge.md` 只是把它渲染出来。
发现"文档和接口对不上"时，正确处理是去 ClouderyApi 修接口/修导出，再同步过来 —— **不要在 md 或 json 上打补丁**，那只会制造下一轮漂移。

## 同步链路

```
ClouderyApi 运行时 OpenAPI
  └─ 测试 ScforgePublicOpenApiTests 导出 → ClouderyApi/docs/openapi/scforge-public.json
       └─ pnpm sync:api <ClouderyApi 仓库路径>
            ├─ openapi/scforge-public.json          （import 用）
            └─ public/openapi/scforge-public.json   （下载用）
```

```bash
pnpm run sync:api <ClouderyApi 仓库路径>
# 或 CLOUDERY_API_REPO=E:\...\ClouderyApi pnpm run sync:api
```

源文件不存在时，先在 ClouderyApi 仓库跑一次测试让它产出：

```bash
dotnet test ClouderyApi.Tests/ClouderyApi.Tests.csproj --filter FullyQualifiedName~ScforgePublicOpenApiTests
```

## 三条硬约束

1. **`scforge.md` 必须保持静态 `import spec`，不要改成 `spec-url`。**
   spec-url 会在 SSR 的 Node 侧 fetch 相对路径，直接构建失败。源码里已留注释说明，别删。
2. **两份 JSON 必须同时更新。** 它们内容应始终一致（都由 `sync-openapi.mjs` 写出）；只改一处会出现"页面是新的、下载链接还是旧的"。
3. **`<OASpec>` 依赖主题注册，顺序不能反。** `.vitepress/theme/index.ts` 里必须先 `useOpenApiTheme({ i18n: { locale: 'zh' } })` 再 `openApiTheme.enhanceApp({ app })` —— 后者内部读的就是这份全局配置，反了会退回英文文案。

## 新增一个服务分区的标准动作

假设新服务叫 `<service>`：

1. **ClouderyApi 侧**：导出 `<service>-public.json`，并把新目标加进 `scripts/sync-openapi.mjs` 的 `targets`（`openapi/` 与 `public/openapi/` 各一条）。
2. **本目录**：新建 `api/<service>.md`，照抄 `scforge.md` 的三段结构 —— 说明段（含一句"鉴权与约定见总览"的链接）+ 静态 import + `<OASpec :spec="spec" />`。
3. **`index.md`**：顶部服务表加一行（`服务 / 内容 / 接口参考链接 / 状态`）。
4. **`.vitepress/configs/sidebar.ts`**：`'/api/'` → `items` 数组加一项，link 写法与现有保持一致（带 `.md` 后缀）。
5. **navbar 不用动**：`.vitepress/configs/navbar.ts` 里 `activeMatch: '/api/'` 已覆盖新页面。

## 写作口径（改 `index.md` 时必须保持一致）

- 入口 `https://api.cldery.com`；路径 `/{模块}/{资源}`。
- **插件与模组共用一棵资源树**，用 `kind` 区分（`/plugins`、`/mods` 只是站点上的两个预设筛选入口，接口层只有一个资源类型）。
- 三种鉴权：匿名只读公开目录 / 会话 Cookie / `Authorization: Bearer scf_...`。**同时带会话与 Bearer 时会话优先**，脚本调用只带 Bearer。
- API Key 明文**只显示一次**，服务端只存哈希；自助签发只有 `read` 与 `publish`，`manage` 必须超管签发。
- 错误形状统一 `{"detail": "..."}`；重点状态码 `400 / 401 / 403 / 404 / 409`，其余按 HTTP 语义。
- 时间一律北京时间（UTC+8，形如 `2026-07-01T12:00:00+08:00`）；只做副作用的写操作返回 `{"success":true}`；发布与编辑都进审核，通过前对外不可见。
- 示例给可直接复制的 `curl`，**密钥一律用占位符**（`$SCFORGE_TOKEN`、`$CLOUDERY_SESSION_COOKIE`），不写真实令牌。
- 中文、简洁、面向外部开发者。需要强调的坑用 `::: warning` 容器（现有"会话优先"就是这么写的）。

## 不要做的事

- 不要把 `api/` 和 `bmdocs/api/` 混为一谈 —— 后者是 AI 模型代理（deepseek / siliconflow / OpenRouter / Gemini 等）的配置文档，属于另一套体系。
- 不要在 `/api` 分区里写内部后台、管理端或未对外开放的接口。
- 不要手改 `openapi/**` 下的任何 JSON。
- 不要为了"补齐文档"去猜接口字段 —— **猜错比不写更糟**，先去 ClouderyApi 确认。
- 不要顺手改其它分区的 sidebar / navbar 项。

## 本地验证

```bash
pnpm i
pnpm dev        # 看 /api/ 与 /api/scforge.html
pnpm build      # 必须过；SSR 阶段会真的 import spec，路径写错会在这里炸
```

改了 `scforge.md`、`openapi/` 或 `sidebar.ts` 之后，**`pnpm build` 是必跑项**，只跑 dev 不足以暴露 SSR 问题。

## 关于本页的路由（重要）

本仓库的 VitePress `srcDir` 就是**仓库根**，所以任何 `.md` 都会被构建成页面。

**本文件是有意保留为可访问页面的**：线上地址 `/api/agents`。
它同时承担两个角色 —— 给 AI 助手看的约定文件（文件名保持 `AGENTS.md` 是行业惯例），
以及对外公开的"开发与自动化参考"。

::: tip 为什么地址是小写的
Netlify 会把 URL 路径统一转小写，所以 `AGENTS.html` 请求过去会 **301** 跳到 `/api/agents`。
两个地址都能访问，但**对外分享时请直接用小写** `/api/agents`，少一跳。

另外注意 VitePress 的页面地址是 **`.html` 结尾**，不是 `.md`：
写 `/api/AGENTS.md` 是拿不到页面的。
:::

::: warning 不要把它排除掉
`.vitepress/config.ts` 里**不要**给 `AGENTS.md` 加 `srcExclude`。
一旦排除，`/api/agents` 会直接 404 —— 本页就是靠"被正常渲染"才能访问的。
:::

---

# 附录一：把 Release 自动发到 SCForge 平台

> 这一节面向**插件作者与服务器服主**。
> 目标：在仓库打个 tag，CI 自动把编译好的插件 DLL 上传到 SCForge，不用手动传文件。
>
> **不需要你会写 CI**。大部分内容可以直接抄，需要你自己填的只有"密钥"和"配方"两处，下面会一步一步说。

## 先搞清一件事：为什么不能"让平台自己去 GitHub 拉"

SCForge 的发布接口要的是**文件本体**（`multipart/form-data` 上传），平台**没有"给我个链接我自己去下载"的能力**。

所以"自动从 Release 读取"这件事，真实的落地方式是：

```
GitHub Release  ──下载──▶  CI 运行环境  ──上传──▶  SCForge 平台
                          （脚本在这里把两头接起来）
```

"用加速链接"解决的是**下载那一步**在国内慢的问题：

```
https://gh-proxy.com/https://github.com/ClouderyStudio/sc-plugins/releases/download/v1.0.0/web-panel.dll
└──── 加速前缀 ────┘└────────────────────── 原始 Release 附件地址 ──────────────────────┘
```

已在 `gh-proxy.com` 上实测通过（112,128 字节的 DLL 完整下回，`MZ` 头正常）。
脚本里做了**直连兜底** —— 加速站抽风时自动退回 GitHub 原始地址，不让发版卡死。

## 相关文件一览（`ClouderyStudio/sc-plugins` 仓库）

| 文件 | 位置 | 职责 |
| --- | --- | --- |
| `release-manifest.json` | `.buildtools/` | 待发布 DLL 清单 + **SCForge 发布配方**（标题/slug/简介/标签） |
| `publish-release.py` | 同上 | 编译 → 提交 → 打 tag → 推 Git 远端 → 建 Release → 传附件 → 转手发平台 |
| `publish-to-scforge.py` | 同上 | 把 DLL 传到 SCForge（可独立运行，也是 CI 调用的那个） |
| `check-sources.py` | 同上 | 仓库自检，含"Scforge 配方是否与 Assets 一一对应、分类/标签是否合法、slug 是否唯一" |
| `verify-scforge-slugs.py` | 同上 | **slug 对账**：把配方里的 slug 与平台已有资源并排比对，揪出"会新建重复资源"的隐患。**不需要 Key** |
| `ci.yml` | `.github/workflows/` | 自检 + 打 tag 时自动发平台（`publish-scforge` 作业） |

## 配置步骤

### 第 1 步：签发 API Key

登录 <https://scforge.cldery.com/api-keys>，勾 **`publish`** 作用域后签发。

- 明文**只显示一次**，服务端只存哈希，丢了只能轮换。
- 自助签发只有 `read` / `publish`；`manage`（删除、重新送审）必须超管在后台签。
- **自动上传只要 `publish` 就够** —— 脚本做的是"新建资源 + 追加版本"。

### 第 2 步：填发布配方

在 `sc-plugins/.buildtools/release-manifest.json` 里补 `Scforge` 段。键是**插件中文名**（与 `Assets[].Plugin` 对齐）：

```json
"Scforge": {
  "Kind": "plugin",
  "GameVersion": "x26.07.01",
  "Category": "misc",
  "Items": {
    "和平区域插件": {
      "Slug": "peace-zone",
      "Summary": "划分和平区域，区域内禁止玩家之间互相伤害",
      "Description": "更长的说明正文，显示在资源详情页，建议两三句话讲清用途与用法。",
      "Tags": ["protection", "pvp"]
    }
  }
}
```

各字段的含义与注意点：

- **`Slug` 是最重要的字段**：它是资源对外的固定地址，**创建后接口层不允许更改**。取一个短、好记、纯英文小写的名字。想换地址只能删掉资源重建。
- **`Description` 是服务端必填项**，漏了会报 `400 请填写详细描述`。注意它和 `Summary` 不是一回事：`Summary` 是一句话简介，`Description` 是详情页正文。
- `GameVersion` 取 `GET /scforge/game-versions` 里的值。
- `Kind` 只能是 `plugin`（仅服务端）或 `mod`（会下发客户端），**创建后不可更改**。
- `Category` 与 `Tags` 是**白名单校验**，乱填会被 `400` 拒绝 —— 合法值见下方「分类与标签（只能取预设法）」。
- 缺 `Scforge` 段或某个插件的配方时，脚本会跳过它并在自检里报 FAIL —— **不会静默漏发**。

#### ⚠️ 配配方之前，先跑一次对账

**这批插件如果以前手动发过，`Slug` 就不能自己编 —— 必须用平台上已有的那个。**

脚本是按 slug 精确匹配来决定"新建还是追加版本"的。slug 对不上 → 探测不到 → **直接新建一份**，
平台上就出现两个同名插件（一个旧 slug、一个新 slug）。这不是脚本 bug，是配方与平台脱节。

所以填完配方、发版之前，先跑：

```bash
python .buildtools/verify-scforge-slugs.py
```

它读公开目录（**不需要任何 Key**），把「清单里的 slug」与「平台上已有的资源」并排摊开：

- 标 `[有]`：对上了，发版会追加版本，符合预期。
- 标 `[新]`：平台上没有，发版会**新建资源**。
- **疑似重复告警**：如果某个 `[新]` slug 的名字，和平台上某个"未被清单认领"的资源对得上
  （名字归一化后相同，`个人进服密码插件` 与 `个人进服密码` 会撞上），脚本会把它挑出来并
  给出建议值 —— **这时候就应该把配方的 Slug 改成平台已有的那个，而不是照抄自己新编的。**
- 末尾会列出"平台上没被任何配方认领的资源"，用来发现漏配或该清理的旧资源。

> 真实踩过：一次配 9 个插件时凭感觉编了 slug，结果 6 个与平台上手动发的对不上，
> 一次性多建了 6 份重复资源。加这个脚本就是为了让这类问题**在发版之前暴露**。

### 第 3 步：本机试跑

```bat
set SCFORGE_TOKEN=scf_xxxx
python .buildtools/publish-release.py v1.0.0
```

跑通一次再配 CI，能省很多来回。

## 分类与标签（只能取预设法）

::: warning 这两个字段是白名单，OpenAPI 里看不到
OpenAPI 规格里 `Category` 只声明为 `string`、`Tags` 只声明为 `array`，**没有枚举端点**。
真实可取值在站点前端。填错会直接 `400`，报"请选择有效的插件分类"或"不支持的标签：xxx"。
:::

**分类（12 个，单选）**

| 键 | 中文 |
| --- | --- |
| `gameplay` | 玩法扩展 |
| `utilities` | 实用工具 |
| `world` | 世界生成 |
| `mobs` | 实体与生物 |
| `storage` | 存储与物品 |
| `economy` | 经济与商店 |
| `protection` | 防护与安全 |
| `performance` | 性能优化 |
| `api` | 开发库 |
| `integration` | 集成桥接 |
| `misc` | 其它 |

**标签（20 个，可多选）**

```
survival  creative  pvp  pve  multiplayer  singleplayer  adventure  technical
decoration  magic  technology  food  transport  mining  farming  server
client  library  chinese  open-source
```

::: warning 常见的填错
- 想写"其它"时，正确键是 **`misc`**，不是 `other`（`other` 会被 `400` 拒绝）。
- 标签里**没有** `web`、`admin`、`console` 这几个词，别照着自己插件的感觉编。
:::

`check-sources.py` 已把这两张表内置为校验项，**发版前就会 FAIL**，不必等 CI 报 `400`。

## CI 配置：一键把"打 tag"变成"自动发平台"

### 先讲清楚：CI 的"密钥"是什么，为什么必须单独配

你可能会想："我把 token 写在脚本里不就行了？"

**不行。** 仓库是公开的，任何写进代码文件的东西全世界都能看到 —— 包括你的 API Key。
Key 一旦泄露，别人就能拿你的账号往平台上发东西。

所以 CI 平台都提供了一套叫 **Secrets（密钥 / 私密变量）** 的机制：

| | 普通变量 | Secret |
| --- | --- | --- |
| 写在哪 | 可以直接写在配置文件里 | **只填在网页后台，不进代码仓库** |
| 谁能看到 | 所有人 | 只有管理员能看和改 |
| 日志里显示 | 原样打印 | **自动打码成 `***`**，防止意外泄露 |

一句话：**凡是"不能让别人知道的字符串"，都放 Secret；凡是"配置项"，才写在文件里。**

下面分别给出三个平台的配法，你**只需要配你实际在用的那个**。

---

### A. GitHub Actions（当前仓库在用的）

**配 Secret 的路径**（不用命令行，网页点几下就行）：

1. 打开仓库页面 → 顶部 **Settings**
2. 左侧栏 → **Secrets and variables** → **Actions**
3. 点绿色按钮 **New repository secret**
4. **Name** 填 `SCFORGE_TOKEN`（必须一字不差，脚本就是按这个名字读的）
5. **Secret** 粘贴你第 1 步签发的 `scf_...` 令牌
6. 点 **Add secret** 保存

配好之后，工作流里就能这样用：

```yaml
- name: 上传到 SCForge
  env:
    SCFORGE_TOKEN: ${{ secrets.SCFORGE_TOKEN }}   # 从 Secret 注入成环境变量
  run: python3 .buildtools/publish-to-scforge.py "$GITHUB_REF_NAME" --from-url
```

::: warning 三个最容易踩的坑
1. **名字必须完全一致**：`SCFORGE_TOKEN`。写成 `SCFORGE_KEY` 或 `SCForge_Token`，脚本读不到就会静默跳过上传（不会报错，你会以为成功了）。
2. **改完 Secret 要重新触发一次**：已经跑起来的流水线用的是旧值。
3. **日志里看不到明文是正常的**：GitHub 会把它打码成 `***`，这正是 Secret 在起作用。想确认有没有生效，看日志里有没有"跳过上传"的提示。
:::

**完整工作流片段**（`sc-plugins/.github/workflows/ci.yml` 里 `publish-scforge` 作业）：

```yaml
publish-scforge:
  needs: check
  if: startsWith(github.ref, 'refs/tags/v')
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-python@v5
      with: { python-version: '3.12' }

    # 等 Release 附件就绪：打 tag 会同时触发本流水线与"建 Release"，
    # 两条流程并行，CI 常常跑得更快 —— 此时取附件会 404。
    - name: 等待 GitHub Release 就绪
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      run: |
        url="https://api.github.com/repos/$GITHUB_REPOSITORY/releases/tags/$GITHUB_REF_NAME"
        for i in $(seq 1 30); do
          assets=$(curl -s -H "Authorization: Bearer $GH_TOKEN" "$url" \
            | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('assets') or []))" 2>/dev/null || echo 0)
          if [ "$assets" -ge 9 ]; then echo "Release 已就绪，附件 $assets 个。"; exit 0; fi
          echo "等待 Release 附件（当前 $assets 个）... $i/30"; sleep 10
        done
        echo "::warning::等待超时，仍尝试上传（脚本内部还有重试）。"

    - name: 上传到 SCForge
      env:
        SCFORGE_TOKEN: ${{ secrets.SCFORGE_TOKEN }}
      run: |
        if [ -z "$SCFORGE_TOKEN" ]; then
          echo "::warning::未配置 SCFORGE_TOKEN，跳过 SCForge 上传。"
          exit 0
        fi
        python3 .buildtools/publish-to-scforge.py "$GITHUB_REF_NAME" --from-url
```

设计要点，改的时候别破坏：

- **只跑在 `refs/tags/v*`**：branch 的 push 不发平台，避免每次改源码都产生一个待审版本。
- **`needs: check`**：自检不过就不发 —— 自检里包含 slug 唯一性、分类/标签合法性与配方完整性。
- **没配 Secret 时 `exit 0`**：降级为"只发 GitHub"，CI 不因此变红。
- **`--from-url`**：云端没有编译产物（编不出来，需要商业游戏的核心 DLL），
  只能从 Release 附件下载。这份文件与 GitHub 上那份**逐字节一致**，能保证平台与 Release 不漂移。
- **`"$GITHUB_REF_NAME"`**：在 tag 触发时正好是 `v1.0.0`，与 Release 的 tag 天然对齐。

::: warning Secret 里放的是 SCForge 的 Key，不是 GitHub 的
这一步需要的是 **SCForge 的 `scf_` API Key**，和 GitHub 凭据**完全无关**。
**不要**为了这个去建权限更大的 GitHub PAT —— 上传 SCForge 全程不碰 GitHub API。

（`GITHUB_TOKEN` 是 Actions 自动注入的，用于读 Release 状态，作用域自动限制在当前仓库，不需要你配。）
:::

---

### B. Gitee（国内常用）

Gitee 的 CI 叫 **Gitee Go**，配置文件是**仓库根目录下的 `.gitee-ci.yml`**。

**密钥不走 YAML，而是在仓库后台单独设**：找到仓库的「环境变量」/「凭证管理」入口，
新增一个名字为 `SCFORGE_TOKEN` 的变量（值填 `scf_...`），在流水线里用 `$SCFORGE_TOKEN` 引用即可。
具体菜单位置各版本略有差异，以 <https://help.gitee.com> 的当前说明为准。

几个和 SC 插件相关的注意点：

- **Gitee 的 Release 附件单文件上限 100MB**（GVP 项目 200MB）。SC 插件 DLL 通常几十 KB，远够用。
- 建 Release 的接口是 `POST https://gitee.com/api/v5/repos/{owner}/{repo}/releases`，
  附件另走 `POST .../releases/{release_id}/attach_files`（需带 Gitee 访问令牌）。
- **很多人在用「GitHub 主 + Gitee 镜像」的双仓库模式**：GitHub 上编译发 Release，再把 Release 与附件同步到 Gitee，
  让国内玩家从 Gitee 下载。社区有现成的开源同步动作（搜 `ReleaseSync`）。

> ⚠️ 我们的插件**编译必须在本机完成**（依赖商业游戏的核心 DLL，云端编不出来），
> 所以 Gitee Go 在这里的角色是**"取文件 + 转发"**，不是"编译"。

---

### C. CNB（cnb.cool，腾讯云原生构建）

CNB 的流水线配置是**仓库根目录的 `.cnb.yml`**。

**密钥机制比较特别 —— 叫「密钥仓库」**。CNB 不让把密钥写进普通仓库，而是让你**单独建一个类型为
「密钥仓库」的仓库**，在里面放一个 YAML 文件：

```yaml
# env.yml
SCFORGE_TOKEN: scf_xxxxxxxx
```

然后在 `.cnb.yml` 里用 `imports:` 声明该文件地址，CNB 会**自动把它注入成环境变量**：

```yaml
imports:
  - https://cnb.cool/<你的密钥仓库>/-/blob/main/env.yml
```

之后脚本里直接读 `$SCFORGE_TOKEN` 即可。**`imports` 的确切层级与字段名以 CNB 文档为准**
（<https://docs.cnb.cool> 的「环境变量」与「密钥仓库」两节）。

密钥仓库的安全特性（这是它相对普通变量的优势）：

- **不能被 `git clone` 到本地**、**禁止本地 push** —— 只能在网页上编辑，杜绝误提交
- 页面**动态水印**（截图带用户名）、**引用审计**（记录哪些流水线引用过）
- 可用 `allow_slugs` / `allow_events` / `allow_branches` 精确限制"只允许 tag 事件、只允许指定仓库"引用

其它有用的点：

- CNB 内置了 `${CNB_TOKEN}` / `${CNB_TOKEN_USER_NAME}`，需要调 CNB 自己的接口时**不用另建令牌**。
- CNB 也支持发 Release：`POST {CNB_API_ENDPOINT}/{owner}/{repo}/-/releases` 创建，附件用 `cnbcool/attachments` 插件上传。

---

### 三个平台怎么选

| 场景 | 建议 |
| --- | --- |
| 已经在 GitHub 上 | 就用 GitHub Actions，Secret 配置最简单 |
| 玩家主要在国内、下载慢 | **GitHub 编译发版 + Gitee/CNB 镜像 Release**，玩家从国内站下载 |
| 仓库主体在国内 | CNB（密钥仓库机制最安全）或 Gitee Go |

::: tip 无论选哪个，两件事不变
1. **插件必须在本机编译** —— 云端 runner 没有 Survivalcraft 的核心 DLL。
2. **要上传 SCForge，就得有一个 `scf_` 开头的 Key，并把它放进对应平台的 Secret 里。**
:::

## 发布全景：一次 tag 之后都发生了什么

```
本机：python .buildtools/publish-release.py v1.0.3
  │
  ├─ 1. 编译插件 DLL
  ├─ 2. git commit + tag + push ─────────────────────┐
  ├─ 3. 建 / 复用 GitHub Release                     │（打 tag 会触发 CI）
  ├─ 4. 上传 9 个 DLL 附件                            │
  └─ 5. 转手 publish-to-scforge.py（读同一份清单）    │
        └──────────────▶ SCForge 平台 ◀──────────────┤
                                ▲                    │
                                │                    ▼
                        ┌───────┴────────┐   CI：publish-scforge 作业
                        │ 新建资源 /     │     ├─ 等 Release 附件就绪（轮询）
                        │ 追加版本       │     ├─ 从 Release 加速链接下载 DLL
                        │ 状态 pending   │     └─ 上传到 SCForge
                        │  ← 待人工审核   │
                        └────────────────┘
```

## SCForge 接口速查（自动上传相关的几个）

入口 `https://api.cldery.com`，鉴权 `Authorization: Bearer scf_...`，错误形状 `{"detail": "..."}`。

| 方法与路径 | 作用 |
| --- | --- |
| `GET /scforge/addons/mine` | 我发布的资源（含待审/驳回）—— 脚本靠它对 slug 判断"该建还是该追加版本"。**需要 `read` 作用域** |
| `GET /scforge/addons/{idOrSlug}` | 详情。**接受 slug**，是唯一能由 slug 换到资源 id 的接口 |
| `POST /scforge/addons` | 新建资源（`multipart`），提交后进审核 |
| `POST /scforge/addons/{id}/versions` | 给已有资源追加版本（`multipart`），进审核 |
| `GET /scforge/game-versions` | 受支持的游戏版本枚举，发布表单的取值来源 |
| `GET /scforge/versions/{id}/download` | **对外唯一下载入口**（未审核的版本拿不到） |

::: warning 四个实测踩出来的坑
1. **`publish` 作用域不包含读列表**。只勾 `publish` 的 Key 调 `GET /addons/mine` 会吃 `403
   {"detail":"当前 API Key 缺少「读取」作用域"}`。所以 `publish-to-scforge.py` 做了降级：
   拿不到列表就改走"按 slug 逐个探测"，不强制要求同时勾 `read`。想一次拿全列表就把两个都勾上。
2. **详情响应是包了一层的**：`{"addon": {...}}`，`id` / `slug` / `versions` 都在 `addon` 里面，
   不在顶层。取值要 `resp["addon"]["id"]`。
3. **`/addons/{id}/versions` 的路径参数声明为 `uuid`，不吃 slug**。只有详情端点 `/addons/{idOrSlug}`
   接受 slug。所以"由 slug 追加版本"必须先查详情换 id，不能直接拿 slug 去调 versions。
4. **`DELETE /addons/{id}` 同样只吃 `uuid`**。拿 slug 去删会得到 `404 {"detail":"资源不存在"}`
   （**不是 403**，容易误判成"这个资源没了"）。而且**删资源需要 `manage` 作用域**，
   自助签发的 Key 只有 `read` / `publish`，用它会吃 `403 {"detail":"当前 API Key 缺少「管理」作用域"}`。
   结论：**删除只能走超管** —— 要么在网页后台删，要么让超管签一把带 `manage` 的 Key。
5. **`DELETE` 没有 dry-run，传了 `?dryRun=1` 也照删不误**。不要指望先"试删一下"看看权限够不够 ——
   权限够就直接删掉了。想事先确认目标对不对，**用 `GET /addons/{slug}` 查详情核对**，
   而不是拿真实资源去试探删除端点。
:::

::: tip 公开目录接口匿名可读，善加利用
`GET /scforge/addons`（带 `page` / `pageSize`）**不需要任何凭据**，返回全部已发布资源
（含 `slug` / `name` / `category` / `latestVersion` / `downloads`）。

想知道"平台上现在有哪些资源、某个 slug 存不存在、有没有重复"，用它最省事 ——
`.buildtools/verify-scforge-slugs.py` 就是靠它做的对账，**不依赖 Key，谁都能跑**。
:::

### `POST /scforge/addons` 的字段（`multipart/form-data`，共 23 个）

- **必填**：`Package`（文件）、`Kind`、`Name`、`Slug`、`Summary`、**`Description`**、`Category`、`GameVersion`。
- 元数据：`Name` / `Slug` / `Summary` / `Description` / `Readme` / `Category` / `GameVersion` / `Tags`
  / `SourceUrl` / `IssuesUrl` / `License` / `LicenseUrl` / `DonationUrl` / `DiscordUrl`。
- 首个版本一并提交：`Version` / `Channel`（`release` 或 `beta`）/ `Changelog` / `GameVersions` / `Dependencies`。
- 可选资源图：`Icon`（JPG/PNG/WebP/GIF）、`Gallery`（最多 6 张）。

`POST /scforge/addons/{id}/versions` 的字段：`Package` + `Version` / `Channel` / `Changelog`
/ `GameVersions` / `Dependencies`；`GameVersion` 缺省时沿用资源的主游戏版本。

> **多值字段**：`Tags` / `GameVersions` 在表单里以**同名重复出现**表达多值，
> 不是 JSON 数组字符串。脚本的 `multipart()` 已按此处理。

::: warning 追加版本不会更新标签
`Tags` 只在 `POST /scforge/addons`（新建资源）时被接受。
`POST /scforge/addons/{id}/versions` 只收版本相关字段 ——
**已经存在的资源追加新版本时，标签不会回写**。想改标签只能去后台手改，或删资源重建。
:::

## 上传脚本的行为约定

`publish-to-scforge.py` 的几个关键决定，改的时候要知道原因：

1. **先 `GET /addons/mine` 再决定建/追加**：接口没有"按 slug 查是否已存在"的公开端点，
   只能拉自己的列表在本地比对。批量发布时只拉一次，不是每个插件拉一次。拿不到列表（403）时
   自动降级为"按 slug 逐个探测"。
2. **默认直接用本地 DLL，`--from-url` 才走加速链接**：本机发版时 DLL 就在磁盘上，
   下载一遍纯属浪费。只有 CI 里（没有编译产物）才必须走 URL。
3. **`--with-basic` 是个显式开关**：基础插件不开源、不在 `Assets` 里，
   但偶尔确实想发到平台上，所以留了口子，默认**不带**。
4. **`SCFORGE_TOKEN` 从环境变量读，不写进任何文件**：仓库里 `scforge.env` 是本地文件且已被
   `.gitignore` 挡住，不要把 Key 固化进清单或脚本。
5. **只用标准库**（`urllib` + 手搓 `multipart`）：与仓库其它脚本一致，少一个依赖少一处 CI 意外。
6. **下载带重试**（`attempts=5, delay=10`）：对抗"打 tag 时 CI 比 Release 建得更快"的竞态。

## 排查

| 现象 | 原因 |
| --- | --- |
| CI 日志出现"未配置 SCFORGE_TOKEN，跳过上传" | Secret 名字拼错，或压根没配。回上文「A. GitHub Actions」一节核对 |
| CI 里 `publish-to-scforge.py` 报文件不存在 | 脚本没被 `.gitignore` 白名单放行。`/*` 全忽略模式下，`!/.buildtools/publish-to-scforge.py` 必须显式写上 |
| 平台上少了一个资源，但 CI 全绿 | 该插件在 `Scforge.Items` 里缺配方。自检第 5 项现在会 FAIL，先跑 `check-sources.py` |
| 日志出现「这把 Key 没有「读取」作用域」 | **正常降级，不是错误**。脚本改走逐个探测。想一次拿全列表就重新签发时把 `read` 一起勾上 |
| 上传报 `403` `{"detail":"当前 API Key 缺少「发布」作用域"}` | Key 只勾了 `read`，重新签发一把带 `publish` 的 |
| 上传报 `400 请选择有效的插件分类` | `Category` 填了白名单外的值（比如把"其它"写成 `other`）。正确值见上文「分类与标签」 |
| 上传报 `400 不支持的标签：xxx` | `Tags` 里有非预设词。合法 20 个见上 |
| 上传报 `400 请填写详细描述` | 配方缺 `Description` 字段 |
| 资源改不了 slug | 正常。`Slug` 创建后接口层不允许更改，要换地址只能删资源重建 |
| **平台上同一个插件出现了两份** | 配方里的 slug 与平台上已有的对不上，发版时新建了一份。先跑 `verify-scforge-slugs.py` 确认，再把配方 Slug 改成平台已有的；多出来的那份需**超管**删除（见上文第 4 个坑） |
| 用 slug 调 `DELETE /addons/{slug}` 报"资源不存在" | 删除只吃 `uuid`，不吃 slug。先用 `GET /addons/{slug}` 查出 `id` |
| `DELETE` 报"当前 API Key 缺少「管理」作用域" | 自助 Key 只有 `read`/`publish`，删除必须超管签发带 `manage` 的 Key |
| 想"试删一下"看权限够不够 | **做不到**。DELETE 不支持 dry-run，权限够就真删了。改 `GET /addons/{slug}` 核对目标 |
| 追加版本后标签是空的 | 已知限制，见上文 warning。标签只在创建资源时写入 |
| 上传后平台上看不到 | 正常。资源与版本都要**过审核**才对外可见 |
| 加速链接下载失败 | 脚本会自动退回直连并重试 5 次；若都失败，说明该 tag 的 Release 附件确实不存在 |
| CI 报 `HTTP Error 404` 取不到附件 | 多半是**只推了 tag、没建 Release**。必须用 `publish-release.py` 发版，它会一并建 Release |

### 已实测的完整链路

`v1.0.1`（本机全流程）与 `v1.0.3`（CI 全自动）各跑过一次真实端到端：

```
[1/2] 这把 Key 没有「读取」作用域，改为逐个探测资源是否已存在
      ↓ web-panel.dll（经 加速链接）
  ✓ web-panel        追加版本 v1.0.3（资源已存在）
  ...（9 个插件全部如此）
[2/2] 完成。快照写入 .buildtools/_release-snapshot.json
```

校验结果：9 个资源全部入库、状态 `pending`（待审核）、文件名与字节数正确、分类与标签均按配方写入。
`--only` 接受**插件中文名 / 附件英文名（带不带 `.dll` 都行）/ slug** 三种写法。

> **关键教训**：打 tag 必须走 `publish-release.py`。
> 手搓 `git tag` 只会触发 CI，**不会建 Release**，CI 随后取附件就是 404。

---

# 附录二：插件是怎么编译出来的（AI 助手必读）

> 这一节写给**要在这个仓库里改代码的 AI 助手**。
> 目标是让你第一次就编出正确的产物，而不是"改完发现编不出来 / 编出来是错的"。
>
> 一句话概括：**本机没有 .NET SDK，用的是 Roslyn 的 `csc.dll` 手工编译**；
> 插件与模组的核心程序集引用**正好相反**，写反了不会报错、只会在运行时炸。

## 为什么不能用 `dotnet build` / `msbuild`

| 事实 | 后果 |
| --- | --- |
| 本机 **没有装 .NET SDK**（`dotnet --list-sdks` 为空） | 没有 `dotnet build` 可用 |
| 仓库里**没有 `.csproj` / `.sln`** | 也没有工程文件可供 MSBuild 使用 |

所以编译是靠 **`dotnet exec <csc.dll> @<响应文件>`** 直接驱动编译器：

```
dotnet  ──exec──▶  .buildtools/roslyn/tasks/netcore/bincore/csc.dll  ──@compile.rsp──▶  xxx.dll
```

工具链全部固化在 `.buildtools/` 下（**不在临时目录、不在 C 盘**），
缺什么会从 NuGet 自动下载解压，所以**离线环境第一次跑会失败**、联网后自愈：

| 目录 | 来源 | 用途 |
| --- | --- | --- |
| `roslyn/` | NuGet `microsoft.net.compilers.toolset` | 提供 `csc.dll` |
| `netcore-ref/ref/net10.0/` | NuGet `microsoft.netcore.app.ref` | `net10.0` 参考程序集（`/r:` 用） |
| `core/` | 从 `server-test/` 拷来（可由 `ServerCoreSource` 配置） | **服务端**核心程序集 |
| `client-core/` | 从客户端安装目录拷来 | **客户端**核心程序集 |

## 唯一该记住的一条：引用哪套核心，由"跑在哪"决定

::: warning 这是整个仓库最贵的坑，写反了不报错
| 你要做的东西 | 编译引用 | 理由 |
| --- | --- | --- |
| **插件** `ServerPlugin` | **服务端**核心（`.buildtools/core`） | 只在服务端进程里跑，可以用 `Game.Server.*` |
| **模组** `.netmod` | **客户端**核心（`.buildtools/client-core`） | 客户端**也要加载它**，用了服务端专有类型 → 客户端 `TypeLoadException` **黑屏** |

`LoadDllLogic` 对 mod 里每个程序集调 `assembly.GetTypes()`，**只要有一个类型解析不了，整包跳过**。
所以"模组里引用了服务端专有 API"这种错误，在编译期**不会**报错（因为编译时引用了服务端核心就有这个类型），
要到玩家客户端里才炸 —— 而且崩的是玩家，不是你的构建。
:::

## 两个入口脚本

```powershell
# 插件：按清单批量编译，并自动部署到测试服
powershell -ExecutionPolicy Bypass -File "E:\Microsoft IDEs\repos\sc-plugins\.buildtools\build-plugin.ps1"

# 模组：只编反作弊 mod（引用客户端核心）
powershell -ExecutionPolicy Bypass -File "E:\Microsoft IDEs\repos\sc-plugins\.buildtools\build-anticheat-mod.ps1"
```

## 插件清单：`plugin-builds.json`（新增文件不用改它）

**要编哪些插件、输出到哪、部署到哪，全部由这份 JSON 决定**，脚本里不写死任何路径：

```json
{
  "ServerCoreSource": "server-test",
  "Plugins": [
    {
      "Name": "WebPanel (网页控制台插件：内嵌 HTTP 面板，独立配置)",
      "Source": "网页控制台插件\\源码",
      "Output": "网页控制台插件\\网页控制台插件.dll",
      "DeployTo": "server-test\\Plugins",
      "DeployToAlso": ["server-test2\\Plugins"]
    }
  ]
}
```

| 键 | 说明 |
| --- | --- |
| `Source` | 可以是**单个 `.cs`**，也可以是**目录** —— 目录会**递归展开**成下面所有 `.cs` |
| `Sources` | 多个源文件的数组写法 |
| `Output` | DLL 输出路径（仓库相对） |
| `DeployTo` / `DeployToAlso` | 编完自动拷到哪个 `Plugins\` 目录；支持多个（本机有两个隔离测试服） |
| `DeployAs` | 到目标目录后改名（例如产物叫 `payload.dll`，但要落地成 `xxx插件.dll`） |
| `ServerCoreSource` | 从哪个测试服目录刷新服务端核心程序集 |

::: tip 新增源码文件**不需要**动这份清单
只要 `Source` 指向的是**目录**，新加的 `.cs` 会被自动收进来。
这就是为什么 `基础插件`、`网页控制台插件` 这类多文件插件的 `Source` 写的是目录而不是逐个文件 ——
逐个列举迟早会漏，而漏掉的文件**编译能过、运行时才缺功能**。
:::

::: warning 逻辑并入整合包后，**必须删掉清单条目**
`plugin-builds.json` 里留着已迁移插件的条目，**每次整包构建都会把旧 DLL 重新部署到整合包旁边**，
于是两份同时在跑：同一个钩子注册两个对象、同名命令出现两条、自定义包 ID 冲突。
删 DLL 文件没用，**源头在清单**。已踩过一次（2026-09-28）。
:::

## 目录式源文件的正确用法（多文件插件）

一个插件由多个 `.cs` 组成时，`Source` 写成目录：

- 目录下**所有** `.cs` 会按路径排序后一起编译（排序是为了产物可复现）；
- 目录里**一个 `.cs` 都没有**会直接报错，不会静默产出空 DLL；
- 模块子目录（如 `源码/模块/*.cs`）也会被递归收进来。

## `.ps1` 硬约束：纯 ASCII，或带 UTF-8 BOM

::: warning 中文进 `.ps1` 会静默炸，且报错位置不对
PowerShell 5.1 **在没有 UTF-8 BOM 时按 ANSI 读脚本**。
一旦非 ASCII 字符出现在字符串字面量或路径里，解析会直接失败，
报出莫名其妙的"意外的标记 }"或"字符串缺少终止符" —— 而且**报错行号常常不是真正出错的那一行**。

正确做法：
1. 中文路径/中文名放进 **UTF-8 的 JSON**，让脚本用 `-Encoding UTF8` 读（`plugin-builds.json` 就是这么来的）；
2. 脚本本身保持**纯 ASCII**，或确保带 BOM；
3. 改完任何 `.ps1` 都跑一遍机械闸门：

```powershell
powershell -ExecutionPolicy Bypass -File "E:\Microsoft IDEs\repos\sc-plugins\.buildtools\check-ascii.ps1"
```

它扫 `.buildtools\*.ps1`，纯 ASCII 或带 BOM 判 ok，否则列出字节位置并 `exit 1`。
⚠️ 用编辑器重写一个带 BOM 的脚本会**静默丢掉 BOM** —— "带了 BOM 就安全"只在没人重写它的前提下成立。
:::

## csc 响应文件里的路径必须加引号

工具链和仓库都位于**含空格的路径**下（`E:\Microsoft IDEs\...`）。
响应文件里不加引号，`csc` 会把一个路径拆成两段，报一堆"未能找到元数据文件"。
`build-plugin.ps1` 里已经统一加了引号，并且**用带 BOM 的 UTF-8 写响应文件**，
这样 `csc` 才能正确解码里面的中文源文件路径。

## 编完先自检，再发版

```bash
python .buildtools/check-sources.py
```

它会做 5 项检查（逐字字符串引号配对、`.gitignore` 白名单、敏感文件、README 齐全、SCForge 配方完整性），
**发版前必须全过**。CI 的 `check` 作业跑的就是它。

## 编译完常犯的三个错（按发生频率排）

::: warning 1. 逐字串 `@"..."` 里的 ASCII 双引号
前端代码（HTML/CSS/JS）在这个仓库里是**逐字字符串**内嵌进 C# 的，
里面的每一个 ASCII `"` 都必须写成 `""`。

最常漏的三处：CSS 的 `content:"…"`、属性选择器 `[x="1"]`、以及 **JS 注释里的英文引号**。

**症状极具迷惑性**：一次刷出几百条 `CS1003 / CS1010 / CS1012`，
而且**报错位置全部偏移**（说 1153 行错，实际错在 1152 行）——
**别去数那几百条报错**，直接找最近改过的那段逐字串。

机械校验手法（比肉眼可靠）：把逐字串抽出来还原成完整 JS/CSS，再交给 `node --check`。

```python
import io
src = io.open(r"网页控制台插件/源码/网页前端资源.cs", encoding="utf-8").read()

# 扫全文找 @" ... "（内部 "" 是转义；遇单个 " 结束）
res, i = [], 0
while (a := src.find('@"', i)) >= 0:
    j, buf = a + 2, []
    while j < len(src):
        if src[j] == '"':
            if src[j+1:j+2] == '"':
                buf.append('"'); j += 2; continue
            break
        buf.append(src[j]); j += 1
    res.append(src[a+2:j]); i = j + 1

io.open("panel.js", "w", encoding="utf-8").write("\n".join(res))
```

```bash
node --check panel.js      # 语法过了再数括号配平（{} () []）
```

⚠️ 文件名形如 **`sb.Append(@"...")`** —— 别写成 `AppendJs(@"...")` 去匹配，那是**无参函数名**，一条都匹配不到。
:::

::: warning 2. 值类型的 `null` 判断
`ReadOnlyList<T>` 这类在核心中是 **struct**，不能 `!= null`、不能 `?.`。
其余核心类型陷阱见 `sc-plugins/插件与模组开发注意事项.md`。
:::

::: warning 3. 换行符与文件编码
改完文件用 grep 快速确认没有写进 NUL 字节：
命中输出里出现 `Binary file matches` 就说明文件被写坏了。
:::

## 产物验证：别只看"编译成功"

```powershell
# 反编译看类型是否真的在，比"编译过了"强得多
dotnet .buildtools/ilspy/tools/net8.0/any/ilspycmd.dll -t <类型全名> <某个.dll>
```

⚠️ 注意最后一个参数是 **`.dll`**。另外：**`.NET` 的字符串字面量是 UTF-16LE、类型名/方法名是 UTF-8**，
用错编码搜会**假阴性**；UTF-16 还有**奇偶对齐**问题，两种对齐都要试。

---

## 一页速查（给 AI 助手）

| 我要做的事 | 正确做法 |
| --- | --- |
| 编译插件 | `powershell -File .buildtools\build-plugin.ps1` |
| 编译模组 | `powershell -File .buildtools\build-anticheat-mod.ps1` |
| 新增一个插件 | 建目录 → 写 `.cs` → **在 `plugin-builds.json` 加一条** |
| 给已有插件加一个 `.cs` | **什么都不用改**（`Source` 是目录就自动收） |
| 逻辑并入整合包后 | **删掉 `plugin-builds.json` 里那条** |
| 改了 `.ps1` | 跑 `check-ascii.ps1` |
| 发版前 | 跑 `check-sources.py` |
| 模组里想用 `Game.Server.*` | ❌ 不行，客户端会黑屏；改用服务端插件 |
| 想看某个类型在不在 | `ilspycmd -t <全名> <dll>` |
