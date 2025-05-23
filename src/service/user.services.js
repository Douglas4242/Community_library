import userRepository from "../repositories/user.repositories.js";
import bcrypt from 'bcrypt'

async function createUserService(newUser){
    const foundUserEmail = await userRepository.findUserByEmailRepository(newUser.email)
    const foundUsername = await userRepository.findUserByUsernameRepository(newUser.username)

    if (foundUserEmail) {
        throw new Error("Email already in use!")
    }
    if (foundUsername) {
        throw new Error("Username already in use")
    }

    const passHash = await bcrypt.hash(newUser.password, 10)
    
    const user = await userRepository.createUserRepository({...newUser, password: passHash})
    if(!user) {
        throw new Error("Error creating User")
    }
    return user
}


async function findAllUsersService() {
    const users = await userRepository.findAllUsersRepository();
    return users
}

async function findUserByIdService(id) {
    const user = await userRepository.findUserByIdRepository(id)
    if (!user) {
        throw new Error ("User not found")
    }
    return user
}

export default {createUserService,
    findUserByIdService,
    findAllUsersService
}