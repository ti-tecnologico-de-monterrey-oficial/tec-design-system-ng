// server.cjs
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// -----------------------------------------------------------------------------
// 📡 Endpoint principal
// -----------------------------------------------------------------------------
server.post('/GetAsignacionesTaxonomia', (req, res) => {
  try {
    // Obtiene el objeto { body: [...], pagination: {...} }
    const record = router.db.get('GetAsignacionesTaxonomia').value();

    // Si no existe o está vacío, devuelve error claro
    if (!record) {
      return res.status(404).jsonp({
        error: 'No se encontró la colección GetAsignacionesTaxonomia en db.json',
      });
    }

    // Extrae el array "body"
    const fullData = Array.isArray(record.body) ? record.body : [];

    // Parámetros de paginación del frontend
    const page = Number(req.body.page) || 1;
    const perPage = Number(req.body.perPage) || 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    // Segmenta los datos
    const pagedData = fullData.slice(start, end);

    // Calcula paginación real
    const pagination = {
      totalRegistros: fullData.length,
      totalPaginas: Math.ceil(fullData.length / perPage),
    };

    // Devuelve el formato esperado por Angular
    res.status(200).jsonp({
      body: pagedData,
      pagination,
    });
  } catch (err) {
    console.error('❌ Error en el endpoint /GetAsignacionesTaxonomia:', err);
    res.status(500).jsonp({
      error: 'Error interno del servidor',
      details: err.message,
    });
  }
});

// -----------------------------------------------------------------------------
// Resto de endpoints JSON Server
// -----------------------------------------------------------------------------
server.use(router);

// -----------------------------------------------------------------------------
// 🚀 Arranque del servidor
// -----------------------------------------------------------------------------
server.listen(3000, () => {
  console.log('✅ Mock API running at http://localhost:3000');
  console.log('📍 Endpoint activo: POST http://localhost:3000/GetAsignacionesTaxonomia');
});
