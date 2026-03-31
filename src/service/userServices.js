import userRepositories from "../repositories/userRepositories.js";


const createUserService = async (newUser) => {
    const user = await userRepositories.createUserRepository(newUser);
    return user;
}

const getUsersService = async () => {
    const users = await userRepositories.getUsersRepository();
    return users;
}

export default { createUserService, getUsersService };