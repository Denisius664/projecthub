// composables/usePost.ts
import { ref } from 'vue';
import { AxiosRequestConfig } from 'axios';
import api from '@/composables/api';

export function usePost<T = unknown, B = any>(url: string, config?: AxiosRequestConfig) {
    const data = ref<T | null>(null);
    const error = ref<unknown>(null);
    const loading = ref(false);

    const send = async (body: B) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await api.post<T>(url, body, config);
            data.value = response.data;
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    };

    return { data, error, loading, send };
}
