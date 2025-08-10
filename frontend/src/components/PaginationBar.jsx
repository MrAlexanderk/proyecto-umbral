
const PaginationBar = ({
  total,
  startIdx,
  endIdx,
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [6, 12, 24, 48],
  onPageChange,
  onPageSizeChange,
}) => {
  const getPageButtons = () => {
    const items = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      const left = Math.max(2, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);
      items.push(1);
      if (left > 2) items.push("ellipsis-left");
      for (let i = left; i <= right; i++) items.push(i);
      if (right < totalPages - 1) items.push("ellipsis-right");
      items.push(totalPages);
    }
    return items;
  };

  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3">
      <div className="text-gray-custom small">
        Showing {total === 0 ? 0 : startIdx + 1}–{endIdx} of {total}
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          className="btn-clear"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          title="Anterior"
        >
          ‹ Prev
        </button>

        <div className="d-flex align-items-center gap-2">
          {getPageButtons().map((item, idx) =>
            typeof item === "number" ? (
              <button
                key={`p-${item}-${idx}`}
                className="chip btn-clear"
                onClick={() => onPageChange(item)}
                disabled={item === currentPage}
                aria-current={item === currentPage ? "page" : undefined}
                title={`Ir a página ${item}`}
              >
                {item}
              </button>
            ) : (
              <span key={item + idx} className="text-gray-custom">
                …
              </span>
            )
          )}
        </div>

        <button
          className="btn-clear"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          title="Siguiente"
        >
          Next ›
        </button>
      </div>

      <div className="d-flex align-items-center gap-2">
        <span className="text-gray-custom small">Limit</span>
        <select 
          className="input-square"
          value={pageSize}
          onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
          aria-label="Resultados por página"
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginationBar;
