import cron from "node-cron";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import getWebsites from "./getWebsites.js";
import websiteRoute from "./routes/websites.js";
import cors from "cors";

import axios from "./axios.js";
import Cheerio from "cheerio";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());

app.use("/websites", websiteRoute);

app.get("/", (req, res) => {
  res.send("access denied");
});

app.get("/yelp", async (req, res) => {
  // const { businessURL } = req.params;
  // console.log({ businessURL });
  try {
    const { data: html } = await axios.get("https://www.yelp.com/biz/trisara-san-francisco");
    const data = [];
    const $ = Cheerio.load(html);
    $('[aria-label="Recommended Reviews"] ul:not([aria-label="Rating"]) li').each((i, element) => {
      const info = {};
      info.name = $(element).find("span:first").text();
      info.date = $(element).find(".css-chan6m").text();
      info.stars = 0;

      $(element)
        .find(".five-stars__09f24__mBKym > div")
        .each(function () {
          if ($(this).hasClass("star--regular__09f24__IopbI")) {
            info.stars = info.stars + 1;
          }
        });

      info.reviewText = $(element).find(".comment__09f24__gu0rG > span").text();

      data.push(info);
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(503).json("services is unavailable");
  }
});

app.listen(process.env.PORT || 3000, () => {
  // connect();
  console.log("server is running");
});

// const connect = async () => {
//   const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zoihqmz.mongodb.net/?retryWrites=true&w=majority`;
//   try {
//     await mongoose.connect(CONNECTION_URL);
//     console.log("mongodb connected");
//   } catch (error) {
//     console.log(error);
//   }
// };
