import jwt from "jsonwebtoken"

function generateJWT(id) {
    return jwt.sign({id}, '01ee8d1beb6616abdd11ac3cbdecf5d03eed79e73caac0d2f6db39c566190051', {expiresIn: 86400})
}

export {generateJWT}