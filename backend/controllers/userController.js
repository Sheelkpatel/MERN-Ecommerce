import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token,user: {
                id: user._id,
                name: user.name, // or username depending on your schema
              } })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, email, password,mobile } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // validating mobile number 
        const validateMobile = (mobile) => {
            const regex = /^[0-9]\d{9}$/; // Starts with 6-9 and followed by 9 digits
            return regex.test(mobile);
        };
        
        
        if (!validateMobile(mobile)) {
            return res.json({ success: false , message: "Please enter a valid email" })
        } 
        

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            mobile,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token,user: {
            id: newUser._id,
            name:newUser.name, // or username depending on your schema
          } })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Route for user display

const getallUser = async (req,res) => {
    try {
        const getUser = await userModel.find();
        res.status(200).json(getUser)
    }
    catch(error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

  const removeUser =async (req, res) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  export { loginUser, registerUser, adminLogin ,getallUser,removeUser }
