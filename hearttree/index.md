---
title: 心理树洞
description: 云术心理树洞——群规、机器人D酱、脑电波、栖所、心理测评量表与心理委员提醒
---

<style src="/.vitepress/theme/styles/hearttree.css"></style>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

function onCardClick(e) {
  const card = e.target.closest('.ht-card[href^="tel:"]')
  if (!card) return
  e.preventDefault()
  const tel = card.getAttribute('href')
  const label = card.querySelector('.ht-card-tel')?.textContent || tel
  if (window.confirm(`确定要拨打 ${label} 吗？`)) {
    window.location.href = tel
  }
}

onMounted(() => document.addEventListener('click', onCardClick))
onBeforeUnmount(() => document.removeEventListener('click', onCardClick))
</script>

# 心理树洞

::: warning 本群群规 请认真观看并遵守
- [共享后台群规](HeartTreeHoleGroupRules.md)
- [群聊细纲](HeartTreeHoleDetailedRules.md)
:::

## 机器人 伊蕾娜

- 可以在群聊和私信聊天
- 可以 `@` 或引用她的信息触发聊天

## 相关工具

<div class="ht-cards">
  <a class="ht-card" href="https://a.cldery.com/gh/mood-tab" target="_blank" rel="noopener">
    <div class="ht-card-title">脑电波</div>
    <div class="ht-card-desc">多功能情绪记录软件，支持安卓设备与越狱苹果设备（建群文件脑电波文件夹）。选择最新版本下载 apk 安装。</div>
    <div class="ht-card-link">a.cldery.com/gh/mood-tab →</div>
  </a>
  <a class="ht-card" href="https://pt.cldery.com" target="_blank" rel="noopener">
    <div class="ht-card-title">心理测评量表</div>
    <div class="ht-card-desc">想知道自己目前的情况？来试试吧。</div>
    <div class="ht-card-link">pt.cldery.com →</div>
  </a>
  <a class="ht-card" href="https://qisoul.cldery.com" target="_blank" rel="noopener">
    <div class="ht-card-title">栖所</div>
    <div class="ht-card-desc">多功能心理平台。建议用脑电波软件打开，或是使用浏览器打开。</div>
    <div class="ht-card-link">qisoul.cldery.com →</div>
  </a>
</div>

## 群号

目前已有群聊：

- `1058196769`
- `1070244694`
- `736569950`
- `1098763670`

## 心理援助热线 📞

*轻触号码卡片会弹出确认提示，确认后进入拨号界面。*

<div class="ht-cards">
  <a class="ht-card" href="tel:4001619995">
    <div class="ht-card-title">希望24热线</div>
    <div class="ht-card-tel">400-161-9995</div>
    <div class="ht-card-desc">全国心理危机干预热线，24小时服务</div>
  </a>
  <a class="ht-card" href="tel:01082951332">
    <div class="ht-card-title">北京心理危机研究与干预中心</div>
    <div class="ht-card-tel">010-82951332</div>
    <div class="ht-card-desc">专业心理危机干预服务</div>
  </a>
  <a class="ht-card" href="tel:12355">
    <div class="ht-card-title">青少年心理援助热线</div>
    <div class="ht-card-tel">12355</div>
    <div class="ht-card-desc">共青团青少年服务台</div>
  </a>
</div>

