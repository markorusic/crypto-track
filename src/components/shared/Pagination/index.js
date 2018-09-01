import React, { Component } from 'react'

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

export default class Pagination extends Component {

  constructor (props) {
    super(props)
    const { totalItems, perPage, pageNeighbours } = props
    const totalPages = Math.ceil(totalItems / perPage)

    this.state = {
      totalPages,
      pageNeighbours: Math.max(0, Math.min(pageNeighbours, 2))
    }
  }

  getPageNumbers = () => {

    const { currentPage } = this.props
    const { totalPages, pageNeighbours } = this.state

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pages = range(startPage, endPage)

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2
      const hasRightSpill = (totalPages - endPage) > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]

    }

    return range(1, totalPages)

  }

  onMoveLeft = () => {
    const { currentPage, onPageClick } = this.props
    onPageClick(currentPage - 1)
  }

  onMoveRight = () => {
    const { currentPage, onPageClick } = this.props
    onPageClick(currentPage + 1)
  }

  onPageClick = (page) => {
    const { onPageClick } = this.props
    onPageClick(page)
  }


  render() {
    const { currentPage, totalItems, itemType } = this.props
    const { totalPages } = this.state
    const pages = this.getPageNumbers()

    if (!totalItems || totalPages === 1) {
      return null
    }

    return (
      <div className="pagination-wrapper flex-sp-between">
        <div className="flex-sp-between">
          <span className="mr-10">
            <strong>{totalItems}</strong> {itemType}
          </span>
          <span>
            Page <strong>{currentPage} / {totalPages}</strong>
          </span>
        </div>
        <div className="flex-sp-between">
          <ul className="flex-list pagination">
            {pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" aria-label="Previous" onClick={this.onMoveLeft}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              );

              if (page === RIGHT_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" aria-label="Next" onClick={this.onMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              );

              return (
                <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                  <a className="page-link" onClick={() => { this.onPageClick(page) }}>{page}</a>
                </li>
              );

            })}

          </ul>
        </div>
      </div>
    )
  }
}
