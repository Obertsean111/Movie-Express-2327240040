import userModel from "../models/userModel";
import { hashedPassword, verifyPassword } from "../utils/hashUtil";
import { getJwtToken } from "../utils/jwtUtil";

export const signIn = async(req, res) => {
    try {
        const { email, password } = req.body;

        if ((!email, !password)) {
            return res.status(400).send({
                error: "email dan password wajib diisi!",
                data: null,
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                error: " email atau password salah!",
                data: null,
            });
        }

        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                error: "password salah!",
                data: null,
            });
        }

        const token = getJwtToken(user._id, user.username);
        return res.status(200).send({
            message: "Login Berhasil!",
            data: { token },
        });
    } catch (error) {
        return res.status(400).send({
            message: error.message,
            error,
            data: null,
        });
    }
};

export const signUp = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if ((!username, !email, !password)) {
            return res.status(400).send({
                errror: "Username, email, password wajib diisi!",
                data: null,
            });
        }

        const hashPassword = await hashedPassword(password);

        const newUser = await userModel.create({
            username,
            email,
            password: hashPassword,
        });

        if (newUser) {
            return res.status(200).send({
                message: "Berhasil melakukan pendaftaran!",
                data: null,
            });
        }

        return res.status(400).send({
            message: "Pendaftaran gagal, silahkan coba lagi..",
            data: null,
        });
    } catch (error) {
        return res.status(400).send({
            message: error.message,
            error,
            data: null,
        });
    }
};