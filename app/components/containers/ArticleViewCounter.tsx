'use client';

import { useEffect, useRef } from 'react';
import { buildApiUrl, getApiHeaders } from '../../config/api';

interface ArticleViewCounterProps {
  articleId: string | number;
  documentId?: string;
}

export default function ArticleViewCounter({
  articleId,
  documentId,
}: ArticleViewCounterProps) {
  const hasUpdated = useRef(false);

  useEffect(() => {
    // Only update once per component mount
    if (hasUpdated.current) return;

    const updateViewCount = async () => {
      try {
        // Use documentId if available, otherwise use id
        const identifier = documentId || articleId;
        const isDocId =
          typeof identifier === 'string' && identifier.includes('-');

        // First, get current article to fetch current view count and publishedAt
        let getUrl: string;
        if (isDocId) {
          getUrl = `${buildApiUrl('/api/articles')}?filters[documentId][$eq]=${identifier}&fields[0]=views&fields[1]=publishedAt`;
        } else {
          getUrl = `${buildApiUrl('/api/articles')}/${identifier}?fields[0]=views&fields[1]=publishedAt`;
        }

        const getResponse = await fetch(getUrl, {
          method: 'GET',
          headers: getApiHeaders(),
          cache: 'no-store',
        });

        if (!getResponse.ok) {
          throw new Error(`Failed to fetch article: ${getResponse.statusText}`);
        }

        const getData = await getResponse.json();
        // Handle both array response (from filters) and single object response
        const article = Array.isArray(getData?.data)
          ? getData.data[0]
          : getData?.data || null;

        if (!article) {
          throw new Error('Article not found');
        }

        const currentViews = article.views || 0;
        const newViews = currentViews + 1;
        const publishedAt = article.publishedAt;

        // Update view count
        const updateUrl = `${buildApiUrl('/api/articles')}/${identifier}`;

        const updateResponse = await fetch(updateUrl, {
          method: 'PUT',
          headers: {
            ...getApiHeaders(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              views: newViews,
              ...(publishedAt && { publishedAt }),
            },
          }),
          cache: 'no-store',
        });

        if (!updateResponse.ok) {
          // Try with query parameter if path failed (for documentId)
          if (isDocId && updateResponse.status === 404) {
            const queryUrl = `${buildApiUrl('/api/articles')}?documentId=${identifier}`;
            const retryResponse = await fetch(queryUrl, {
              method: 'PUT',
              headers: {
                ...getApiHeaders(),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                data: {
                  views: newViews,
                  ...(publishedAt && { publishedAt }),
                },
              }),
              cache: 'no-store',
            });

            if (!retryResponse.ok) {
              throw new Error(
                `Failed to update view count: ${retryResponse.statusText}`
              );
            }
          } else {
            throw new Error(
              `Failed to update view count: ${updateResponse.statusText}`
            );
          }
        }

        hasUpdated.current = true;
      } catch (error) {
        // Silently handle errors - don't show to user
        console.error('Error updating article view count:', error);
      }
    };

    updateViewCount();
  }, [articleId, documentId]);

  // This component doesn't render anything
  return null;
}
