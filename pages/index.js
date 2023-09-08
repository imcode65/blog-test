import { useEffect, useState } from "react";
import postsData from "../data/blog.json";
import BlogCard from "./components/card";

export default function BlogList({ initialPosts }) {
  const [blogs, setBlogs] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [blogImages, setBlogImages] = useState({});

  const fetchBlogs = async () => {
    let endpoint = "/api/posts";

    if (searchTerm) {
      endpoint = `/api/search?term=${searchTerm}`;
    } else if (category) {
      endpoint = `/api/filter?category=${category}`;
    }

    const response = await fetch(endpoint);
    const data = await response.json();

    setBlogs(data.slice(currentPage * 12, (currentPage + 1) * 12));
    const initialImages = data.reduce((acc, blog) => {
      acc[blog.id] = blog.imageUrl;
      return acc;
    }, {});
    setBlogImages(initialImages);
  };
  useEffect(() => {
    fetchBlogs();
    setCategories([
      ...new Set(postsData.posts.flatMap((post) => post.categories)),
    ]);
  }, [searchTerm, currentPage, category]);

  const handleImageError = (blogId) => {
    setBlogImages((prev) => ({
      ...prev,
      [blogId]: "https://gcdnb.pbrd.co/images/SgSzCIjZtIrs.jpg?o=1",
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-10 text-center text-blue-700">
          My Blog
        </h1>
        <div className="mb-10 space-y-4">
          <input
            type="text"
            placeholder="Search by title"
            className="block w-full p-4 rounded-md shadow-sm bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full p-4 rounded-md shadow-sm bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              blogImages={blogImages}
              onImageError={handleImageError}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <button
            className="p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          >
            Prev
          </button>
          <button
            className="p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/posts");
  const data = await res.json();
  return {
    props: {
      initialPosts: data.slice(0, 9),
    },
  };
}
