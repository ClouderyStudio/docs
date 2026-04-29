---
description: 云术工作室导航页面，汇集各类常用链接和资源导航
---

<style src="/.vitepress/theme/styles/nav.css"></style>

<script setup>
import { NAV_DATA } from '/_data/navlinks'
</script>

# 导航
<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

