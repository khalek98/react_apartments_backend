import ApartModel from '../models/Apart.js';

export const getAllAparts = async (req, res) => {
  try {
    const aparts = await ApartModel.find();

    res.json(aparts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Failed to get posts',
    });
  }
};

export const createApartPost = async (req, res) => {
  try {
    const doc = new ApartModel({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imgArr: req.body.imgArr,
      location: req.body.location,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'Failed to create new Apartment post',
    });
  }
};
