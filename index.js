const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();


app.use(cors())
app.use(express.json());

morgan.token('body', function getBody(req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body',))


let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.end("<h1>This is persons backend API</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.end(
    `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
  );
});

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
  const generatedId = () => {
    const maxId =
      persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
    return maxId + 1;
  };

  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  } else if (persons.find((p) => p.name === body.name)) {
    return response.status(409).json({
      error: "Name already exists",
    });
  }
  const person = {
    name: body.name,
    number: body.number || "",
    id: generatedId(),
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});