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

  locales: {
    root: { label: '简体中文' },
  },

  themeConfig: {
    logo: '/logo.svg',

    outline: {
      label: '本页目录'
    },

    socialLinks: [
    ],



    // Using WwAds for China
    // carbonAds: {
    //   code: 'CEBIEK3N',
    //   placement: 'vitejsdev',
    // },

    footer: {
      copyright:
        'Copyright 2022-2024 Cloudery , Std.'
    },

    nav: [
      { text: '指引', link: '/docs/', activeMatch: '/docs/' },
      { text: '游戏', link: '/game/', activeMatch: '/game/'},
      { text: '服务', link: '/serve/', activeMatch: '/serve/'},
      { text: '团队', link: '/team' },
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
                text: '小说栏',
                link: '/docs/xiaoshuo.md',
            },
            {
                text: '歌单',
                link: '/docs/gedan.md',
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
              text: '云竹网路服务器',
              link: '/game/mc/',
              items: [
                  {
                      text: '游戏守则',
                      link: '/game/mc/GameRules.md',
                  },
                  {
                      text: '群聊规则',
                      link: '/game/mc/GroupRules.md',
                  }
                  ]
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
                  },
                  {
                      text: '保险规范',
                      link: '/game/sc/insurance.md',
                  },
                  {
                      text: '举报制度',
                      link: '/game/sc/report.md',
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
                      link: '/game/xczwc/strategy_old.md',
                  },
                  {
                      text: '新手专项网路攻略(旧版)',
                      link: '/game/xczwc/newbie_way_strate.md',
                  },
                  {
                      text: '攻略版',
                      link: '/game/xczwc/cracked.md',
                  },
                  {
                      text: '脚本',
                      link: '/game/xczwc/script.md',
                  },
                  {
                      text: '共享账号',
                      link: '/game/xczwc/fenxiang.md',
                  },
                  {
                      text: '代刷',
                      link: '/game/xczwc/daishua.md',
                  },
                  {
                      text: '鸣谢名单',
                      link: '/game/xczwc/mingxie.md',
                  },
                  {
                      text: '免责声明',
                      link: '/game/xczwc/mianze.md',
                  }
                  ]
            }
          ],
        },
      ],
    }
  },
})
