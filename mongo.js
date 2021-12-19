const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log(
    "Please provide DB password, name and number as an argument: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://learning:${password}@cluster0.irh9p.mongodb.net/persons-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number
})

person.save().then((result) => {
  console.log(`added ${name} number ${number} to Phonebook`);
  mongoose.connection.close();
});

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

// Note.find({important:true}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });


// note.save().then((result) => {
//   console.log("Note saved!");
//   mongoose.connection.close();
// });
