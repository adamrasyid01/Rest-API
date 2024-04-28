const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUsers = async (req,res) => {
    try {
        const user = await prisma.user.findMany();
        res.json(user);
    } catch {
        res.status(500).json({ message: "Server Error" });
    }
}

const addUser = async (req, res) => {
    try {  
        const { username, password } = req.body;
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
            },
        })
        res.send(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const findById = async (req, res) => {
    try {
        const userId = parseInt(req.params.id); 
        const findUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (findUser) {
            return res.status(200).json(findUser);
            
        } else {
            res.status(404).json({ message: 'Tidak ada User dengan Id yang dituju' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const deleteUser = async (req,res) => {
    try {
        const userId = parseInt(req.params.id);
        const deleteid = await prisma.user.delete({
            where: { id: userId }
        })

        res.status(204).json(deleteid);
    } catch (error){
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const updateUser = async (req,res) => {
    try {
        const userId = parseInt(req.params.id);
        const { username, password } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username, password,
            },
        })
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { getUsers, addUser, findById, deleteUser, updateUser };