const validarCelularAR = (valor: string): boolean => {
  // Remover +54 opcional al inicio
  valor = valor.replace(/^\+54/, '');

  // Chequear código de área
  if (!/^[157]\d/.test(valor)) {
    return false;
  }

  // Verificar 9 dígitos después del código
  if (!/\d{9}$/.test(valor)) {
    return false;
  }

  return true;
};
