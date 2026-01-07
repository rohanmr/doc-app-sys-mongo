const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {

    const { name, email, password, contactNumber, address } = req.body

    try {
        if (!name || !email || !password) {
            return res.status(400).send({ msg: "Please Provide Valid data" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).send({ msg: "User already exists" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ name, email, password: hashPassword, contactNumber, address })

        await newUser.save()

        return res.status(201).send({ msg: "User register successfully " })


    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).send({ msg: "Please Provide Data" })
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send({ msg: "Invalid Credentials" })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).send({ msg: "Invalid Credentials" })
        }

        const payload = {
            id: user._id,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY)

        return res.status(200).send({ msg: "User login Successfully", token: token })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }

}

const getUserInfo = async (req, res) => {
    const id = req.user._id
    try {
        const user = await User.findOne({ id }).select("-password")

        if (!user) {
            return res.status(400).send({ msg: "User info not found" })
        }

        return res.status(200).send({ user: user })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }
}





module.exports = { register, login, getUserInfo }