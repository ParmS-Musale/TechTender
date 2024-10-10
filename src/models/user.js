const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required:true,
      minLength:4,
      maxLength:20,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required:true,
      unique:true,
      trim : true,
    },
    age: {
      type: Number,
      min :18 ,
    },
    gender: {
      type: String,
      validate(value){
        if(!["male", "female" ,"others"].includes(value)){
          throw new Error("Gender should be male, female or others");
        }
      }
    },
    password: {
      type: String,
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default : "This is the default description",
    },
    image: {
      type: String,
      default : "This is the default image",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
