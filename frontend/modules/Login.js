import validator from 'validator'

export default class Login {
    constructor(formLogin) {
        this.form = document.querySelector(formLogin)
        this.emailMessage = null // usado para exibir as mensagens de erro só uma vez
        this.passwordMessage = null // usado para exibir as mensagens de erro só uma vez
    }

    init() {
        console.log(this.form.className)
        this.events()
    }

    events() {
        if(!this.form) return

        this.form.addEventListener('submit', (e) => {
            e.preventDefault()

            this.valid(e)
        })
    }

    valid(e) {
        const el = e.target
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')

        const loginEmail = document.querySelector('.login-email')
        const loginPassword = document.querySelector('.login-password')

        const registerEmail = document.querySelector('.register-email')
        const registerPassword = document.querySelector('.register-password')

        let error = false

        if(!validator.isEmail(emailInput.value)) {

            error = true

            if(!this.emailMessage) {
                this.emailMessage = document.createElement('p')
                this.emailMessage.className = 'error-message'
                this.emailMessage.textContent = 'E-mail inválido.'

                if(this.form.className == 'form-register') registerEmail.appendChild(this.emailMessage)
                if(this.form.className == 'form-login') loginEmail.appendChild(this.emailMessage)
            }
        }

        if(passwordInput.value.trim().length < 3 || passwordInput.value.trim().length > 50) {

            error = true

            if(!this.passwordMessage) {
                this.passwordMessage = document.createElement('p')
                this.passwordMessage.className = 'error-message'
                this.passwordMessage.textContent = 'A senha precisa ter entre 3 a 50 caracteres.'

                if(this.form.className == 'form-register') registerPassword.appendChild(this.passwordMessage)
                if(this.form.className == 'form-login') loginPassword.appendChild(this.passwordMessage)
            }
        }

        if(error == false) el.submit()
    }
}