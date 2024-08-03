import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";

export const verifyToken = (req, res) => {
  try {
    return res.json({ isAuthenticated: true });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ isAuthenticated: false });
  }
};

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {

    const passwordHashs = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHashs,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });


    res.cookie('token', token, {
      httpOnly: true,
      secure: 'production',
      sameSite: 'none',
      partitioned: true,
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { username, email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    if (username) user.username = username;
    if (email) user.email = email;
    if (newPassword) {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      user.password = passwordHash;
    }

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });


    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: userFound._id });


    res.cookie('token', token, {
      httpOnly: true,
      secure: 'production',
      sameSite: 'none',
      partitioned: true,
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie('token', "", {
      expires: new Date(0),
      secure: 'production',
      sameSite: 'none',
      partitioned: true
    });
    return res.sendStatus(200);
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: error.message });
  }
}

export const profile = async (req, res) => {

  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });

    res.send("profile");
  }

  catch (error) {
    res.status(500).json({ message: error.message });
  }

}
