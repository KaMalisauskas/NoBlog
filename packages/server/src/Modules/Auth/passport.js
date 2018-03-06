import passport from "passport"
import LocalStategy from "passport-local"
import { Strategy as JWTStrategy, ExtractJwt} from "passport-jwt"
import UserModel  from "./UserModel"
import config from "../../config.json"

const localLogin = new LocalStategy(async (username, password, done) => {
    try{
        const User = await UserModel.findOne({username})
        if(!User || !User.comparePassword(password)) return done(null, false, {message: "Wrong username or password"})
        return done(null, User)
    }
    catch(err) {
        return done(err, false)
    }
})

const jwtOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: config.passport.secret
}

const authLogin = new JWTStrategy(jwtOpt, async (payload, done) => {
    try {
        const User = await UserModel.findById(payload._id)
        if (!User) return done(null, false)
        return done(null, User)
    }
    catch(err) {
        return done(err, false)
    }
})

passport.use(localLogin)
passport.use(authLogin)

export const authLocal = passport.authenticate('local', {session: false})
export const authJwt = passport.authenticate('jwt', {session: false})