<template>
  <a-dropdown>
    <a class="header-dropdown-link" @click.prevent>设置</a>
    <template #overlay>
      <a-menu>
        <a-sub-menu key="layout" title="布局">
          <a-menu-item key="0" @click="handleLayout('left')"
            >左布局</a-menu-item
          >
          <a-menu-item key="1" @click="handleLayout('top')">上布局</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </template>
  </a-dropdown>

  <a-dropdown>
    <a class="header-dropdown-link" @click.prevent>
      <a-avatar
        size="small"
        :src="userInfo.avatar"
        class="header-account-avatar"
      />
      <span>{{ userInfo.name }}</span>
    </a>
    <template #overlay>
      <a-menu class="ant-pro-dropdown-menu" :selected-keys="[]">
        <a-menu-item key="center">个人中心</a-menu-item>
        <a-menu-item key="settings">个人设置</a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout" @click="handleLogout">退出登录</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const userInfo = store.state.user.userInfo;
    const handleLogout = () => {
      store.dispatch("user/logout").then(() => {
        window.location.reload();
      });
    };

    const handleLayout = (layoutType: string) => {
      store.state.theme.layout = layoutType;
    };

    return {
      handleLogout,
      handleLayout,
      userInfo,
    };
  },
});
</script>

<style lang="less">
.header-dropdown-link {
  padding: 0 12px;
  transition: background-color ease 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.025);
  }
  span {
    color: @text-color;
  }
}
</style>
