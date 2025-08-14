export function withPagination(defaultLimit = 50, maxLimit = 100) {
  return (req, _res, next) => {
    const rawLimit  = Number(req.query.limit);
    const rawOffset = Number(req.query.offset);

    req.pagination = {
      limit: Number.isFinite(rawLimit) && rawLimit > 0
        ? Math.min(rawLimit, maxLimit)
        : defaultLimit,
      offset: Number.isFinite(rawOffset) && rawOffset >= 0
        ? rawOffset
        : 0,
    };

    next();
  };
}
