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

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    let i;
    for(i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

exports.generateJWT = generateJWT;
exports.requireAuthentication = requireAuthentication;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.eraseCookie = eraseCookie;
