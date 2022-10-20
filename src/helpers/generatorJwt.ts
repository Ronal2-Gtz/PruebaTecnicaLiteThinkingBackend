import jwt from 'jsonwebtoken'

const generartorJWT = (uid: string): any => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRETPRIVATEKEY!, { expiresIn: '4h' }, (error, token) => {
            if (error) {
                reject('Error generating token')
                return
            }

            resolve(token)
        })
    })
}

export { generartorJWT }