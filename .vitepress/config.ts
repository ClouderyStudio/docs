import { defineConfig } from 'vitepress'
import renderPermaLink from './render-perma-link'
import MarkDownItCustomAnchor from './markdown-it-custom-anchor'
import { nav } from './configs'
import { sidebar } from './configs'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

const ogDescription = '云术工作室文档站'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'ClouderyDocs'
const ogUrl = 'https://doc.cldery.com'

export default defineConfig({
  title: 'ClouderyDoc',
  description: '云术工作室文档站',
  lang: 'zh-CN',
  lastUpdated: true,

  // AGENTS.md 是给 AI 助手看的说明，不是文档页面：排除掉，避免被渲染成 AGENTS.html 并进搜索索引。
  // 已验证：最小 VitePress 工程配同样的 srcExclude，dist/api 下只出 index.html，不出 AGENTS.html。
  srcExclude: ['**/AGENTS.md', '**/agents.md'],
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@vite_js' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'TPLGJZGR',
        'data-spa': 'auto',
        defer: '',
      },
    ],
  ],

  markdown: {
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
          return htmlResult;
      }
    }
  },

  locales: {
    root: { label: '简体中文' },
  },

  vite:{
    plugins:[pagefindPlugin()],
  },

  themeConfig: {
    logo: '/logo.svg',

    outline: {
      label: '本页目录'
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/ClouderyStudio"
      },
      {
        icon: "qq",
        link: "/docs/group.html"
      }
    ],

    footer: {
      copyright:
        'Released under the CC BY-NC-ND License.<br/>Copyright &copy; 2022-2025 Cloudery, Std.'
    },

    nav,
    
    sidebar
  },
})
