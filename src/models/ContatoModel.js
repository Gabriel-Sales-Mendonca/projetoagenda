const mongoose = require('mongoose')
const validator = require('validator')

const contatoSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telephone: { type: String, required: false, default: '' },
    criadoEm: { type: Date,  default: Date.now()}
})

const contatoModel = mongoose.model('contato', contatoSchema)

class Contato {
    constructor(body) {
        this.body = body,
        this.errors = [],
        this.contato = null
    }

    async register() {
        this.valid()

        if(this.errors.length > 0) return

        this.contato = await contatoModel.create(this.body)
    }

    valid() {
        this.cleanUp()

        if(this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido')
        }

        if(!this.body.name) {
            this.errors.push('O nome é obrigatório!')
        }
        
        if(!this.body.email && !this.body.telephone) {
            this.errors.push('Você precisa informar ou o Email ou o Telefone do contato')
        }
    }

    cleanUp() {
        for(let key in this.body) {
            if(typeof key !== 'string') {
                this.body[key] = ''
            }
        }

        this.body.name = this.body.name.trim()
        this.body.surname = this.body.surname.trim()
        this.body.email = this.body.email.trim()
        this.body.telephone = this.body.telephone.trim()

        this.body = {
            name: this.body.name,
            surname: this.body.surname,
            email: this.body.email,
            telephone: this.body.telephone
        }
    }

    async searchById(id) {
        if(typeof id !== 'string') return
        const contato = await contatoModel.findById(id)
        return contato
    }

    async edit(id) {
        if(typeof id !== 'string') return

        this.valid()

        if(this.errors.length > 0) return

        this.contato = await contatoModel.findByIdAndUpdate(id, this.body, { new: true })
    }

    static async searchContatos() {
        const contato = await contatoModel.find()
            .sort({ criadoEm: -1 })
        return contato
    }

    async delete(id) {
        if(typeof id !== 'string') return

        const contato = await contatoModel.findOneAndDelete({_id: id})
        return contato
    }
}

module.exports = Contato