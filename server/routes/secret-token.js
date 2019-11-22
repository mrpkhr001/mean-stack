const otplib = require('otplib');

function generateSecret() {

    otplib.authenticator.options = {
        step: 60,
        window: 1,
        digits: 6,

    };

    return otplib.authenticator.generateSecret();

}

function verifySecretToken(secret, token) {

    otplib.authenticator.options = {
        step: 60,
        window: 1,
        digits: 6,
    };
    
    console.log("computed token : " + otplib.authenticator.generate(secret))
    console.log("given toke : " + token)
    console.log("given secret : " + secret)

    return token === otplib.authenticator.generate(secret);
}

module.exports = {generateSecret :generateSecret , verifySecretToken : verifySecretToken};