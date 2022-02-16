//convert require to ES syntax
import { verify, sign } from 'jsonwebtoken';

const secret = 'mysecretsshhhhh';
const expiration = '1h';

export function authMiddleware({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
        token = token
            .split(' ')
            .pop()
            .trim();
    }

    // if no token, return request object as is
    if (!token) {
        return req;
    }

    try {
        // decode and attach user data to request object
        const { data } = verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch {
        console.log('Invalid token');
    }

    // return updated request object
    return req;
}
export function signToken({ username, email, _id }) {
    const payload = { username, email, _id };

    return sign({ data: payload }, secret, { expiresIn: expiration });
}