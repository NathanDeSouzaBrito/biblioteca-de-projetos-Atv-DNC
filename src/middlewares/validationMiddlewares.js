import { ZodError } from "zod";
import { userIdSchema } from "../schema/userSchema.js";

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json({ errors: e.errors ?? e.issues });
        }

        return res.status(400).json({ error: e.message || String(e) });
    }
}

const validateUserId = (req, res, next) => {
  try {
    userIdSchema.parse({ userId: req.params.id });
    next();
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ errors: e.errors ?? e.issues });
    }
    return res.status(400).json({ error: e.message || String(e) });
  }
}

export { validate, validateUserId };