import postsData from "../../data/blog.json";
import type { NextApiRequest, NextApiResponse } from "next";

export default function hander(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;

  if (!category) {
    return res.status(404).json({ message: "Not Found" });
  }

  if (typeof category === "string") {
    const filteredPosts = postsData.posts.filter((post) =>
      post.categories.includes(parseInt(category, 10)),
    );
    res
      .status(200)
      .json({ posts: filteredPosts, categories: postsData.categories });
  }
}
