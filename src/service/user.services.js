import userRepository from "../repositories/user.repositories.js";

async function createUserService(newUser){
    const foundUserEmail = await userRepository.findUserByEmailRepository(newUser.email)
    const foundUsername = await userRepository.findUserByUsernameRepository(newUser.username)

    if (foundUserEmail) {
        throw new Error("Email already in use!")
    }
    if (foundUsername) {
        throw new Error("Username already in use")
    }

    const user = await userRepository.createUserRepository(newUser)
    return user
}

export default {createUserService}