<template>
  <div>
    Home
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useStore();
   
    return {
    };
  },
});
</script>

<style scoped>
</style>