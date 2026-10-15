// * ARCHIVO A COMPLETAR
import { UserModel, ProfileModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    // TODO: 1. Hashear la password antes de guardarla (hashPassword).
    const hashedPassword = await hashPassword(password);
    // TODO: 2. Crear el user y su profile asociado.
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const profile = await ProfileModel.create({
      employee_number,
      first_name,
      last_name,
      phone,
      user_id: user.id,
    });
    // TODO: 3. Responder con código 201, un mensaje de éxito y devolver el usuario sin la password.

    //se devuelve el usuario sin contraseña
    const { password: passwordGuardada, ...userSinPassword } = user.toJSON();

    return res.status(201).json({
      msg: "Usuario registrado correctamente",
      user: {
        ...userSinPassword,
        profile,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: 1. Buscar el user por email y comparar la password (comparePassword).
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // TODO: 2. Firmar un JWT con el id y el role del user (signToken).

    const token = signToken({ id: user.id, role: user.role });

    // TODO: 3. Guardar el token en una cookie httpOnly llamada "token", responder con código 200 y un mensaje de éxito.

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ msg: "Inicio de sesión exitoso" });

    // ? Considerar qué mensaje devolver ante credenciales inválidas.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  try {
    // TODO: 1. Eliminar la cookie "token" y responder con código 204 sin devolver ningun mensaje.
    res.clearCookie("token").status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
