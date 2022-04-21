import _ from "lodash";
import PropTypes from "prop-type";

const Pagination = (props) => {
  const { itemsCount, currentPage, pageSize, onPageChange } = props;
  console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);

  // dont display pagination if there is only one page
  if (pagesCount === 1) return null;
  // generate page number using lodash library
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination pagination-sm">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.fun.isRequired,
};

export default Pagination;
