import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import LeftMenuLayout from './LeftMenuLayout.vue';
import TopMenuLayout from './TopMenuLayout.vue';
export default defineComponent({
    name: 'GlobalLayout',
    setup() {
        const store = useStore();

        const layout = computed(() => {
            return store.state.theme.layout;
        });

        const layoutTarget = {
            left: <LeftMenuLayout />,
            top: <TopMenuLayout />,
        } as Record<string, any>;

        return () => layoutTarget[layout.value];
    },
})