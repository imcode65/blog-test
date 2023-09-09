"use client";
import Button from "@/components/Button";
import Category from "@/components/Category";
import { Category as ICategory, Post } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/slug?data=${params.slug}`);
      const data: { post: Post; categories: ICategory[] } =
        await response.json();
      if (data) {
        setPost(data.post);
        setCategories(data.categories);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">404</h1>
        <p className="text-2xl">Post not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <Button text="Go back" onClick={goBack} className="mt-4 mb-4 mx-auto" />
        <div className="flex flex-col items-center md:items-start">
          <div
            className="w-full md:w-2/3 lg:w-1/2 h-64 md:h-96 bg-gray-300 rounded-md shadow-lg mb-8"
            style={{
              backgroundImage: `url(${post.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            {post.title}
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>

          <div className="mt-4 mb-8 space-x-2">
            {categories.map((cat) => (
              <Category key={cat.id} text={cat.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
