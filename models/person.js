const mongoose = require("mongoose");
const uniqueValidor = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;
console.log("Connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB. ", error);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true, unique: true },
  number: { type: String, minLength: 8, required: true },
});

personSchema.plugin(uniqueValidor);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
