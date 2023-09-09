"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { Category, Post } from "@/types";

export default function Page() {
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [CurrentPage, SetCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogImages, setBlogImages] = useState(
    {} as {
      [key: number]: string;
    },
  );
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchBlogs = async () => {
      let endpoint = "/api/posts";

      if (searchTerm) {
        endpoint = `/api/search?term=${searchTerm}`;
      } else if (category) {
        endpoint = `/api/filter?category=${category}`;
      }

      const response = await fetch(endpoint);
      const data: { posts: Post[]; categories: Category[] } =
        await response.json();

      const posts = data.posts;
      setTotalItems(posts.length || 0);
      setBlogs(
        posts.slice(
          CurrentPage * itemsPerPage,
          (CurrentPage + 1) * itemsPerPage,
        ),
      );
      const initialImages = posts.reduce(
        (acc: { [key: number]: string }, blog) => {
          acc[blog.id] = blog.imageUrl;
          return acc;
        },
        {},
      );
      setBlogImages(initialImages);
      setCategories(data.categories);
    };
    fetchBlogs();
  }, [searchTerm, CurrentPage, category, itemsPerPage]);

  const handleImageError = (blogId: number) => {
    setBlogImages((prev) => ({
      ...prev,
      [blogId]: "https://gcdnb.pbrd.co/images/SgSzCIjZtIrs.jpg?o=1",
    }));
  };

  return (
    <>
      <div className="mb-10 space-y-4">
        <input
          type="text"
          placeholder="Search by title"
          className="block w-full p-4 rounded-lg font-bold text-2xl shadow-sm bg-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full p-4 rounded-md shadow-sm bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {totalPages != 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {blogs.map((blog) => (
            <Card
              id={blog.id}
              key={blog.id}
              title={blog.title}
              description={blog.excerpt}
              category={blog.categories}
              image={blogImages[blog.id]}
              slug={`/blog/${blog.slug}`}
              onImageError={() => handleImageError(blog.id)}
              getCategoryName={(id) => {
                const cat = categories.find((cat) => cat.id === id);
                return cat ? cat.name : "";
              }}
            />
          ))}
        </div>
      )}

      {totalPages === 0 && (
        <p className="text-xl text-center">No results found.</p>
      )}
      {totalPages != 0 && (
        <div className="flex justify-between items-center">
          <button
            disabled={CurrentPage === 0}
            className="p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-500 disabled:cursor-not-allowed"
            onClick={() => SetCurrentPage((prev) => Math.max(prev - 1, 0))}
          >
            Prev
          </button>

          <span className="text-xl font-semibold">
            Page {CurrentPage + 1} of {totalPages}
          </span>
          <div className="inline-flex space-x-4">
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                SetCurrentPage(0);
              }}
              className="block w-full p-4 rounded-md shadow-sm bg-white"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="30">30 per page</option>
            </select>

            <button
              disabled={CurrentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
              className="p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-500 disabled:cursor-not-allowed"
              onClick={() => SetCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
