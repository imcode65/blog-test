import Link from "next/link";
import { useEffect, useState } from "react";
import postsData from "../data/blog.json";
export default function BlogList({ initialPosts }) {
  const [blogs, setBlogs] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [blogImages, setBlogImages] = useState({});

  const fetchBlogs = () => {
    let filteredPosts = postsData.posts;

    if (searchTerm) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filteredPosts = filteredPosts.filter((post) =>
        post.categories.includes(parseInt(category, 10))
      );
    }

    setBlogs(filteredPosts.slice(currentPage * 12, (currentPage + 1) * 12));

    // Set default images for each blog
    const initialImages = {};
    filteredPosts.forEach((blog) => {
      initialImages[blog.id] = blog.imageUrl;
    });
    setBlogImages(initialImages);
  };

  useEffect(() => {
    fetchBlogs();
    setCategories([
      ...new Set(postsData.posts.flatMap((post) => post.categories)),
    ]);
  }, [searchTerm, currentPage, category]);

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
            <Link key={blog.id} href={`/post/${blog.slug}`} passHref>
              <div className="group">
                <div className="h-[400px] transition-all duration-300 transform bg-white p-4 rounded-lg shadow hover:shadow-xl hover:scale-105 overflow-hidden">
                  <div className="h-[200px] overflow-hidden relative">
                    <img
                      src={blogImages[blog.id]}
                      alt={blog.title}
                      className="absolute top-0 left-0 w-full h-full transition-transform duration-300 transform group-hover:scale-110 object-cover"
                      onError={() => {
                        setBlogImages((prev) => ({
                          ...prev,
                          [blog.id]:
                            "https://gcdnb.pbrd.co/images/SgSzCIjZtIrs.jpg?o=1",
                        }));
                      }}
                    />
                  </div>
                  <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
                  <p className="text-gray-600 mt-2">{blog.excerpt}</p>
                </div>
              </div>
            </Link>
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
  return {
    props: {
      initialPosts: postsData.posts.slice(0, 9),
    },
  };
}
