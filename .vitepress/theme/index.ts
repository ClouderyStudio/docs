import { h, onMounted, watch, nextTick } from 'vue'
import { inBrowser, useData, useRoute } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import Theme from 'vitepress/theme'
import DefaultLayout from './DefaultLayout.vue'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import ArticleMetadata from './components/ArticleMetadata.vue'
import MNavlinks from './components/MNavlinks.vue'
import SvgImage from './components/SvgImage.vue'
import mediumZoom from 'medium-zoom';
import { NProgress } from 'nprogress-v2/dist/index.js'
import 'nprogress-v2/dist/index.css'

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
    app.component('MNavlinks' , MNavlinks)
    app.component('SvgImage' , SvgImage)

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
