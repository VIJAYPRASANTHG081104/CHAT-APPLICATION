const model = require('../models/usermodel')
const bcrypt = require("bcrypt");


const salt = 10;
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await model.findOne({ username });
        if (usernameCheck) {
            return res.send({ status: false, err: "Username already exist" });
        }
        const emailCheck = await model.findOne({ email });
        if (emailCheck) {
            return res.send({ status: false, err: "Email already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new model({
            email,
            username,
            password: hashedPassword
        })
        await user.save();
        delete user.password;
        res.status(200).send({ status: true, msg: "user created successfully", user });
    }
    catch (err) {
        res.send({ status: false, err: "Not Created" });
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await model.findOne({ username });
        if (!user) {
            return res.send({ status: false, err: "Incorrect username or password!" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.send({ status: false, err: "Incorrect username or password!" });
        }
        delete user.password;
        res.status(200).send({ status: true, msg: "Login success", user });
    }
    catch (err) {
        res.send({ status: false, err: "Login failed" });
    }
}

const setAvatar = async (req, res) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await model.findByIdAndUpdate(userId, {

            isAvatarImageSet: true,
            avatarImage

        })
        return res.status(200).send({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        })
    } catch (error) {
        return res.status(500).send({ status: false, err: "There is a error in controller" });
    }

}

const getAlluser = async (req, res) => {
    try {

        const users = await model.findById({ _id: req.params.id })
        return res.status(200).send(users.contact);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).send({ status: false, error: 'Error in getting all users' });
    }

}


module.exports = {
    register,
    login,
    setAvatar,
    getAlluser,

}