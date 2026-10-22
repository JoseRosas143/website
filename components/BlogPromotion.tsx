import { getSiteContent } from "@/lib/storage";
import { publishedTeasers } from "@/lib/blog-promotion";
import { BlogPromotionCards } from "./BlogPromotionCards";
export async function BlogPromotion() {
  const content = await getSiteContent();
  return <BlogPromotionCards posts={publishedTeasers(content.blog)} />;
}
