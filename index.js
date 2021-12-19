const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const Person = require("./models/person");

morgan.token("body", function getBody(req) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((p) => response.json(p));
});

// app.get("/info", (request, response) => {
//   response.end(
//     `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
//   );
// });

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  // Person.find({ name: body.name }).then((result) => {
  //   return response.status(409).json({ error: "Name already exists" });
  // });
  console.log(Person.find({name: body.name}));

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => response.json(savedPerson));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
