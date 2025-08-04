import { defineConfig } from 'vitepress'
import renderPermaLink from './render-perma-link'
import MarkDownItCustomAnchor from './markdown-it-custom-anchor'

const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'Vite'
const ogUrl = 'https://vitejs.dev'

export default defineConfig({
  title: 'ClouderyDoc',
  description: '云术工作室文档站',
  lang: 'zh-CN',
  lastUpdated: true,
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

  themeConfig: {
    logo: '/logo.svg',

    outline: {
      label: '本页目录'
    },

    search: {
      provider: 'algolia',
      options: {
        appId: '3YZHUFB0YW',
        apiKey: 'f507a2c72af2a8e3e22f9646dc3682a2',
        indexName: 'doc_cldery_com_3yzhufb0yw_pages',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
              },
            },
          },
        },
      },
    },

    socialLinks: [
    ],

    footer: {
      copyright:
        'Copyright &copy; 2022-2025 Cloudery, Std.'
    },

    nav: [
      { text: '指引', link: '/docs/', activeMatch: '/docs/' },
      { text: '游戏', link: '/game/', activeMatch: '/game/'},
      { text: '服务', link: '/serve/', activeMatch: '/serve/'},
      { text: '笔墨星河', link: '/bmdocs/', activeMatch: '/bmdocs/'},
      { text: '团队', link: '/team' },
      { text: '导航', link: '/nav/' },
    ],
    
    sidebar: {
      '/docs/': [
        {
          text: '指引&信息&其它',
          items: [
            {
                text: '开始',
                link: '/docs/'
            },
            {
                text: '歌单',
                link: '/docs/MusicList.md',
            },
            {
                text: '捐赠',
                link: '/docs/donate.md',
            }
          ],
        },
      ],
      '/serve/': [
        {
          text: '服务',
          items: [
            {
                text: '简言',
                link: '/serve/'
            },
            {
                text: '云术二级域名接口协议',
                link: '/serve/domapi.md',
            },
            {
                text: '云术论坛用户协议',
                link: '/serve/BbsRules.md',
            },
          ],
        },
      ],
      '/game/': [
        {
          text: '游戏服务',
          items: [
            {
              text: '开始',
              link: '/game/'
            },
            {
              text: '竹像素MC服务器',
              link: 'https://www.zhuxs.cn/rules',
            },
            {
              text: '云术生存战争服务器',
              link: '/game/sc/',
              items: [
                  {
                      text: '游戏守则',
                      link: '/game/sc/GameRules.md',
                  },
                  {
                      text: '群聊规则',
                      link: '/game/sc/GroupRules.md',
                  }
                  ]
            },
            {
              text: '幸存者危城',
              link: '/game/xczwc/',
              items: [
                  {
                      text: '疑难杂症解决',
                      link: '/game/xczwc/FAQ.md',
                  },
                  {
                      text: '游戏攻略',
                      link: '/game/xczwc/strategy.md',
                  },
                  {
                      text: '游戏攻略(旧版)',
                      link: '/game/xczwc/StrategyOld.md',
                  },
                  {
                      text: '新手专项网路攻略(旧版)',
                      link: '/game/xczwc/NewbieWayStrate.md',
                  },
                  {
                      text: 'Mod版',
                      link: '/game/xczwc/mod.md',
                  },
                  {
                      text: 'Lua',
                      link: '/game/xczwc/script.md',
                  },
                  {
                      text: '共享账号',
                      link: '/game/xczwc/SharedAccount.md',
                  },
                  {
                      text: '代理定制',
                      link: '/game/xczwc/HelpToGet.md',
                  },
                  {
                      text: '鸣谢名单',
                      link: '/game/xczwc/thanks.md',
                  },
                  {
                      text: '免责声明',
                      link: '/game/xczwc/disclaimer.md',
                  }
                  ]
            }
          ],
        },
      ],
      '/bmdocs/': [
        {
          text: '笔墨星河',
          items: [
            {
                text: '开始',
                link: '/bmdocs/'
            },
            {
              text: 'api配置',
              link: '/bmdocs/api/',
              items: [
                {
                    text: 'deepseek',
                    link: '/bmdocs/api/deepseek.md',
                },
                {
                    text: '硅基流动',
                    link: '/bmdocs/api/siliconflow.md',
                },
                {
                    text: 'OpenRouter(默认模型)',
                    link: '/bmdocs/api/OpenRouter.md',
                },
                {
                    text: 'gemini',
                    link: '/bmdocs/api/gemini.md',
                },
                {
                    text: 'bigmodel(智谱)',
                    link: '/bmdocs/api/bigmodel.md',
                },
                {
                    text: 'ollama',
                    link: '/bmdocs/api/ollama.md',
                }
              ]
            },
            {
              text: '下载',
              link: '/bmdocs/download/',
              items: [
                {
                    text: '使用介绍',
                    link: '/bmdocs/download/introduction.md',
                },
                {
                    text: '预览版',
                    link: '/bmdocs/download/preview.md',
                }
              ]
            },
            {
              text: 'ai参考输出实例',
              link: '/bmdocs/example/',
              items: [
                {
                    text: 'DeepSeek V3',
                    link: '/bmdocs/example/deepseekv3.md',
                },
                {
                    text: 'DeepSeek R1',
                    link: '/bmdocs/example/deepseekr1.md',
                },
                {
                    text: 'Gemini 2.0 Flash',
                    link: '/bmdocs/example/gemini2f.md',
                },
                {
                    text: 'Gemini 2.5 Pro Preview 05-06',
                    link: '/bmdocs/example/gemini25p05-06.md',
                },
                {
                    text: 'Gemini 2.5 Flash Preview 05-20',
                    link: '/bmdocs/example/gemini25fp05-20.md',
                },
                {
                    text: 'ChatGML(智谱)',
                    link: '/bmdocs/example/chatgml.md',
                },
                {
                    text: 'Qwen3-235B-A22B',
                    link: '/bmdocs/example/qwen3-235b-a22b.md',
                }
              ]
            }
          ],
        },
      ]
    }
  },
})
