// composables/useGet.ts
import { ref } from 'vue';
import { AxiosRequestConfig } from 'axios';
import api from '@/composables/api';

export function useGet<T = unknown>(url: string, config?: AxiosRequestConfig) {
  const data = ref<T | null>(null);
  const error = ref<unknown>(null);
  const loading = ref(false);

  const fetch = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get<T>(url, config);
      data.value = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetch };
}
