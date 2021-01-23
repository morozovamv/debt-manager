// TODO: remove when https://github.com/microsoft/TypeScript/issues/35865 is closed
declare namespace Intl {
  interface DateTimeFormatOptions {
    dateStyle?: "full" | "long" | "medium" | "short";
    timeStyle?: "full" | "long" | "medium" | "short";
  }
}
