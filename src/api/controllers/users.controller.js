const { DuplicationError, NotFoundError } = require("../errors");
const {
  addUser,
  getUsersList,
  getUser,
  removeUser,
  updateUser,
  getByEmail
} = require("../../db/queries/users");
const { hashPass } = require("../../utils/bcrypt");

const add = async ctx => {
  const { name, email, password } = ctx.request.body;
  const [existed] = await getByEmail(email);
  if (existed) {
    throw new DuplicationError(
      "Email must be unique. User with same email already occupied!"
    );
  }
  const [newUser] = await addUser({
    name,
    email,
    password: await hashPass(password)
  });
  ctx.status = 201;
  ctx.body = newUser;
};

const remove = async ctx => {
  const { id } = ctx.params;
  const [removedUser] = await removeUser(id);
  if (!removedUser) {
    throw new NotFoundError(`User with id ${id} not found!`);
  }
  ctx.status = 200;
  ctx.body = removedUser;
};

const update = async ctx => {
  const { id } = ctx.params;
  const { name, email, password } = ctx.request.body;
  if (email) {
    const [existed] = await getByEmail(email);
    if (existed && existed.id !== id) {
      throw new DuplicationError(
        "Email must be unique. User with same email already occupied!"
      );
    }
  }
  const [updatedUser] = await updateUser({
    id,
    name,
    email,
    password: await hashPass(password)
  });
  if (!updatedUser) {
    throw new NotFoundError(`User with id ${id} not found!`);
  }
  ctx.status = 200;
  ctx.body = updatedUser;
};

const list = async ctx => {
  const { skip, take, order } = ctx.query;
  ctx.status = 200;
  ctx.body = await getUsersList(skip, take, order);
};

const single = async ctx => {
  const { id } = ctx.params;
  const [user] = await getUser(id);
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found!`);
  }
  ctx.status = 200;
  ctx.body = user;
};

module.exports = {
  add,
  remove,
  update,
  list,
  single
};
