//User Model
import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

const userSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Admin", "Client"],
      required: [true, "Plase select a type!"],
      trim: true,
    },
    firstname: {
      type: String,
      required: [true, "Please key in a first name!"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Please key in a last name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please key in an email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please key in a password!"],
      minlength: 5,
      maxlength: 50,
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//Middleware for password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds);
  }
  next();
});

//Compares the incoming password to the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return compare(password, this.password);
};

//Virtual that retrieves number of user's projects
userSchema.virtual("projectCount").get(function () {
  return this.project.length;
});

const User = model("User", userSchema);
export default User;
