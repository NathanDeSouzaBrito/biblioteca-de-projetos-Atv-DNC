import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";

const createUserService = async (newUser) => {
    const foundUsers = await userRepositories.findUserByEmailOrUsername(newUser.email);
    if (foundUsers) throw new Error("Esse email já está em uso.");

    const passHash = await bcrypt.hash(newUser.password, 10);
    const user = await userRepositories.createUserRepository({
        ...newUser, password: passHash 
    });
    if (!user) throw new Error("Erro ao criar usuário.");
    return user;
}

const getUsersService = async () => {
    const users = await userRepositories.getUsersRepository();
    return users;
}

const findUserByIdService = async (id) => {
    const user = await userRepositories.findUserById(id);
    if (!user) throw new Error("Usuário não encontrado.");
    return user;
}

const findAllUsersService = async () => {
    const users = await userRepositories.findAllUsers();
    return users;
}

const updateUserService = async (newUser, userId) => {
    const user = await userRepositories.findUserById(userId);
    if (!user) throw new Error("Usuário não encontrado.");
    if (newUser.password) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    const updatedUser = await userRepositories.updateUserRepository(userId, newUser);
    return updatedUser;
}

const deleteUserService = async (userId) => {
    const user = await userRepositories.findUserById(userId);
    if (!user) throw new Error("Usuário não encontrado.");
    const { message } = await userRepositories.deleteUserRepository(userId);
    return { message };
}

export default { 
    createUserService, 
    getUsersService, 
    findUserByIdService,
    findAllUsersService,
    updateUserService,
    deleteUserService
};