import { AbstractControl, FormControl, Validators } from "@angular/forms";

export class CustomValidator {
  constructor() {}

  /**
   * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
   */
  static isValidCpf() {
    return (control: AbstractControl): Validators => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
          return 0;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return 0;
        } else {
          return { cpfNotValid: true };
        }
      }
      return 0;
    };
  }

  static senhaComplexaValidator(control: AbstractControl) {
    // Define uma expressão regular que verifica se a senha tem pelo menos 4 caracteres, 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{4,}$/;
  
    // Testa a expressão regular na senha e retorna null se for válida ou um objeto de erro se for inválida
    return regex.test(control.value) ? null : { senhaInvalida: true };
  }
}

