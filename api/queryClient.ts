import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 2 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
