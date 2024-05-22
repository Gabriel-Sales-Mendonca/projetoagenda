const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user) res.render('login-logado')
    else res.render('login')
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body)
        await login.register()
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('back')
            })
            return
        }
    
        req.flash('success', 'Seu usuário foi criado com sucesso!')
        req.session.save(function() {
            return res.redirect('back')
        })
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
};

exports.login = async function(req, res) {
    try {
        const login = new Login(req.body)
        await login.logar()
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('back')
            })
            return
        }
    
        req.flash('success', 'Você logou com sucesso!')
        req.session.user = login.user
        req.session.save(function() {
            return res.redirect('back')
        })
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
};