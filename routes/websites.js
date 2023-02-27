import express from "express";
import { createWebsite, deleteWebsite, getWebsite, getWebsites, updateWebsite } from "../controllers/websites.js";

const router = express.Router();

//CREATE
router.post("/", createWebsite);

//UPDATE
router.put("/:id", updateWebsite);
//DELETE
router.delete("/:id", deleteWebsite);
//GET

router.get("/find/:id", getWebsite);
//GET ALL

router.get("/:token", getWebsites);
// router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);
// router.get("/room/:id", get);

export default router;
