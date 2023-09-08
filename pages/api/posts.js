import postsData from '../../data/blog.json';

export default (req, res) => {
    res.status(200).json(postsData.posts);
};
