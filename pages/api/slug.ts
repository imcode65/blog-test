import postsData from "../../data/blog.json";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.data;
  const post = postsData.posts.find((p) => p.slug === slug);

  if (!post) {
    return res.status(404).json({ message: "Not Found" });
  }
  const parsePostCategories = post.categories.map((category) => {
    return postsData.categories.find((c) => c.id === category);
  });

  res.status(200).json({ post: post, categories: parsePostCategories });
}
