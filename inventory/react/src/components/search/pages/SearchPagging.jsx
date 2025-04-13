import React from 'react'
import { Link } from 'react-router-dom';

export const SearchPagging = ({useSearch}) => {

  const [paggingCurrentPage, setPaggingCurrentPage] = React.useState(0);
  const {search, filter, result} = useSearch;

  const handlePrevious = ()=>{
    let currentPage = filter.page;
    currentPage-=1
    if(currentPage >= 0) {
      search({page:currentPage});
    }
  }

  const handleNext = ()=>{
    let currentPage = filter.page;
    let pageCount   = result.totalPages;
    currentPage+=1;
    if(currentPage < pageCount)
      search({page:currentPage});
  }


  return (
   
     <div style={{marginTop:'10px', color:'black'}}> 
      <nav >
        <ul className="pagination">
          <li className="page-item">
            <Link className="page-link" onClick={handlePrevious} >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only"></span>
            </Link>
          </li>
          <li className="page-item"><Link className="page-link">{filter.page + 1}</Link> </li>
          <li className="page-item"><Link className="page-link"  >de</Link></li>
          <li className="page-item"><Link className="page-link"> {result.totalPages}</Link></li>
          <li className="page-item">
            <Link className="page-link"  onClick={handleNext} >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </div> 
    
  )
}
