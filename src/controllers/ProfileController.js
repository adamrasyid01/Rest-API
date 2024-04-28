const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProfile = async (req, res) => {
    try {
        const profiles = await prisma.$queryRaw`
            SELECT p.id, p.email, p.name, p.address, p.phone, u.username
            FROM Profile p
            INNER JOIN User u ON p.userId = u.id
        `;
        res.json(profiles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
    // try {
    //     const profile = await prisma.profile.findMany({
    //         include: {user: true},
    //     });
    //     res.json(profile);
    // } catch {
    //     res.status(500).json({ message: "Server Error" });
    // }
}

const addProfile = async (req, res) => {
    try {
        const { email, name, address, phone, userId } = req.body;
        // const userId = req.session.userId
        const newProfile = await prisma.profile.create({
            data: {
                email: email,
                name: name,
                address: address,
                phone: phone,
                userId: userId,
            },
        })
        res.send(newProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}



const findById = async (req, res) => {
    try {
        const profileId = parseInt(req.params.id);
        const findProfile = await prisma.profile.findUnique({
            where: { id: profileId }
        });

        if (findProfile) {
            return res.status(200).json(findProfile);

        } else {
            res.status(404).json({ message: 'Tidak ada User dengan Id yang dituju' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}


const deleteProfile = async (req, res) => {
    try {
        const profileId = parseInt(req.params.id);
        const deleteid = await prisma.profile.delete({
            where: { id: profileId }
        })

        res.status(204).json(deleteid);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { email, name, address, phone } = req.body;

        const updatedProfile = await prisma.profile.update({
            where: { id: userId },
            data: {
                email, name, address, phone,
            },
        })
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { getProfile, addProfile, findById, deleteProfile, updateProfile };