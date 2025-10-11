/**
 * Calculate reading time for a given text
 * Based on average reading speed of 200 words per minute
 */
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Format reading time as "X min read"
 */
export const formatReadingTime = (minutes: number): string => {
  return `${minutes} min read`;
};

/**
 * Format date in Medium style (e.g., "Jan 15, 2024")
 */
export const formatMediumDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Generate a slug from a heading text
 */
export const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Parse markdown content to extract headings for TOC
 */
export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

export const parseTocFromMarkdown = (content: string): TocItem[] => {
  const lines = content.split('\n');
  const toc: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);
    if (!headingMatch) continue;

    const level = headingMatch[1].length;
    const text = headingMatch[2].trim();
    const id = generateHeadingId(text);

    const item: TocItem = {
      id,
      text,
      level,
    };

    if (level === 2) {
      toc.push(item);
      stack.length = 0; // Clear stack for H2
      stack.push(item);
    } else if (level === 3 && stack.length > 0) {
      // Add as child of the last H2
      if (!stack[0].children) {
        stack[0].children = [];
      }
      stack[0].children.push(item);
    }
  }

  return toc;
};
