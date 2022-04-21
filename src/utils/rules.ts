type RuleResult = boolean | string;
export type Rule<T> = (v: T) => RuleResult;

export const nameRules: Rule<string>[] = [
  (v: string): RuleResult => !!v || "Name is required"
];

export const usernameRules: Rule<string>[] = [
  (v: string): RuleResult => !!v || "Username is required"
];

export const emailRules: Rule<string>[] = [
  (v: string): RuleResult => !!v || "Email is required",
  (v: string): RuleResult => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

export const passwordRules: Rule<string>[] = [
  (v: string): RuleResult => !!v || "Password is required"
];

export const checkboxTrueRule: Rule<boolean> = v => !!v || "You must agree to continue";
