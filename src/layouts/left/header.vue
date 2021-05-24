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
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="setLayoutCol(false)"
      />
      <menu-fold-outlined v-else class="trigger" @click="setLayoutCol(true)" />
    </div>
    <div class="header-right">
      <user-setting />
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import UserSetting from "../components/UserSetting.vue";
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserSetting,
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
      store.dispatch("theme/configLayoutCol", bool);
    };

    const userInfo = store.state.user.userInfo;

    return {
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
