import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    img:{
        type:String,
        require:false,
    },
    country:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:false,
    },
    description:{
        type:String,
        require:false,
    },
    isSeller:{
        type:Boolean,
        require:false,
        default:false,
    },
    
    
},
{
    timestamps:true
}
);
export default mongoose.model("User", userSchema)