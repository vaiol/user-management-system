const Router = require("koa-router");
const { version } = require("../../../package");
const { validate } = require("../middlewares/validation.middleware");
const {
  ListQuerySchema,
  IdSchema,
  CreateUserSchema,
  UserSchema
} = require("../schemas/users.schema");
const UsersController = require("../controllers/users.controller");

const router = new Router();

router.get("/api/", async ctx => {
  ctx.body = {
    status: "active",
    message: "user-management-system",
    version,
    date: new Date().toISOString()
  };
});

router.get("/api/users", validate(ListQuerySchema), UsersController.list);
router.get("/api/users/:id", validate(IdSchema), UsersController.single);
router.post("/api/users", validate(CreateUserSchema), UsersController.add);
router.put(
  "/api/users/:id",
  validate(IdSchema),
  validate(UserSchema),
  UsersController.update
);
router.del("/api/users/:id", validate(IdSchema), UsersController.remove);

module.exports = {
  router
};
