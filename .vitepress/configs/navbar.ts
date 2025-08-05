import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '指引', link: '/docs/', activeMatch: '/docs/' },
    { text: '游戏', link: '/game/', activeMatch: '/game/'},
    { text: '服务', link: '/serve/', activeMatch: '/serve/'},
    { text: '笔墨星河', link: '/bmdocs/', activeMatch: '/bmdocs/'},
    { text: '团队', link: '/team' },
    { text: '导航', link: '/nav/' },
]