import { Request, Response } from "express";
import Company from "../model/CompanySchema";
import Inventory from "../model/InventorySchema";

const getInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const inventory = Inventory.findById(id)
        res.json({
            inventory
        });

    } catch (error) {
        res.status(404).json({
            err: error,
        });
    }
}

const getInventories = async (req: Request, res: Response): Promise<void> => {
    try {
        const { companyId } = req.params
        console.log(companyId)
        const [total, inventories] = await Promise.all([
            Inventory.countDocuments({companyId: companyId}),
            Inventory.find({ companyId: companyId })
        ])
        res.json({
            total,
            inventories
        })
    } catch (error) {
        res.status(404).json({
            err: error,
        });
    }
}

const addInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, commentary, stock, companyId } = req.body

        const [inventoryDB, companyBD] = await Promise.all([
            Inventory.findOne({ name }),
            Company.findOne({ companyId })
        ])

        if (!companyBD) {
            res.status(404).json({
                message: `company does not exist`
            })
            return
        }
        if (inventoryDB) {
            res.status(404).json({
                message: `The inventory ${inventoryDB.name} already exists`
            })
            return
        }

        const inventory = new Inventory({ name, commentary, stock: Number(stock), companyId })
        await inventory.save()

        res.json({
            message: "Inventory create",
            inventory
        });

    } catch (error) {
        res.status(404).json({
            err: error,
        });
    }
}

const updateInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { _id, companyId, ...inventoryUpdate } = req.body
        const newInventory = await Inventory.findByIdAndUpdate(id, inventoryUpdate)
        res.json({
            message: "Inventory update",
            newInventory
        });
    } catch (error) {
        res.status(404).json({
            err: error,
        });
    }
}

const deleteInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const inventory = await Inventory.findByIdAndDelete(id)
        res.json({
          message: "Inventory delete",
           inventory
        });
      } catch (error) {
        res.status(404).json({
          err: error,
        });
      }
}



export {
    getInventory,
    getInventories,
    addInventory,
    updateInventory,
    deleteInventory,
}