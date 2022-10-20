import Company from "../model/CompanySchema";
import User from "../model/UserSchema";


const findCompanyById = async (id: string): Promise<void> => {
    const company = await Company.findById(id)

    if (!company) {
        throw new Error(`Id does not exist ${id} `)
    }
}

const emailExists = async (email: string) => {
    const existeEmail = await User.findOne({ email });
    
    if (existeEmail) {
        throw new Error(`The email: ${email} already registered `);
    }
}

export {
    findCompanyById,
    emailExists
}