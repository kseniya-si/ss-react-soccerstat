import { useEffect, useState } from "react";

function Pagination(props) {
  const [page, setPage] = useState(1);

  const pages = Math.ceil(props.count / props.perPage);

  useEffect(() => {
    props.callback({
      from: (page - 1) * props.perPage,
      to: page * props.perPage,
    });
  }, [page]);

  return (
    <div className="Pagination clearfix">
      {page === 1 ? (
        ""
      ) : (
        <span className="PaginateToLeft" onClick={() => setPage(page - 1)}>
          &larr;
        </span>
      )}
      {page === 1 ? (
        <span className="page active" onClick={() => setPage(1)}>
          1
        </span>
      ) : (
        <span className="page" onClick={() => setPage(1)}>
          1
        </span>
      )}
      <span className="ellipsis">...</span>

      {page >= 2 && page <= pages - 1 ? (
        <span className="active">{page}</span>
      ) : (
        ""
      )}

      <span className="ellipsis">...</span>

      {page === pages ? (
        <span className="page active" onClick={() => setPage(pages)}>
          {pages}
        </span>
      ) : (
        <span className="page" onClick={() => setPage(pages)}>
          {pages}
        </span>
      )}
      {page === pages ? (
        ""
      ) : (
        <span
          className="PaginateToRight active"
          onClick={() => setPage(page + 1)}
        >
          &rarr;
        </span>
      )}
    </div>
  );
}

export default Pagination;
