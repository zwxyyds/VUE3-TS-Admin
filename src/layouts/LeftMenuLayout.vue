<template>
  <a-layout :style="{ height: '100%' }">
    <layout-sider />
    <a-layout>
      <layout-header />
      <a-layout-content
        style="margin: 24px 16px 0; overflow-y: auto; overflow-x: hidden"
      >
        <div class="app-container">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }"
        >©2021 Created by zwx</a-layout-footer
      >
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import LayoutHeader from "./left/header.vue";
import LayoutSider from "./left/sider.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      selectedKeys: ref<string[]>(["4"]),
    };
  },
  components: {
    LayoutHeader,
    LayoutSider,
  },
});
</script>
<style></style>
