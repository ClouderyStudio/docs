<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

/**
 * 顶部通告条。
 *
 * 高度写死 40px，并在 <html> 上设置 --vp-layout-top-height，
 * 主题的 VPNav / VPSidebar / VPContent / VPDoc / VPLocalNav 都会读它，
 * 顶栏、侧边栏、正文自动让位（这是 VitePress 原生的顶部通告位机制）。
 * 注意：改高度必须同步改 NOTICE_HEIGHT，否则会重叠。
 */
const NOTICE_HEIGHT = '40px'

const visible = ref(true)

let timer: number | undefined

function setTopHeight(value: string) {
  document.documentElement.style.setProperty('--vp-layout-top-height', value)
}

function close() {
  visible.value = false
  window.clearTimeout(timer)
}

watch(
  visible,
  (v) => {
    setTopHeight(v ? NOTICE_HEIGHT : '0px')
  },
  { immediate: true }
)

onUnmounted(() => {
  window.clearTimeout(timer)
  setTopHeight('0px')
})

timer = window.setTimeout(() => {
  visible.value = false
}, 15000)
</script>

<template>
  <Transition name="notice-slide">
    <div v-if="visible" class="notice-bar" role="region" aria-label="站点公告">
      <svg class="notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 11v2a1 1 0 0 0 1 1h2l4 3V7L6 10H4a1 1 0 0 0-1 1z" />
        <path d="M15 8.5a4 4 0 0 1 0 7" />
        <path d="M18 6a7 7 0 0 1 0 12" />
      </svg>
      <p class="notice-text">
        建议你加入群聊哦~ <span class="notice-note">注：心理树洞的群聊不在其中</span>
      </p>
      <a class="notice-link" href="/docs/group.html" @click="close">群聊列表</a>
      <button class="notice-close" type="button" aria-label="关闭公告" @click="close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.notice-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30; /* 与主题顶栏同级；通告条在顶栏上方，两者不重叠 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 40px;
  padding: 0 44px 0 16px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1;
}

.notice-icon {
  flex: none;
  width: 16px;
  height: 16px;
  color: var(--vp-c-brand);
}

.notice-text {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.notice-note {
  margin-left: 6px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.notice-link {
  flex: none;
  color: var(--vp-c-brand);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid var(--vp-c-brand);
  padding-bottom: 1px;
  transition: opacity 0.2s;
}

.notice-link:hover {
  opacity: 0.75;
}

.notice-close {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
}

.notice-close svg {
  width: 14px;
  height: 14px;
}

.notice-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}

.notice-close:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 1px;
}

/* 收起来时高度塌陷，与 --vp-layout-top-height 归零同步，
   顶栏和通告条视觉上是一起收进去的 */
.notice-slide-leave-active {
  transition: height 0.25s ease;
  overflow: hidden;
}

.notice-slide-leave-to {
  height: 0;
  border-bottom-color: transparent;
}

@media (max-width: 768px) {
  .notice-bar {
    font-size: 12.5px;
    padding-right: 40px;
  }

  /* 一行放不下，注释先收起来，主文案和入口保留 */
  .notice-note {
    display: none;
  }
}
</style>
