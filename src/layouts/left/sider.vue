<template>
  <a-layout-sider v-model:collapsed="collapsed">
    <div class="logo">
      <img src="@/assets/logo.png" />
      <h1 v-show="!collapsed">V3 ADMIN</h1>
    </div>
    <a-menu
      mode="inline"
      theme="dark"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
    >
      <!-- defaultRoutes -->
      <template v-for="item in defaultRoutes">
        <template v-if="item.children.length">
          <a-sub-menu :key="item.path">
            <template #title>
              <!-- <appstore-outlined /> -->
              <component :is="getIcon(item.meta.icon)" />
              <span>
                {{ item.meta.title }}
              </span>
            </template>
            <a-menu-item
              v-for="childItem in item.children"
              :key="childItem.path"
              @click="(e) => handleLink(e, childItem.path)"
            >
              <appstore-outlined />
              <span>{{ childItem.meta.title }}</span>
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item
            :key="item.menuId"
            @click="(e) => handleLink(e, item.path)"
          >
            <appstore-outlined />
            <span class="nav-text">{{ item.name }}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, defineComponent, ref, onMounted } from "vue";
import { defaultRoutes } from "@/router";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    AppstoreOutlined,
  },
  setup() {
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);
    const collapsed = computed(() => {
      return useStore().state.theme.layoutCollapsed;
    });
    const router = useRouter();
    const route = useRoute();

    const handleLink = (e: MouseEvent, link: string) => {
      if (link.indexOf("http") === -1) {
        router.push(link);
      } else {
        window.open(link);
      }
      e.stopPropagation?.();
    };

    const getIcon = (icon: string) => {
      return icon;
    };

    onMounted(() => {
      selectedKeys.value = [route.path];
      openKeys.value = [route.matched[0].path];
    });

    return {
      collapsed,
      handleLink,
      defaultRoutes,
      selectedKeys,
      openKeys,
      getIcon,
    };
  },
});
</script>


<style lang="less">
.ant-menu-item,
.ant-menu-submenu {
  text-align: left;
}

.logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 16px;
  line-height: 32px;
  h1,
  img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  h1 {
    color: #fff;
    margin: 0 0 0 12px;
    overflow: hidden;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
  }
}
</style>