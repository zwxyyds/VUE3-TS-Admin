<template>
  <div class="page-container">
    <div class="page-header">
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar
            size="large"
            :src="currentUser.avatar"
          />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix() }}，{{ currentUser.name }}
            <span class="welcome-text">，祝你开心每一天</span>
          </div>
          <div>前端工程师 | {{ currentUser.deptName }}</div>
        </div>
      </div>
      <div class="extra-content">
        <div class="stat-item">
          <a-statistic title="项目数" :value="56" />
        </div>
        <div class="stat-item">
          <a-statistic title="团队内排名" :value="8" suffix="/ 24" />
        </div>
      </div>
    </div>
    <a-row :gutter="24">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          class="project-list"
          style="margin-bottom: 24px"
          :bordered="false"
          title="进行中的项目"
          :body-style="{ padding: 0 }"
        >
          <template #extra>
            <a>全部项目</a>
          </template>
          <div>
            <a-card-grid
              class="project-card-grid"
              :key="i"
              v-for="(item, i) in projects"
            >
              <a-card :bordered="false" :body-style="{ padding: 0 }">
                <a-card-meta>
                  <template #title>
                    <div class="card-title">
                      <a-avatar size="small" :src="item.cover" />
                      <a>{{ item.title }}</a>
                    </div>
                  </template>
                  <template #description>
                    <div class="card-description">
                      {{ item.description }}
                    </div>
                  </template>
                </a-card-meta>
                <div class="project-item">
                  <a href="/#/">科学搬砖组</a>
                  <span class="datetime">9小时前</span>
                </div>
              </a-card>
            </a-card-grid>
          </div>
        </a-card>

        <a-card title="动态" :bordered="false">
          <a-list>
            <a-list-item :key="index" v-for="(item, index) in activities">
              <a-list-item-meta>
                <template #avatar>
                  <a-avatar :src="item.user.avatar" />
                </template>
                <template #title>
                  <div>
                    <span>{{ item.user.nickname }}</span>
                    &nbsp; 在&nbsp;
                    <a href="#">{{ item.project.name }}</a>
                    &nbsp;
                    <span>{{ item.project.action }}</span>
                    &nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                </template>
                <template #description>
                  <div>{{ item.time }}</div>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col
        style="padding: 0 12px"
        :xl="8"
        :lg="24"
        :md="24"
        :sm="24"
        :xs="24"
      >
        <a-card
          title="快速开始 / 便捷导航"
          style="margin-bottom: 24px"
          :bordered="false"
          :body-style="{ padding: 0 }"
        >
          <div class="item-group">
            <a>操作一</a>
            <a>操作二</a>
            <a>操作三</a>
            <a>操作四</a>
            <a>操作五</a>
            <a>操作六</a>
            <a-button size="small" type="primary" ghost>添加</a-button>
          </div>
        </a-card>
        <a-card
          title="XX 指数"
          style="margin-bottom: 24px"
          :bordered="false"
          :body-style="{ padding: 0 }"
        >
          <div style="min-height: 400px" id="container"></div>
        </a-card>
        <a-card title="团队" :bordered="false">
          <div class="members">
            <a-row>
              <a-col :span="12" v-for="(item, index) in teams" :key="index">
                <a>
                  <a-avatar size="small" :src="item.avatar" />
                  <span class="member">{{ item.name }}</span>
                </a>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";

const data = [
  { item: "Design", a: 70, b: 30 },
  { item: "Development", a: 60, b: 70 },
  { item: "Marketing", a: 50, b: 60 },
  { item: "Users", a: 40, b: 50 },
  { item: "Test", a: 60, b: 70 },
  { item: "Language", a: 70, b: 50 },
  { item: "Technology", a: 50, b: 40 },
  { item: "Support", a: 30, b: 40 },
  { item: "Sales", a: 60, b: 40 },
  { item: "UX", a: 50, b: 60 },
];

