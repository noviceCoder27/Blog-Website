
function register(req,res) {
    res.send('register')
}

function login(req,res) {
    res.send('login')
}

function updateUserCredentials(req,res) {
    res.send('update')
}

module.exports = {register,login,updateUserCredentials}