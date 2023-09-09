import postsData from "../../data/blog.json";
import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { term } = req.query;
  if (!term) {
    return res.status(404).json({ message: "Not Found" });
  }
  if (typeof term === "string") {
    const filteredPosts = postsData.posts.filter((post) =>
      post.title.toLowerCase().includes(term.toLowerCase()),
    );
    res
      .status(200)
      .json({ posts: filteredPosts, categories: postsData.categories });
  }
}
