<template>
  <a-layout :style="{ height: '100%' }">
    <layout-header />
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <!-- <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb> -->
      <div :style="{ padding: '24px' }" class="app-container">
        <router-view />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }"
      >©2021 Created by zwxE</a-layout-footer
    >
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import LayoutHeader from "./top/header.vue";
export default defineComponent({
  setup() {
    return {
      selectedKeys: ref<string[]>(["4"]),
    };
  },
  components: {
    LayoutHeader,
  },
});
</script>
<style lang="less"></style>
