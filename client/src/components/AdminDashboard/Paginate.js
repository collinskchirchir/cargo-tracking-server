import React from 'react'

function Paginate({ shipmentsPerPage, totalShipments, paginate }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalShipments / shipmentsPerPage); i++) {
        pageNumbers.push(i)
    }
  return (
    <nav>
      <ul className='pagination ml-5 pl-5 mt-2'>
        {pageNumbers.map(pageNumber => (
            <li className='page-item page-numbers' key={pageNumber}>
                <button onClick={() => paginate(pageNumber)} className='page-link'>{pageNumber}</button>
            </li>
        ))}
      </ul>
    </nav>
  )
}

export default Paginate