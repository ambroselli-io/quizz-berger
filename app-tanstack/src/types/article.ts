export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag?: string;
  content: string;
  schema?: Record<string, unknown>;
}
