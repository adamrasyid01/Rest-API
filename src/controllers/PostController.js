const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPosts = async (req, res) => {
    try {
        const posts = await prisma.$queryRaw`
            SELECT p.id, p.title, p.content, p.published, u.username as author
            FROM Post p
            INNER JOIN User u ON p.authorId = u.id
        `;
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const addPost = async (req, res) => {
    try {
        const { title, content, published, authorId } = req.body;
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                published,
                authorId,
            },
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const findPostById = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const foundPost = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (foundPost) {
            res.status(200).json(foundPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        await prisma.post.delete({
            where: { id: postId }
        });

        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, content, published } = req.body;

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                content,
                published,
            },
        });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { getPosts, addPost, findPostById, deletePost, updatePost };
