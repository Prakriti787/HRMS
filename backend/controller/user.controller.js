import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
export const createUser = async (req, res) => {
 console.log(req.file);
 const image =req.file.filename


  try {
    const { firstName, lastName, email, password } = req.body;
    if (firstName == "" || lastName == "" || email == "" || password == "") {
      return res.status(400).send("please fill all the fields");
    }

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "user fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
export const getUSerById = async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "user fetch suucessfullly",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
export const updateUser =async (req,res)=>{
    try {
        const { id } = req.params;
        const updates = req.body;
        if(updates.password) {
            delete updates.password; 
        }

        const user = await User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
    
export const deleteUser =async (req,res)=>{
    try {
        const { id } = req.params;
       

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User delete successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
    