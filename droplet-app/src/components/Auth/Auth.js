const jwt = require('jsonwebtoken')

const secret = 'temporaryKey'

function generateJWT(user){
    return new Promise((resolve, reject) => {
        const payload = {sub: user.username};
        jwt.sign(payload, secret, {expiresIn: '24h'}, function(err, token){
            if(err){
                reject(err);
            }else{
                resolve(token);
            }
        });
    });
}

function requireAuthentication(req, res, next){
    const header = req.get('Authorization') || '';
    const headerContent = header.split(' ');
    const token = headerContent[0] === 'Bearer' ? headerContent[1] : null;
    jwt.verify(token, secret, function(err, payload){
        if(!err){
            req.user = payload.sub;
            next();
        }else{
            res.status(401).json({
                error: "Authentication token is invalid"
            });
        }
    });
}

exports.generateJWT = generateJWT;
exports.requireAuthentication = requireAuthentication;