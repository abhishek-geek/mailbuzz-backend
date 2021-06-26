const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SECRET,
} = require("./utils/config");
const jwt = require("jsonwebtoken");
const User = require("./model/user");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(async function (user, done) {
  console.log("user ser =>", user.id);
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  // const user = await User.findById(id);
  // console.log("user =>", user);
  // done(null, user);
  console.log("id: ", id);
  User.findById(id).then((user) => {
    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    // response
    //   .status(200)
    //   .send({ token, username: user.username, name: user.name });
    const resObj = {
      token,
      email: user.email,
      username: user.username,
      name: user.name,
    };
    console.log(resObj);
    console.log("aaaa");
    done(null, resObj);
  });
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/login/google/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("access token: ", accessToken);
      const user = await User.findOne({ username: profile.id });
      console.log("user =>", user);
      if (!user) {
        console.log("user =>", user);
        console.log("profile: ", profile);

        const newUser = new User({
          username: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          passwordHash: "123123123123123",
        });

        const savedUser = await newUser.save();
        console.log("saved =>", savedUser);
        done(null, savedUser);
      }
      console.log("currentUser =>", user);
      done(null, user);
    }
  )
);
