import { useRouter } from 'next/router';
import postsData from '../../data/blog.json';
export default function BlogPost() {
    const router = useRouter();
    const { slug } = router.query;

    const post = postsData.posts.find(p => p.slug === slug);

    if (!post) return <p className="container mx-auto p-4 text-xl text-center">Loading...</p>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex flex-col items-center md:items-start">
                <div
                    className="w-full md:w-2/3 lg:w-1/2 h-64 md:h-96 bg-gray-300 rounded-md shadow-lg mb-8"
                    style={{ backgroundImage: `url(${post.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
                ></div>

                <h2 className="text-3xl md:text-4xl font-semibold mb-4">{post.title}</h2>

                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>

                <div className="mt-4 mb-8">
                    <span className="text-xl font-semibold">Categories:</span>
                    {post.categories.map(cat => (
                        <span key={cat} className="ml-2 text-sm bg-blue-100 text-blue-700 p-1 px-2 rounded-md shadow">Category {cat}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}