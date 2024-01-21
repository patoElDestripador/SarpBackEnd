const jsonServer = require('json-server');
const db = jsonServer.router("/data/data.json")
const port = 3001

const server = jsonServer.create();

// Configura el servidor
server.use(jsonServer.defaults());
server.use((req, res, next) => {
  // Agrega un encabezado personalizado a todas las respuestas
  res.setHeader('X-Custom-Header', 'foobar');
  next();
});

// Configura el filtrado
server.use(jsonServer.filters({
  // Filtra los usuarios por nombre
  '/users?name=John': (req, res, next) => {
    const users = db.users.filter((user) => user.name === 'John');
    res.json(users);
  }
}));

// Configura la paginación
server.use(jsonServer.pagination({perPage: 10}));

// Configura la ordenación
server.use(jsonServer.sorting({'/post': 'id'}));

// Inicia el servidor
server.listen(port, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
