import { ZodError, ZodSchema } from "zod";
import { badRequest } from "./response";

export async function parseBody<T>(req: Request, schema: ZodSchema<T>) {
  try {
    const json = await req.json();
    return schema.parse(json);
  } catch (err) {
    if (err instanceof ZodError) {
      return badRequest("validation_error", err.flatten());
    }
    return badRequest("invalid_json");
  }
}
