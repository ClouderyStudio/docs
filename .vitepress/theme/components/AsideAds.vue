<template>
  <a class="viteconf" href="https://cldery.com" target="_blank">
    <img width="22" height="22" src="/main.png" />
    <span>
      <p class="extra-info">云术工作室官网正式投入使用</p>
      <p class="heading">Cloudery</p>
      <p class="extra-info">快来捧个场!</p>
    </span>
  </a>
  <a class="viteconf" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">
    <img width="22" height="22" src="/cc-by-nc-nd.png" />
    <span>
      <p class="extra-info">本网站使用</p>
      <p class="heading">CC BY-NC-ND 协议</p>
      <p class="extra-info">详情点击查看</p>
    </span>
  </a>
</template>

<style>
.viteconf {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 14px;
  padding-left: 2.5rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  position: relative;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-bg-alt);
  transition: border-color 0.5s;
}
.viteconf:hover {
  border: 2px solid var(--vp-c-brand-light);
}
.viteconf img {
  position: absolute;
  left: 1.5rem;
  transition: transform 0.5s;
  transform: scale(1.25);
}
.viteconf:hover img {
  transform: scale(1.75);
}
.viteconf .heading {
  background-image: linear-gradient(
    120deg,
    #b047ff 16%,
    var(--vp-c-brand-lighter),
    var(--vp-c-brand-lighter)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.viteconf .extra-info {
  color: var(--vp-c-text-1);
  opacity: 0;
  font-size: 0.7rem;
  padding-left: 0.1rem;
  transition: opacity 0.5s;
}
.viteconf:hover .extra-info {
  opacity: 0.9;
}
</style>
