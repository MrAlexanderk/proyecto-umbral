export function notFound(req, res, next) {
  res.status(404).json({ error: 'Route not found' });
}

export function errorHandler(err, req, res, next) {
  console.error(err); // Por el momento solo un console log, después veré qué hacerle.
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Server error' });
}
