function AuthenticateCPF (cpfSent) {
    Object.defineProperty (this, 'cleanCPF', {
        enumerable: true,
        get: () => {
            return cpfSent.replace(/\D+/g, '')
        }
    })
}

AuthenticateCPF.prototype.authenticate = function () {
    if(typeof this.cleanCPF === 'undefined') {
        return false
    }

    if(this.cleanCPF.length !== 11) {
        return false
    }

    if(this.isSesequence()) {
        return false
    }
    const halfCPF = this.cleanCPF.slice(0, -2)

    const firstDigit = this.generateDigit(halfCPF)
    const secondDigit = this.generateDigit(halfCPF + firstDigit)
    const newCPF = halfCPF + firstDigit + secondDigit

    return newCPF === this.cleanCPF
}

AuthenticateCPF.prototype.generateDigit = function (halfCPF) {
    const cpfArray = Array.from(halfCPF)
    
    let regressive = cpfArray.length + 1
    const total = cpfArray.reduce((acumulator, value) => {
        acumulator += (regressive * Number(value))
        regressive--
        return acumulator
    }, 0)
    const digit = 11 - (total % 11)
    return digit > 9 ? '0' : String(digit)
}

AuthenticateCPF.prototype.isSesequence = function () {
    const sequencia = this.cleanCPF[0].repeat(this.cleanCPF.length)
    return sequencia == this.cleanCPF
}

const cpf = new AuthenticateCPF('705.484.450-52')

if(cpf.authenticate()){
    console.log('CPF válido')
} else {
    console.log('CPF inválido')
}