const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env");

const getLoginInfo = ctx => {
  ctx.body = {
    id: ctx.state.user.id,
    email: ctx.state.user.email,
    name: ctx.state.user.name
  };
};

const signIn = async ctx => {
  const { user } = ctx.state;
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  ctx.status = 200;
  ctx.body = {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
};

module.exports = {
  getLoginInfo,
  signIn
};
