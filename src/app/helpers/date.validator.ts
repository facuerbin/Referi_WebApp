import { FormControl } from "@angular/forms";

export const isValidDate = (c: FormControl) => {
  if (typeof(c.value) != 'string') return {
    validateDate: {
      valid: false
    }
  };
  // Checks date not from 10 years ago
  if (parseInt(c.value.slice(0,4)) > (+(new Date().getFullYear()) - 10)) return {
    validateDate: {
      valid: false
    }
  };

  // Checks date after 100 years ago
  if (parseInt(c.value.slice(0,4)) < (+(new Date().getFullYear()) - 100)) return {
    validateDate: {
      valid: false
    }
  };

  const DATE_REGEXP = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  return DATE_REGEXP.test(c.value) || c.value === '' ? null : {
    validateDate: {
      valid: false
    }
  };
}
