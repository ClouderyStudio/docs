import { h, onMounted, watch, nextTick } from 'vue'
import { inBrowser, useData, useRoute } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import Theme from 'vitepress/theme'
import DefaultLayout from './DefaultLayout.vue'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import ArticleMetadata from './components/ArticleMetadata.vue'
import MNavLinks from './components/MNavLinks.vue'
import mediumZoom from 'medium-zoom';
import { NProgress } from 'nprogress-v2/dist/index.js'
import 'nprogress-v2/dist/index.css'
import { theme as openApiTheme, useTheme as useOpenApiTheme } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'

export default {
  ...Theme,
  Layout: () => {
    const props: Record<string, any> = {}
    const { frontmatter } = useData()
    if (frontmatter.value.layoutClass !== null) {
      props.class = frontmatter.value.layoutClass
    }
    return h(DefaultLayout, props)
  },
  enhanceApp({ app , router }) {
    app.component('ArticleMetadata' , ArticleMetadata)
    app.component('MNavLinks' , MNavLinks)

    // /api/ 分区用 vitepress-openapi 渲染 OpenAPI 文档（见 api/scforge.md 的 <OASpec />）。
    // 先设好中文文案，再注册 OA* 组件：openApiTheme.enhanceApp 内部读的就是这份全局配置。
    useOpenApiTheme({ i18n: { locale: 'zh' } })
    openApiTheme.enhanceApp({ app } as any)

    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start()
      }
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
        NProgress.done()
      }
    }
  },
  setup() {
    const { frontmatter } = useData();
    const route = useRoute();

    // giscus
    giscusTalk({
      repo: 'ClouderyStudio/docs',
      repoId: 'R_kgDOMDgnhw',
      category: 'General',
      categoryId: 'DIC_kwDOMDgnh84Ctw-_',
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      true
    );

    // mediumZoom
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  }
}
