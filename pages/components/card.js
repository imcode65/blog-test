import Link from "next/link";
import BlogCategory from "./category";

export default function BlogCard({ blog, blogImages, onImageError }) {
  return (
    <Link href={`/post/${blog.slug}`} passHref>
      <div className="group">
        <div className="h-[400px] transition-all duration-300 transform bg-white p-4 rounded-lg shadow hover:shadow-xl hover:scale-105 overflow-hidden">
          <div className="h-[200px] overflow-hidden relative -m-4 mb-4">
            <img
              src={blogImages[blog.id]}
              alt={blog.title}
              className="absolute top-0 left-0 w-full h-full transition-transform duration-300 transform group-hover:scale-110 object-cover"
              onError={() => onImageError(blog.id)}
            />
          </div>
          <div className="space-x-2">
            {blog.categories.map((cat) => (
              <BlogCategory key={cat} category={cat} />
            ))}
          </div>
          <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
          <p className="text-gray-600 mt-2 line-clamp-3 text-ellipsis">
            {blog.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
