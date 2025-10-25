import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Create axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    // Ensure authorization header is always set
    if (process.env.NEXT_PUBLIC_STRAPI_TOKEN) {
      config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  response => response.data,
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      throw new Error(
        `API Error: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from server');
    } else {
      // Something else happened
      throw new Error(error.message || 'An error occurred');
    }
  }
);

// Generic API function
const apiFetch = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return apiClient.get<T>(url, config) as unknown as T;
};

// Query Keys
export const queryKeys = {
  all: ['api'] as const,
  blogs: () => [...queryKeys.all, 'blogs'] as const,
  blog: (id: string) => [...queryKeys.blogs(), id] as const,
  partners: () => [...queryKeys.all, 'partners'] as const,
  news: () => [...queryKeys.all, 'news'] as const,
  newsItem: (id: string) => [...queryKeys.news(), id] as const,
} as const;

// Blog Hooks
export const useBlogs = () => {
  return useQuery({
    queryKey: queryKeys.blogs(),
    queryFn: () => apiFetch('/api/blogs?populate=*'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: queryKeys.blog(id),
    queryFn: () => apiFetch(`/api/blogs/${id}?populate=*`),
    enabled: !!id,
  });
};

// Partners Hooks
export const usePartners = () => {
  return useQuery({
    queryKey: queryKeys.partners(),
    queryFn: () => apiFetch('/api/partners?populate=*'),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// News Hooks
export const useNews = () => {
  return useQuery({
    queryKey: queryKeys.news(),
    queryFn: () => apiFetch('/api/news?populate=*'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useNewsItem = (id: string) => {
  return useQuery({
    queryKey: queryKeys.newsItem(id),
    queryFn: () => apiFetch(`/api/news/${id}?populate=*`),
    enabled: !!id,
  });
};

// Contact Form Mutation
export const useContactForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    }) => apiClient.post('/api/contacts', { data }),
    onSuccess: () => {
      // Invalidate related queries if needed
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};

// Newsletter Subscription Mutation
export const useNewsletterSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) =>
      apiClient.post('/api/newsletters', { data: { email } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};

// Utility hook for prefetching
export const usePrefetchBlog = () => {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.blog(id),
      queryFn: () => apiFetch(`/api/blogs/${id}?populate=*`),
    });
  };
};

export const usePrefetchNewsItem = () => {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.newsItem(id),
      queryFn: () => apiFetch(`/api/news/${id}?populate=*`),
    });
  };
};
