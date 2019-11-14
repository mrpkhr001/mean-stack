
const uuid = require('uuid-random');
const jwt = require('jsonwebtoken');
const SECRET_KEY = uuid();

function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized Request");
    }

    try {
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            res.status(401).send("Unauthorized Request");
        } else {
            let payload = jwt.verify(token, SECRET_KEY);
            if(!payload) {
                res.status(401).send("Unauthorized Request");
            }
            req.userId = payload.subject
            req.role = payload.role
            req.enrollmentSecret = payload.enrollmentSecret
            next()
        }

    } catch (error) {
        res.status(401).send("Unauthorized Request");
    }

}

module.exports = {SECRET_KEY :SECRET_KEY , verifyToken : verifyToken};
