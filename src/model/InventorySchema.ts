import { Schema, model, Document } from 'mongoose'

type InventoryType = Document & {
    name: string
    commentary: string
    stock: string
}

const InventorySchema = new Schema({
    name: {
        type: String,
        require: [true, 'The name is required'],
        unique: true
    },
    commentary: {
        type: String,
        require: [true, 'The commentary is required']
    },

    stock: {
        type: Number,
        require: [true, 'The stock is required']
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
})


export default model<InventoryType>("Inventory", InventorySchema);
export type { InventoryType }