const jwt = require('jsonwebtoken')

const secret = 'evMv2bY5PmPb1XnRuERkOI0wbVxNXKpo8RU1dBIO7xFhfb6Ui78ZSEN9ye5L8YRk1n32S11vkhvzyNkeowXImgAXFpdg0wphoI3cqZ763o69uaF33hvYdEP2qPzGRB'

function generateJWT(userID){
    return new Promise((resolve, reject) => {
        const payload = {sub: userID};
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

function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(window.atob(base64));
        };

exports.generateJWT = generateJWT;
exports.requireAuthentication = requireAuthentication;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.eraseCookie = eraseCookie;
exports.parseJwt = parseJwt;
