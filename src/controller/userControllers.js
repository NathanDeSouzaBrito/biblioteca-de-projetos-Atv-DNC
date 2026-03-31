import userServices from "../service/userServices.js";

const createUserController = async (req, res) => {
    const newUser = req.body;

    try {
        const user = await userServices.createUserService(newUser);
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const getUsersController = async (req, res) => {
    try {
        const users = await userServices.getUsersService();
        res.status(200).send({ users });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

export default { createUserController, getUsersController };