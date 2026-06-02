import { FormControl } from "@angular/forms";

export const isValidDate = (c: FormControl) => {
  if (typeof c.value !== 'string' || c.value === '') return null;

  const year = parseInt(c.value.slice(0, 4));
  const currentYear = new Date().getFullYear();

  const DATE_REGEXP = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (!DATE_REGEXP.test(c.value)) {
    return { dateInvalid: { reason: 'format' } };
  }

  if (year > currentYear - 10) {
    return { dateInvalid: { reason: 'tooRecent', minAge: 10 } };
  }

  if (year < currentYear - 100) {
    return { dateInvalid: { reason: 'tooOld', maxAge: 100 } };
  }

  return null;
};
