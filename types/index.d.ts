export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};