function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? "早上好"
    : hour <= 11
    ? "上午好"
    : hour <= 13
    ? "中午好"
    : hour < 20
    ? "下午好"
    : "晚上好";
}
export default defineComponent({
  setup() {
    const store = useStore();
    const currentUser = store.state.user.userInfo;
    onMounted(() => {
      const { DataView } = DataSet;
      const dv = new DataView().source(data);
      dv.transform({
        type: "fold",
        fields: ["a", "b"], // 展开字段集
        key: "user", // key字段
        value: "score", // value字段
      });

      const chart = new Chart({
        container: "container",
        autoFit: true,
      });
      chart.data(dv.rows);
      chart.scale("score", {
        min: 0,
        max: 80,
      });
      chart.coordinate("polar", {
        radius: 0.8,
      });
      chart.tooltip({
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          line: {
            style: {
              lineDash: [4, 4],
              stroke: "#333",
            },
          },
        },
      });
      chart.axis("item", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      });
      chart.axis("score", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: "line",
            style: {
              lineDash: null,
            },
          },
        },
      });

      chart.line().position("item*score").color("user").size(2);
      chart
        .point()
        .position("item*score")
        .color("user")
        .shape("circle")
        .size(4)
        .style({
          stroke: "#fff",
          lineWidth: 1,
          fillOpacity: 1,
        });
      chart.area().position("item*score").color("user");
      chart.render();
    });
    return {
      timeFix,
      currentUser,
      activities: [
        {
          id: 1,
          user: {
            nickname: "科学家",
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          },
          project: {
            name: "白鹭酱油开发组",
            action: "更新",
            event: "番组计划",
          },
          time: "2018-08-23 14:47:00",
        },
        {
          id: 1,
          user: {
            nickname: "尿尿",
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
          },
          project: {
            name: "白鹭酱油开发组",
            action: "更新",
            event: "番组计划",
          },
          time: "2018-08-23 09:35:37",
        },
        {
          id: 1,
          user: {
            nickname: "玛卡巴卡",
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          },
          project: {
            name: "白鹭酱油开发组",
            action: "创建",
            event: "番组计划",
          },
          time: "2017-05-27 00:00:00",
        },
        {
          id: 1,
          user: {
            nickname: "有点东西",
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          },
          project: {
            name: "高逼格设计天团",
            action: "更新",
            event: "六月迭代",
          },
          time: "2018-08-23 14:47:00",
        },
        {
          id: 1,
          user: {
            nickname: "阿爸阿爸",
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          },
          project: {
            name: "高逼格设计天团",
            action: "created",
            event: "六月迭代",
          },
          time: "2018-08-23 14:47:00",
        },
        {
          id: 1,
          user: {
            nickname: "唔系底细",
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          },
          project: {
            name: "高逼格设计天团",
            action: "created",
            event: "六月迭代",
          },
          time: "2018-08-23 14:47:00",
        },
      ],
      projects: [
        {
          id: 1,
          cover:
            "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
          title: "Alipay",
          description: "那是一种内在的东西， 他们到达不了，也无法触及的",
          status: 1,
          updatedAt: "2018-07-26 00:00:00",
        },
        {
          id: 2,
          cover:
            "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
          title: "Angular",
          description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
          status: 1,
          updatedAt: "2018-07-26 00:00:00",
        },
        {
          id: 3,
          cover:
            "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
          title: "Ant Design",
          description: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
          status: 1,
          updatedAt: "2018-07-26 00:00:00",
        },
        {
          id: 4,
          cover:
            "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
          title: "Ant Design Pro",
          description: "那时候我只会想自己想要什么，从不想自己拥有什么",
          status: 1,
          updatedAt: "2018-07-26 00:00:00",
        },
        {
          id: 5,
          cover:
            "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
          title: "Bootstrap",
          description: "凛冬将至",
          status: 1,
          updatedAt: "2018-07-26 00:00:00",
        },
        {
          id: 6,
          cover:
            "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
          title: "Vue",
          description: "生命就像一盒巧克力，结果往往出人意料",
          status: 1,
          updatedAt: "2018-07-26 00:00:00",
        },
      ],
      teams: [
        {
          id: 1,
          name: "科学搬砖组",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        },
        {
          id: 2,
          name: "程序员日常",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
        },
        {
          id: 1,
          name: "设计天团",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
        },
        {
          id: 1,
          name: "中二少女团",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
        },
        {
          id: 1,
          name: "骗你学计算机",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
        },
      ],
    };
  },
});
</script>

<style lang="less">
.project-list {
  .card-title {
    font-size: 0;
    a {
      color: @text-color;
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: @text-color;
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: @text-color;
      display: inline-block;
      flex: 1 1 0;
      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: @text-color;
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: @text-color;
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}
.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: @text-color;
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}
.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: @text-color;
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}
.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }
  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }
  .headerContent .title .welcome-text {
    display: none;
  }
}
.clearfix() {
  zoom: 1;
  &::before,
  &::after {
    display: table;
    content: " ";
  }
  &::after {
    clear: both;
    height: 0;
    font-size: 0;
    visibility: hidden;
  }
}
.page-header {
  display: flex;
  justify-content: space-between;
  padding: 24px;
  margin-bottom: 20px;
  background-color: @component-background;
}
.page-header-content {
  display: flex;

  .avatar {
    flex: 0 1 72px;

    & > span {
      display: block;
      width: 72px;
      height: 72px;
      border-radius: 72px;
    }
  }

  .content {
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    color: @text-color-secondary;
    line-height: 22px;

    .content-title {
      margin-bottom: 12px;
      color: @heading-color;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
.extra-content {
  .clearfix();
  float: right;
  white-space: nowrap;

  .stat-item {
    position: relative;
    display: inline-block;
    padding: 0 32px;

    > p:first-child {
      margin-bottom: 4px;
      color: @text-color-secondary;
      font-size: @font-size-base;
      line-height: 22px;
    }

    > p {
      margin: 0;
      color: @heading-color;
      font-size: 30px;
      line-height: 38px;

      > span {
        color: @text-color-secondary;
        font-size: 20px;
      }
    }

    &::after {
      position: absolute;
      top: 8px;
      right: 0;
      width: 1px;
      height: 40px;
      background-color: @border-color-split;
      content: "";
    }

    &:last-child {
      padding-right: 0;

      &::after {
        display: none;
      }
    }
  }
}
</style>
