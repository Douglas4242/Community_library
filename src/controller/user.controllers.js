import userService from "../service/user.services.js";

async function createUserController(req, res) {
    const newUser = req.body

    try {
        const user = await userService.createUserService(newUser)
        res.status(201).send({user})
    } catch (err) {
        res.status(400).send(err.message)
        
    }
}

async function findAllUsersController(req, res) {
     try {
        const users = await userService.findAllUsersService()
        res.status(200).send({users})
    } catch (err) {
        res.status(400).send(err.message)
    }
}

async function findUserByIdController(req, res) {
    try {
        const user = await userService.findUserByIdService(req.body.id)
        res.status(200).send({user})
    } catch (err) {
        res.status(400).send(err.message)
    }
}

export default {
    createUserController,
    findAllUsersController
}