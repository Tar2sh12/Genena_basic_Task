import { Router } from "express";
import * as groups from "./group.controller.js";
import { addGroupSchema, deleteSchema, getByIdSchema, updateSchema } from "./group.schema.js";
import { errorHandler } from "../../middleware/error-handling.middleware.js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
const router = Router();
router.post(
  "/addGroup",
  errorHandler(validationMiddleware(addGroupSchema)),
  errorHandler(groups.addGroup)
);
router.put(
    "/update/:_id",
    errorHandler(validationMiddleware(updateSchema)),
    errorHandler(groups.updateGroup)
  );
  router.delete(
    "/delete/:_id",
    errorHandler(validationMiddleware(deleteSchema)),
    errorHandler(groups.deleteGroup)
  );
  router.get(
    "/getInfo",
    errorHandler(groups.getInfo)
  );
  router.get(
    "/getById/:_id",
    errorHandler(validationMiddleware(getByIdSchema)),
    errorHandler(groups.getById)
  );
export default router;
