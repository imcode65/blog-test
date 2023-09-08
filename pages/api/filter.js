import postsData from '../../data/blog.json';

export default (req, res) => {
    const { category } = req.query;
    const filteredPosts = postsData.posts.filter(post => 
        post.categories.includes(parseInt(category, 10))
    );
    res.status(200).json(filteredPosts); 
};
