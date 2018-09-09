import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { range } from 'helpers/math'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

class Pagination extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    perPage: PropTypes.number,
    pageNeighbours: PropTypes.number,
    resourceNamePlural: PropTypes.string,
    onPageClick: PropTypes.func,
    onReset: PropTypes.func
  }

  static defaultProps = {
    items: [],
    perPage: 10,
    pageNeighbours: 3,
    resourceNamePlural: 'items',
    onPageClick: () => { },
    onReset: () => { }
  }

  initialState = {
    currentPage: 1
  }

  state = this.initialState

  reset = () => {
    this.setState(this.initialState, () => {
      this.props.onReset(this.state)
    })
  }

  getItemsToShow = () => {
    const { items, perPage } = this.props
    const { currentPage } = this.state
    const offset = (currentPage - 1) * perPage
    return items.slice(offset, offset + perPage)
  }

  getTotalPages = () => Math.ceil(this.props.items.length / this.props.perPage)

  getPageNeighbours = () => Math.max(0, Math.min(this.props.pageNeighbours, 2))

  getPageNumbers = () => {
    const { currentPage } = this.state
    const totalPages = this.getTotalPages()
    const pageNeighbours = this.getPageNeighbours()

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

  getStateAndHelpers = () => ({
    ...this.state,
    totalPages: this.getTotalPages(),
    items: this.getItemsToShow(),
    renderPagination: this.renderPagination
  })

  onPageClick = (currentPage) => {
    this.setState({ currentPage }, () => {
      this.props.onPageClick(this.state.page)
    })
  }

  onMoveLeft = () => {
    const { currentPage } = this.props
    this.onPageClick(currentPage - 1)
  }

  onMoveRight = () => {
    const { currentPage } = this.props
    this.onPageClick(currentPage + 1)
  }


  renderPagination = () => {
    const { items, resourceNamePlural } = this.props
    const { currentPage } = this.state
    const totalItems = items.length
    const totalPages = this.getTotalPages()
    const pages = this.getPageNumbers()

    if (!totalItems || totalPages === 1) {
      return null
    }

    return (
      <div className="pagination-wrapper flex-sp-between">
        <div className="flex-sp-between">
          <span className="mr-10 font-size-15 delimiter">
            <strong>{totalItems}</strong> {resourceNamePlural}
          </span>
          <span className="font-size-20">
            Page <strong>{currentPage} / {totalPages}</strong>
          </span>
        </div>
        <div className="flex-sp-between">
          <ul className="flex-list pagination">
            {pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index} className="page-item" onClick={this.onMoveLeft}>
                  <span className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </span>
                </li>
              )

              if (page === RIGHT_PAGE) return (
                <li key={index} className="page-item" onClick={this.onMoveRight}>
                  <span className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </span>
                </li>
              )

              return (
                <li
                  key={index}
                  className={`page-item${currentPage === page ? ' active' : ''}`}
                  onClick={() => { this.onPageClick(page) }}
                >
                  <span className="page-link">{page}</span>
                </li>
              )

            })}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

export default Pagination
