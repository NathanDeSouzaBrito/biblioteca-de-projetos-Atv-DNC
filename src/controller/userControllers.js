import userServices from "../service/userServices.js";
import { loginService } from "../service/authService.js";

const createUserController = async (req, res) => {
    const newUser = req.body;

    try {
        const token = await userServices.createUserService(newUser);
        res.status(201).send({ token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginService(email, password);
        res.status(200).send({ token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const getUsersController = async (req, res) => {
    try {
        const users = await userServices.getUsersService();
        res.status(200).send({ users });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const findAllUserControllers = async (req, res) => {
    try {
        const users = await userServices.findAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const findUserByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userServices.findUserByIdService(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateUserController = async (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    try {
        const updatedUser = await userServices.updateUserService(newUser, id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const { message } = await userServices.deleteUserService(id);
        res.status(200).json({ message });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export default { 
    createUserController, 
    getUsersController, 
    findAllUserControllers, 
    findUserByIdController,
    updateUserController,
    deleteUserController,
    loginUserController
};