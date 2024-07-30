import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";


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

    // Configurar la cookie con SameSite=None y Secure
    // acá hay un tema bastante complejo con el token enviado por la cookie
    // que se asigne en el front y poder acceder a el es un tema complejo que requiere 
    //ajustes en cors, en axios(en el front) y eventualmente más argumentos en res.cookie
    // finalmente es posible que se requieran modificaciones adicionales en el futuro
    // una opción más recomendable puede ser localStorage o sessionStorage en vez de cookies
    res.cookie('token', token, {
      httpOnly: false, //esto en true bloquea el acceso a la cookie para JS en el front 
      secure: true, // usar HTTPS en producción
      sameSite: 'None',
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
      httpOnly: false, 
      secure: 'production', 
      sameSite: 'none',
      partitioned: true
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


export const logout = (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  return res.sendStatus(200);
}

export const profile = async (req, res) => {
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

