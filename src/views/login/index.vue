<template>
  <div class="main">
    <a-form id="formLogin" layout="vertical" class="user-layout-login">
      <a-tabs
        :active-key="customActiveKey"
        :tab-bar-style="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert
            v-if="isLoginError"
            type="error"
            show-icon
            style="margin-bottom: 24px"
            message="账户或密码错误"
          />
          <a-form-item v-bind="validateInfos.username">
            <a-input
              size="large"
              v-model:value="modelRef.username"
              placeholder="账户: admin"
              style="width: 100%"
            >
              <template #prefix>
                <user-outlined class="prefixIcon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item v-bind="validateInfos.password">
            <a-input-password
              v-model:value="modelRef.password"
              size="large"
              placeholder="密码: 123456"
            >
              <template #prefix>
                <lock-outlined class="prefixIcon" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="loginBtn"
          @click="handleSubmit"
        >
          确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { notification } from "ant-design-vue";
import { Form } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const useForm = Form.useForm;
export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      customActiveKey: "tab1",
      loginBtn: false,
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      time: 60,
      smsSendBtn: false,
    });

    const modelRef = reactive({
      rememberMe: true,
      username: "",
      password: "",
    });
    const rulesRef = reactive({
      rememberMe: undefined,
      username: [
        { required: true, message: "请输入帐户名或邮箱地址", type: "string" },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          type: "string",
          trigger: ["blur", "change"],
        },
      ],
    });
    const { validateInfos, validate } = useForm(modelRef, rulesRef);

    const loginSuccess = (name: string) => {
      router.push({ path: "/" });
      setTimeout(() => {
        notification.success({
          message: `Hi! ${name}`,
          description: "Welcome back",
        });
      }, 1000);
      state.isLoginError = false;
    };

    const handleSubmit = (e: Event) => {
      e.preventDefault();
      const validateNames =
        state.customActiveKey === "tab1"
          ? ["username", "password"]
          : ["mobile", "captcha"];
      state.loginBtn = true;
      validate(validateNames)
        .then(async (values) => {
          const res = await store.dispatch(`user/login`, {
            ...values,
          });
          state.loginBtn = false;
          if (res.code === 200) {
            loginSuccess(res.data?.name);
          }
        })
        .catch((/*err*/) => {
          // 屏蔽错误处理
          // requestFailed(err);
          state.loginBtn = false;
        });
    };
    return {
      ...toRefs(state),
      modelRef,
      validateInfos,
      handleSubmit,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
  .forge-password {
    font-size: 14px;
  }
  button.login-button {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    font-size: 16px;
  }
  .user-login-other {
    margin-top: 24px;
    line-height: 22px;
    text-align: left;
    .item-icon {
      margin-left: 16px;
      color: @disabled-color;
      font-size: 24px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: @primary-color;
      }
    }
    .register {
      float: right;
    }
  }
  .prefixIcon {
    color: @primary-color;
    font-size: @font-size-base;
  }
}
</style>
