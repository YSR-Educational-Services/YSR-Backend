const jwt = require("jsonwebtoken");

const createTokens = async (payload, databases) => {
  try {
    const accessToken = jwt.sign(
      {
        id: payload.id,
        email: payload.email,
        adminType: payload.adminType
      },
      process.env.ACCESS_JWT_SECRET
      // {
      //   expiresIn: "100800s",
      // }
    );
    const refreshToken = jwt.sign(
      { id: payload.id },
      process.env.REFRESH_JWT_SECRET
    );
    const isAlreadyRefreshToken = await databases.refresh_tokens.findOne({
      where: { _user: payload.id }
    });
    if (isAlreadyRefreshToken) {
      await databases.refresh_tokens.update(
        {
          refreshToken: refreshToken
        },
        {
          where: {
            _user: payload.id
          }
        }
      );
    } else {
      await databases.refresh_tokens.create({
        _user: payload.id,
        refreshToken: refreshToken
      });
    }
    const data = {
      refreshToken: refreshToken,
      accessToken: accessToken
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = createTokens;
