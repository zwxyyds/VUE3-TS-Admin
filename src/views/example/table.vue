<template>
  <a-table :columns="columns" :data-source="dataList">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #customTitle>
      <span>
        <smile-outlined />
        Name
      </span>
    </template>
    <template #tags="{ text: tags }">
      <span>
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
    </template>
    <template #action="{ record }">
      <span>
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link">
          More actions
          <down-outlined />
        </a>
      </span>
    </template>
  </a-table>
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref } from "vue";
import { GetTableList } from "@/api/table/index";
import { TableInfo } from "@/api/table/typing";

const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle", customRender: "name" },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    slots: { customRender: "tags" },
  },
  {
    title: "Action",
    key: "action",
    slots: { customRender: "action" },
  },
];

export default defineComponent({
  setup() {
    const dataList = ref<Partial<TableInfo[]>>([]);
    //获取表格数据
    const getTableList = async () => {
      const params = {
        pageSize: 0,
        pageNum: 10,
      };
      const res = await GetTableList(params);
      if (res.code === 200) {
        dataList.value = res.data.list;
      }
    };

    onMounted(() => {
      getTableList();
    });
    return {
      dataList,
      columns,
      GetTableList,
    };
  },
  components: {
    SmileOutlined,
    DownOutlined,
  },
});
</script>
