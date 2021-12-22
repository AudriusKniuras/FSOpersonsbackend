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

app.get("/info", (request, response, next) => {
  Person.count({})
    .then((result) => {
      if (result) {
        response.end(
          `<p>Phonebook has info for ${result} people</p><p>${Date()}</p>`
        );
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((p) => {
      if (p) {
        response.json(p);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
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

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => response.json(savedPerson));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
