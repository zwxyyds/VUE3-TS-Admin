<template>
  <div>
    <a-layout>
      <a-layout-header
        :style="{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          padding: 0,
          'justify-content': 'space-between',
        }"
        theme="dark"
      >
        <a-menu
          theme="dark"
          mode="horizontal"
          v-model:selectedKeys="selectedKeys"
          :style="{ lineHeight: '64px', transition: 'auto' }"
        >
          <!-- defaultRoutes -->
          <template v-for="item in defaultRoutes">
            <template v-if="item.children.length">
              <a-sub-menu :key="item.path">
                <template #title>
                  <span @click="handleLink(item.path)">
                    {{ item.meta.title }}
                  </span>
                </template>
                <a-menu-item
                  v-for="childItem in item.children"
                  :key="childItem.path"
                  @click="handleLink(childItem.path)"
                >
                  {{ childItem.meta.title }}
                </a-menu-item>
              </a-sub-menu>
            </template>
            <template v-else>
              <a-menu-item :key="item.menuId" @click="handleLink(item.path)">
                <span class="nav-text">{{ item.name }}</span>
              </a-menu-item>
            </template>
          </template>
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
        <div class="header-right">
          <user-setting />
        </div>
      </a-layout-header>
    </a-layout>
  </div>
</template>

<script lang="ts">
import UserSetting from "../components/UserSetting.vue";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { defaultRoutes } from "@/router";
export default defineComponent({
  components: { UserSetting },
  setup() {
    const store = useStore();
    const router = useRouter();
    const theme = computed(() => {
      return store.state.theme.config;
    });
    const handleLink = (link: string) => {
      if (link.indexOf("http") === -1) {
        router.push(link);
      } else {
        window.open(link);
      }
    };

    return {
      defaultRoutes,
      handleLink,
      theme,
      UserSetting,
    };
  },
});
</script>

<style lang="less">
.top-theme {
  width: 250px;
}
.header-right {
  display: flex;
  span {
    color: #1890ff;
  }
}
</style>
