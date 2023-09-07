import Link from "next/link";

export default function BlogCard({ blog, blogImages, onImageError }) {
  return (
    <Link href={`/post/${blog.slug}`} passHref>
      <div className="group">
        <div className="h-[400px] transition-all duration-300 transform bg-white p-4 rounded-lg shadow hover:shadow-xl hover:scale-105 overflow-hidden">
          <div className="h-[200px] overflow-hidden relative">
            <img
              src={blogImages[blog.id]}
              alt={blog.title}
              className="absolute top-0 left-0 w-full h-full transition-transform duration-300 transform group-hover:scale-110 object-cover"
              onError={() => onImageError(blog.id)}
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
          <p className="text-gray-600 mt-2">{blog.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
