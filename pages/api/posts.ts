import postsData from "../../data/blog.json";
import type { NextApiRequest, NextApiResponse } from "next";

export default function hander(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(postsData);
}
