/**
 * Format date to Vietnamese locale string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Lighten a hex color by a specified percentage
 */
export const lightenColor = (hex: string, percent: number): string => {
  const color = hex.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  const newR = Math.round(r + (255 - r) * (percent / 100));
  const newG = Math.round(g + (255 - g) * (percent / 100));
  const newB = Math.round(b + (255 - b) * (percent / 100));

  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

/**
 * Format date to readable string (US format)
 */
export const formatDateUS = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Generate slug from title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}...`;
};

/**
 * Parse markdown frontmatter
 */
export const parseFrontmatter = (
  content: string
): { frontmatter: Record<string, unknown>; content: string } => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const [, frontmatterString, markdownContent] = match;
  const frontmatter: Record<string, unknown> = {};

  frontmatterString.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      // Try to parse as JSON, fallback to string
      try {
        frontmatter[key.trim()] = JSON.parse(value);
      } catch {
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, ''); // Remove quotes
      }
    }
  });

  return { frontmatter, content: markdownContent };
};

// Export blog-specific utilities
export * from './blogUtils';
