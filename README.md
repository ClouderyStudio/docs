# ClouderyDocs 文档站开发指南

本文档旨在指导开发者如何为 ClouderyDocs 文档站添加新内容，包括修改配置文件、创建新的 Markdown 文档以及更新导航结构。

## 项目结构概述

ClouderyDocs 是一个基于 [VitePress](https://vitepress.dev/) 构建的静态文档站点。项目的主要结构如下：

```
docs/
├── .vitepress/          # VitePress 配置目录
│   ├── config.ts        # 主配置文件
│   ├── configs/         # 配置模块
│   │   ├── index.ts     # 配置导出文件
│   │   ├── navbar.ts    # 顶部导航栏配置
│   │   └── sidebar.ts   # 侧边栏导航配置
│   └── theme/          # 主题自定义文件
├── docs/               # 指引文档
├── game/               # 游戏服务文档
├── serve/              # 服务文档
├── bmdocs/             # 笔墨星河文档
├── learn/              # 学习文档
├── nav/                # 导航页面
└── public/             # 静态资源
```

## 添加新内容的步骤

### 1. 确定内容所属分类

首先确定你的新内容属于哪个分类：
- **指引文档** (`/docs/`) - 工作室介绍、群聊信息、捐赠等
- **游戏服务** (`/game/`) - 游戏服务器相关文档
- **服务** (`/serve/`) - 云术提供的服务文档
- **笔墨星河** (`/bmdocs/`) - AI 工具相关文档
- **学习** (`/learn/`) - 学习资料
- **导航** (`/nav/`) - 导航页面

### 2. 创建 Markdown 文档

在对应的目录下创建新的 Markdown 文件。例如，要添加一个新的游戏服务器文档：

```bash
# 在 game/ 目录下创建新文件
touch game/new-server/index.md
```

Markdown 文件的基本格式：

```markdown
---
sidebar_position: 1  # 侧边栏中的排序位置（可选）
---

# 文档标题

## 二级标题

文档内容...

::: tip 提示
这是一个提示框
:::

::: warning 警告
这是一个警告框
:::

::: danger 危险
这是一个危险框
:::
```

### 3. 更新侧边栏配置

侧边栏配置位于 [`.vitepress/configs/sidebar.ts`](.vitepress/configs/sidebar.ts)。你需要根据新文档的路径更新对应的侧边栏项。

#### 示例：添加新游戏服务器文档

假设你在 `/game/new-server/` 目录下创建了文档，需要在侧边栏中添加对应的导航项：

```typescript
// 在 sidebar.ts 中找到 '/game/' 配置块
'/game/': [
  {
    text: '游戏服务',
    items: [
      {
        text: '开始',
        link: '/game/'
      },
      // ... 现有项目 ...
      {
        text: '新游戏服务器',  // 侧边栏显示名称
        link: '/game/new-server/',  // 文档路径
        items: [  // 可选：子项目
          {
            text: '服务器规则',
            link: '/game/new-server/rules.md'
          },
          {
            text: '安装指南',
            link: '/game/new-server/installation.md'
          }
        ]
      }
    ]
  }
]
```

#### 侧边栏配置结构说明

- `text`: 在侧边栏中显示的文本
- `link`: 点击后跳转的路径（相对于根目录）
- `items`: 子项目数组，用于创建嵌套导航
- `activeMatch`: 自动匹配当前活动页面的正则表达式（通常自动处理）

### 4. 更新顶部导航栏（可选）

如果需要将新分类添加到顶部导航栏，修改 [`.vitepress/configs/navbar.ts`](.vitepress/configs/navbar.ts)：

```typescript
export const nav: DefaultTheme.Config['nav'] = [
    { text: '指引', link: '/docs/', activeMatch: '/docs/' },
    { text: '游戏', link: '/game/', activeMatch: '/game/'},
    { text: '服务', link: '/serve/', activeMatch: '/serve/'},
    { text: '笔墨星河', link: '/bmdocs/', activeMatch: '/bmdocs/'},
    { text: '新分类', link: '/new-category/', activeMatch: '/new-category/'}, // 新增
    { text: '团队', link: '/team' },
    { text: '导航', link: '/nav/' },
]
```

### 5. 添加图片资源

如果需要使用图片，将图片文件放在 `public/pictures/` 目录下，然后在 Markdown 中使用：

```markdown
![图片描述](/pictures/图片文件名.png)
```

### 6. 使用特殊组件

项目支持以下 VitePress 扩展功能：

#### 自定义锚点
```markdown
## 标题 {#custom-id}
```

#### 代码组
````markdown
::: code-group

```js [JavaScript]
console.log('Hello World')
```

```python [Python]
print('Hello World')
```

:::
````

#### 提示框
```markdown
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险提示
:::
```

## 开发工作流

### 本地开发

1. 安装依赖：
   ```bash
   pnpm install
   ```

2. 启动开发服务器：
   ```bash
   pnpm dev
   ```

3. 在浏览器中访问 `http://localhost:5173` 查看效果。

### 构建生产版本

```bash
pnpm build
```

构建后的文件位于 `.vitepress/dist/` 目录。

### 预览构建结果

```bash
pnpm serve
```

## 最佳实践

1. **文件命名**：使用小写字母和连字符，如 `api-configuration.md`
2. **目录结构**：相关文档放在同一目录下，使用 `index.md` 作为目录首页
3. **侧边栏排序**：使用 `sidebar_position` frontmatter 控制排序
4. **链接使用**：使用相对路径时注意当前文件位置，或使用绝对路径（以 `/` 开头）
5. **图片优化**：图片尺寸不宜过大，建议使用 WebP 格式
6. **代码示例**：为代码块指定语言以便语法高亮

## 常见问题

### Q: 添加了新文档但在侧边栏中看不到？
A: 检查 `sidebar.ts` 中的路径是否正确，确保链接路径与文件实际路径一致。

### Q: 图片无法显示？
A: 确认图片路径是否正确，图片是否已放置在 `public/pictures/` 目录下。

### Q: 如何添加新的文档分类？
A: 需要：
   1. 创建新的目录（如 `/new-category/`）
   2. 在 `sidebar.ts` 中添加新的配置块
   3. 可选：在 `navbar.ts` 中添加顶部导航项

### Q: 如何设置文档在侧边栏中的顺序？
A: 在 Markdown 文件的 frontmatter 中添加 `sidebar_position` 属性：
   ```yaml
   ---
   sidebar_position: 2
   ---
   ```

## 相关配置文件

- [`.vitepress/config.ts`](.vitepress/config.ts) - 主配置文件
- [`.vitepress/configs/sidebar.ts`](.vitepress/configs/sidebar.ts) - 侧边栏配置
- [`.vitepress/configs/navbar.ts`](.vitepress/configs/navbar.ts) - 顶部导航栏配置
- [`package.json`](package.json) - 项目依赖和脚本

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 CC BY-NC-ND 4.0 许可证。详情请参阅项目根目录的许可证文件。

---

*最后更新: 2026-01-01*