import {Schema, model, Document }  from 'mongoose'

type UserType = Document & {
    email: string,
    password: string,
    name: string,
    lastName: string,
    rol: string
}


const UserSchema = new Schema({
    
    email:{
        type: String,
        require: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    name:{
        type: String,
        require: [true, 'The name is required']
    },
    lastName:{
        type: String,
        require: [true, 'The name is required']
    },
    rol:{
        type: String,
        emun: ['ADMIN_ROLE'],
        default: "ADMIN_ROLE"
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id
    return user;
}

export default model<UserType>("User", UserSchema);
export type {UserType}