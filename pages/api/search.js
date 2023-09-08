import postsData from '../../data/blog.json';

export default (req, res) => {
    const { term } = req.query;
    const filteredPosts = postsData.posts.filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase())
    );
    res.status(200).json(filteredPosts);
};
