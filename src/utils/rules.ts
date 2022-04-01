export type Rule = (v: string) => boolean | string;

export const nameRules: Rule[] = [
  v => !!v || "Name is required"
];

export const emailRules: Rule[] = [
  v => !!v || "Email is required",
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

export const passwordRules: Rule[] = [
  v => !!v || "Password is required"
];
