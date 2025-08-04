---
layout: page
title: 团队
description: 云术工作室的成员们
---

<script setup>
import {
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'
import { core } from './_data/team'
</script>

<VPTeamPageTitle>
  <template #title>认识我们的团队</template>
  <template #lead>
    下面是对一些 Cloudery 团队成员的介绍。
  </template>
</VPTeamPageTitle>
<VPTeamMembers :members="core" />
