import { parseAsBoolean, parseAsString } from "nuqs";

/** Query string: `?chat_open=true&chat_initial_message=...` */
export const chatSearchParams = {
  chat_open: parseAsBoolean.withDefault(false),
  chat_initial_message: parseAsString,
};
