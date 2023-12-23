import mongoose from "mongoose";
const {Schema} = mongoose;

const reviewSchema = new Schema({
gigID:{
    type:String,
    require:true
},
userId:{
    type:String,
    require:true
},
star:{
    type:Number,
    require:true,
    enum:[1,2,3,4,5]
},
description:{
    type:String,
    require:true
},


},{timestamps:true})
export default mongoose.model("Review", reviewSchema)
