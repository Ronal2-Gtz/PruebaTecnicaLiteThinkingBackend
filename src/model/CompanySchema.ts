import {Schema, model, Document }  from 'mongoose'

type CompanyType = Document & {
    name: string
    address: string
    nit: string
    cellPhonbeNumber: number
}

const CompanySchema = new  Schema({
    name:{
        type: String,
        require: [true, 'The name is required']
    },
    address:{
        type: String,
        require: [true, 'The address is required']
    },
    nit:{
        type: String,
        require: [true, 'The nit is required'],
        unique: true
    },
    phoneNumber:{
        type: Number,
        require: [true, 'The cell phone number is required']
    },
})

export default model<CompanyType>("Company", CompanySchema);
export type {CompanyType}