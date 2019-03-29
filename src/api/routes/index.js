const Router = require("koa-router");
const { version } = require("../../../package");
const {
  validate,
  jwtAuthMiddleware,
  localAuthMiddleware
} = require("../middlewares");
const {
  ListQuerySchema,
  IdSchema,
  CreateUserSchema,
  UserSchema
} = require("../schemas/users.schema");
const { SignInSchema } = require("../schemas/auth.schema");
const UsersController = require("../controllers/users.controller");
const AuthController = require("../controllers/auth.controller");

const router = new Router();

router.get("/api/", async ctx => {
  ctx.body = {
    status: "active",
    message: "user-management-system",
    version,
    date: new Date().toISOString()
  };
});

router.post(
  "/api/sign-in",
  validate(SignInSchema),
  localAuthMiddleware,
  AuthController.signIn
);
router.get(
  "/api/users",
  jwtAuthMiddleware,
  validate(ListQuerySchema),
  UsersController.list
);
router.get(
  "/api/users/:id",
  jwtAuthMiddleware,
  validate(IdSchema),
  UsersController.single
);
router.post(
  "/api/users",
  jwtAuthMiddleware,
  validate(CreateUserSchema),
  UsersController.add
);
router.put(
  "/api/users/:id",
  jwtAuthMiddleware,
  validate(IdSchema),
  validate(UserSchema),
  UsersController.update
);
router.del(
  "/api/users/:id",
  jwtAuthMiddleware,
  validate(IdSchema),
  UsersController.remove
);

module.exports = {
  router
};
