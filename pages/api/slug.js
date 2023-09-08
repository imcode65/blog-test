import postsData from '../../data/blog.json';

export default (req, res) => {
    const slug = req.query.data;
    console.log(slug)
    const post = postsData.posts.find(p => p.slug === slug);

    if (!post) {
        return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(post);
};
