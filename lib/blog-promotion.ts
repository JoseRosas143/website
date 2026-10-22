import type { BlogPost } from "./site-content";
export type BlogTeaser = Pick<BlogPost, "id" | "title" | "slug" | "excerpt" | "category" | "imageUrl" | "publishedAt">;
export function publishedTeasers(posts: BlogPost[]): BlogTeaser[] {
  const seen = new Set<string>();
  return posts.filter((post) => post.published && typeof post.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(post.slug))
    .sort((a,b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0))
    .filter((post) => { if (seen.has(post.slug)) return false; seen.add(post.slug); return true; })
    .slice(0,4).map(({id,title,slug,excerpt,category,imageUrl,publishedAt})=>({id,title,slug,excerpt,category,imageUrl,publishedAt}));
}
export function teasersForPage(posts: BlogTeaser[], pathname: string) {
  return posts.filter((post) => pathname.replace(/\/$/, "") !== `/blog/${post.slug}`).slice(0,3);
}
