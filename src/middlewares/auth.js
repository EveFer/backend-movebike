import jwt from '../libs/jwt.js'
import { StatusHttp } from '../libs/statusHttp.js'

function auth(request, response, next) {
    try {
        const { authorization : token } = request.headers

        const isValidToken = jwt.verify(token)
        if(!isValidToken) throw new StatusHttp('No autorizado')
        next()
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Login or create your acount',
            error: error.message
        })
    }
}

export { auth }