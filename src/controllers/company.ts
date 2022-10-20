import { Request, Response } from "express";
import Company from '../model/CompanySchema'


const getCompany = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id

  try {
    const company = await Company.findById(id)
    res.json({
      company
    });
  } catch (error) {
    res.status(404).json({
      err: error,
    });
  }

};

const getCompanies = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [total, companies] = await Promise.all([
      Company.countDocuments({}),
      Company.find({})
    ])

    res.json({
      total,
      companies
    })
  } catch (error) {
    res.status(404).json({
      err: error,
    });
  }
};

const addCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, nit, phoneNumber } = req.body
    const companyDB = await Company.findOne({ nit })

    if (companyDB) {
      res.status(404).json({
        err: `The company ${companyDB.name} already exists`,
      });

      return
    }

    const company = new Company({ name, address, nit, phoneNumber })
    await company.save()
    res.json({
      message: "Company create",
      company
    });
  } catch (error) {
    res.status(404).json({
      err: error,
    });
  }

};

const updateCompany = async (req: Request, res: Response): Promise<void> => {

  const { id } = req.params
  const { _id, nit, ...companyUpdate } = req.body

  try {
    const company = await Company.findByIdAndUpdate(id, companyUpdate)
    res.json({
      message: "Company update",
      company
    });
  } catch (error) {
    res.status(404).json({
      err: error,
    });
  }


};

const deleteCompany = async(req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const company = await Company.findByIdAndDelete(id)
    res.json({
      message: "Company delete",
      company
    });
  } catch (error) {
    res.status(404).json({
      err: error,
    });
  }
};

export { getCompany, getCompanies, addCompany, updateCompany, deleteCompany };
