import { Request, Response } from "express";

const getCompany = (_req: Request, res: Response): void => {
  res.json({
    msg: "Fetching all company in get one",
  });
};
const getCompanies = (_req: Request, res: Response): void => {
  res.json({
    msg: "Fetching all company in get all",
  });
};
const addCompany = (_req: Request, res: Response): void => {
  res.json({
    msg: "Fetching all company in post ",
  });
};
const updateCompany = (_req: Request, res: Response): void => {
  res.json({
    msg: "Fetching all company in put ",
  });
};
const deleteCompany = (_req: Request, res: Response): void => {
  res.json({
    msg: "Fetching all company in delete ",
  });
};

export { getCompany, getCompanies, addCompany, updateCompany, deleteCompany };
