// https://scotch.io/tutorials/build-custom-pagination-with-react
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//These constants will be used to indicate points where we have page controls for moving left and right respectively.
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

// W create a helped method for creating a range of numbers
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30; // number of records to be show per page
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0; // total number of records to be paginated. Comes from API call.
    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0; // total page neighbours (show in component)
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit); // total pages to be shown, used math.ceil to capture excess records on last page.
    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.goToPage(1);
  }

  goToPage = page => {
    const { onPageChanged = f => f } = this.props;
    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPage: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = page => evt => {
    evt.preventDefault();
    this.goToPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.goToPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.goToPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */

  // This method handles the core logic for generating the page numbers to be shown on the pagination control. We want the first page and last page to always be visible.
  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }
        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <div className="ui right pagination menu">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <a
                  key={index}
                  href="##"
                  className="active item"
                  onClick={this.handleMoveLeft}
                >
                  <span aria-hidden>&laquo;</span>
                  <span>Previous</span>
                </a>
              );

            if (page === RIGHT_PAGE)
              return (
                <a
                  key={index}
                  href="##"
                  className="active item"
                  onClick={this.handleMoveRight}
                >
                  <span aria-hidden>&raquo;</span>
                  <span>Next</span>
                </a>
              );

            return (
              <a
                key={index}
                href="##"
                className={`${currentPage === page ? "active " : ""}item`}
                onClick={this.handleClick(page)}
              >
                {page}
              </a>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

// this is where we specify the TYPE of prop that is passed to the components. This is used above when calling "typeof" which verifies that what is received, is what is
// expected from the prop.
Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
