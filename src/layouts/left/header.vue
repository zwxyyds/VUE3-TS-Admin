<template>
  <a-layout-header
    :style="{
      backgroundColor: '#fff',
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
    }"
  >
    <div class="header-left">
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="setLayoutCol(false)" />
      <menu-fold-outlined v-else class="trigger" @click="setLayoutCol(true)" />
    </div>
    <div class="header-right">
      <!-- <setting /> -->
      <a-dropdown>
        <a class="header-dropdown-link" @click.prevent>
          <a-avatar
            size="small"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
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
      <!-- <a-dropdown>
        <a class="header-dropdown-link" @click.prevent style="margin-right: 8px">
          <global-outlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">CN 简体中文</a-menu-item>
            <a-menu-item key="1">US English</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown> -->
    </div>
  </a-layout-header>
</template>

<script lang="ts">
// import Setting from '../components/setting.vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { computed, defineComponent } from 'vue';
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    // Setting,
  },
  setup() {
    const store = useStore();
    const collapsed = computed(() => {
      return store.state.theme.layoutCollapsed;
    });
    const theme = computed(() => {
      return store.state.theme.config;
    });
    const setLayoutCol = (bool: boolean) => {
      store.dispatch('theme/configLayoutCol', bool);
    };
    const handleLogout = () => {
      store.dispatch('user/logout').then(() => {
        window.location.reload();
      });
    };

    const userInfo = store.state.user.userInfo;

    return {
      handleLogout,
      userInfo,
      theme,
      collapsed,
      setLayoutCol,
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
.header-account-avatar {
  margin-right: 8px;
}
.header-right {
  display: flex;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.trigger:hover {
  color: #1890ff;
}
</style>
