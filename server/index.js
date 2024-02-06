import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import cheerio from "cheerio";
import bodyParser from "body-parser";
dotenv.config();

import { handleSearchImage } from "./utils/handleSearchImage.js";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@menstrual-tracking.8kl8coa.mongodb.net/?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// const useUploadImage = async (file) => {
// 	const formData = new FormData();
// 	formData.append("image", file);

// 	const response = await axios.post("https://api.imgur.com/3/image", formData, {
// 	  headers: {
// 		Authorization: "Client-ID " + process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID,
// 	  },
// 	});

// 	const link = response.data.data.link;
// 	return link;
//   };

// connectDB()

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/search", async (request, response) => {
  const { imageLink } = request.body;
  const data = await handleSearchImage(imageLink);
  return response.json(data.inline_images[0].source);
});

app.get("/api/scrape", async (request, response) => {});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
