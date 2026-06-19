import { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config['sidebar'] = {
      '/docs/': [
        {
          text: '指引&信息&其它',
          items: [
            {
                text: '开始',
                link: '/docs/'
            },
            {
                text: '群聊',
                link: '/docs/group.md',
            },
            {
                text: '捐赠',
                link: '/docs/donate.md',
            },
            {
                text: '歌单',
                link: '/docs/MusicList.md',
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
            {
                text: '共享后台群规',
                link: '/serve/HeartTreeHoleGroupRules.md',
            },
            {
                text: '共享后台群规细纲',
                link: '/serve/HeartTreeHoleDetailedRules.md',
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
              link: '/game/mc/',
              items: [
                {
                  text: "服规",
                  link: 'https://zhuxs.cn/rules'
                },
                // W.I.P
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
                  }
                  ]
            },
            {
              text: '环世界 RimWorld',
              link: '/game/rimworld/',
              items: [
                  {
                      text: 'Rimtalk 配置指南',
                      link: '/game/rimworld/index.md',
                  },
                  {
                      text: 'RimTalk 生成失败解决',
                      link: '/game/rimworld/errors.md',
                  },
                  {
                      text: 'RimTalk 提示词与常识库',
                      link: '/game/rimworld/prompts.md',
                  }
              ]
            },
            {
              text: 'Astral 联机工具',
              link: '/game/astral/',
              items: [
                  {
                      text: 'Astral 下载与联机',
                      link: '/game/astral/index.md',
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
                text: '笔墨星河Q&A问答',
                link: 'https://www.kdocs.cn/l/cakYivHfb2bj'
            },
            {
              text: 'api配置',
              link: '/bmdocs/api/',
              items: [
                {
                    text: 'api代理地址(专业)',
                    link: '/bmdocs/api/ApiProxy.md',
                },
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
                    text: 'Gemini',
                    link: '/bmdocs/api/gemini.md',
                },
                {
                    text: 'BigModel(智谱)',
                    link: '/bmdocs/api/bigmodel.md',
                },
                {
                    text: 'TokenHub',
                    link: '/bmdocs/api/tokenhub.md',
                },
                {
                    text: 'ModelScope',
                    link: '/bmdocs/api/modelscope.md',
                },
                {
                    text: 'Ollama',
                    link: '/bmdocs/api/ollama.md',
                },
                {
                    text: '阿里百炼',
                    link: '/bmdocs/api/bailian.md',
                },
                {
                    text: 'ZenMux',
                    link: '/bmdocs/api/zenmux.md',
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
                },
                {
                    text: 'DeepSeek V4 Flash',
                    link: '/bmdocs/example/deepseek-v4-flash.md',
                },
                {
                    text: 'DeepSeek V4 Flash（无思考）',
                    link: '/bmdocs/example/deepseek-v4-flash-nothink.md',
                },
                {
                    text: 'DeepSeek V4 Pro',
                    link: '/bmdocs/example/deepseek-v4-pro.md',
                },
                {
                    text: 'DeepSeek V4 Pro（无思考）',
                    link: '/bmdocs/example/deepseek-v4-pro-nothink.md',
                }
              ]
            }
          ],
        },
      ]
    }
