import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userModel from '../models/User.js';
import ApartModel from '../models/Apart.js';

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretApart2022',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'failed to sign up',
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    const userPosts = await ApartModel.find({ user: user._id });

    if (!user) {
      return res.status(404).json({
        message: 'wrong login or password',
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash,
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: 'wrong login or password',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretApart2022',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      userData,
      userPosts,
      token,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: 'failed to sign in',
      error: err,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const userPosts = await ApartModel.find({ user });

    if (!user) {
      return res.status(404).json({
        message: '?????????????????????? ???? ????????????????',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ userData, userPosts });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: '?????????? ??????????????...',
      error,
    });
  }
};

export const userEdit = async (req, res) => {
  try {
    let password = req.body.password;
    let salt = await bcrypt.genSalt(10);
    let hash;

    try {
      password = req.body.password;
      salt = await bcrypt.genSalt(10);
      hash = await bcrypt.hash(password, salt);
    } catch {
      console.log('err');
    }

    const update = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: hash,
    };

    const user = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      update,
      { new: true },
    );

    const token = jwt.sign(
      {
        _id: req.body.id,
      },
      'secretApart2022',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update user info',
      error,
    });
  }
};
