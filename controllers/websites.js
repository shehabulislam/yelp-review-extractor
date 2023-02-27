import Website from "../models/Websites.js";
import dotenv from "dotenv";

dotenv.config();

export const createWebsite = async (req, res) => {
  const date = new Date().toLocaleString().match(/(.+), /)?.[1];
  const { website } = req.body;
  try {
    const dateExist = await Website.findOne({ date });

    if (dateExist) {
      console.log("date exists");
      const exist = await Website.findOne({ websites: { $in: [website] } });
      if (!exist) {
        await Website.findOneAndUpdate(
          { date },
          {
            $push: { websites: website },
          }
        );
      } else {
        console.log("data exists", { exist, website });
        res.send("already exist");
      }
    } else {
      const newWebsite = new Website({ websites: [website], date });
      await newWebsite.save();
      res.json("website added");
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateWebsite = async (req, res, next) => {
  try {
    const updatedWebsite = await Website.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedWebsite);
  } catch (err) {
    next(err);
  }
};
export const deleteWebsite = async (req, res, next) => {
  try {
    await Website.findByIdAndDelete(req.params.id);
    res.status(200).json("Website has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getWebsite = async (req, res, next) => {
  try {
    const website = await Website.findById(req.params.id);
    res.status(200).json(website);
  } catch (err) {
    next(err);
  }
};
export const getWebsites = async (req, res, next) => {
  const { token } = req.params;

  if (token === process.env.JWT) {
    try {
      const websites = await Website.find();
      res.status(200).json(websites);
    } catch (err) {
      console.log(err);
    }
    return;
  }
  res.json("access denied");
};
