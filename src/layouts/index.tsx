import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';


export default defineComponent({
    name: 'GlobalLayout',
    setup() {
        const store = useStore();

        const layout = computed(() => {
            return 'left'
            // return store.state.theme.layout;
        });

        const layoutTarget = {
            left: '<div>left</div>',
            basic: '<div>basic</div>',
        } as Record<string, any>;

        return () => layoutTarget[layout.value];
    },
})