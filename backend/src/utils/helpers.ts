import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const filter_var = (value: any, type: string) => {
    switch (type) {
        case 'email':
            let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return reg.test(value);
    }
}

export const genPassword = (password: string, callback: any) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            return callback(err);
        }

        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                return callback(err);
            }

            return callback(hash);
        });
    });
}

export const comparePassword = (password: string, hash: string, callback: any) => {
    bcrypt.compare(password, hash, function (err, result) {
        if (result) {
            return callback(true);
        }

        return callback(false);
    });
}

export const createJWT = (obj: any) => {
    if (!process.env.JWT) {
        return null;
    }

    let jwtSecret: string = process.env.JWT;
    return jwt.sign(obj, jwtSecret);
}