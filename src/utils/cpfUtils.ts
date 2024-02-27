function validarCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais (situação inválida)
    const isAllDigitsEqual = /^(.)\1*$/.test(cpf);
    if (isAllDigitsEqual) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) {
        digit = 0;
    }

    // Verifica se o primeiro dígito verificador é válido
    if (parseInt(cpf.charAt(9)) !== digit) {
        return false;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) {
        digit = 0;
    }

    // Verifica se o segundo dígito verificador é válido
    if (parseInt(cpf.charAt(10)) !== digit) {
        return false;
    }

    // CPF válido
    return true;
}

export { validarCPF };
