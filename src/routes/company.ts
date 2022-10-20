import express from "express";
import {
  addCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from "../controllers/company";

const router = express.Router();

router.get("/:id", getCompany);

router.get("/", getCompanies);

router.post("/", addCompany);

router.put("/", updateCompany);

router.delete("/", deleteCompany);

export default router;
