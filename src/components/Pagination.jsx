import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import "./css/Pagination.css";
import styled from "styled-components";

const Paginate = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 10px;
  list-style: none;
`;

const Page = styled.li`
  cursor: pointer;
`;

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange, onGotoFirstPage, onGotoLastPage} = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    let start_index = 0;
    if (currentPage > 1) start_index = currentPage - 2;

    const styles = {
        active : {backgroundColor:"#ECE5D0"}
    };
    const { active } = styles;

    const renderPageNumbers = () => {
        return pages.map((page) => {
            return (

              <li key={page} style={page === currentPage ? active : {}}>
                  <Link to={`/page/${page}`}> {page} </Link>
              </li>
              // <Page key={page} className={page === currentPage ? "page-item pointer active" : "page-item pointer"}>
              //     <Link className="page-link" to={`/page/${page}`}>{page}</Link>
              // </Page>
            );
        });
    }

    return (
        <div className="border1"> 
            {currentPage > 1 && (<div className="pre">
              <Link to={`/page/${currentPage-1}`}>Prev</Link>
            </div>)}

            <div className="number">
                <ul>
                    {renderPageNumbers()}
                </ul>
            </div>

            {currentPage < pagesCount && (<div className="next">
              <Link to={`/page/${currentPage+1}`}>Next</Link>
            </div>)}

            <div className="clearfix"> </div>
        </div>
      // <nav>
      //   <Paginate className="pagination">
      //     <span className="first" onClick={onGotoFirstPage}>
      //       {currentPage > 2 && "<<First"}
      //     </span>

      //     {renderPageNumbers()}

      //     <span className="first" onClick={() => onGotoLastPage(pagesCount)}>
      //       {currentPage !== pagesCount && "Last>>"}
      //     </span>
      //     <span className="total-pages">{`Page ${currentPage} out of ${pagesCount}`}</span>
      //   </Paginate>
      // </nav>

        // <div className="border1">
        //     <div className="pre">
        //       <Link to="#">Prev</Link>
        //     </div>
        //     <div className="number">
        //       <ul>
        //         <li><Link to="#">1</Link></li>
        //         <li><Link to="#">2</Link></li>
        //         <li><Link to="#">3</Link></li>
        //         <li><Link to="#">4</Link></li>
        //         <li><Link to="#">5</Link></li>
        //         <li><Link to="#">6</Link></li>
        //         <li><Link to="#">7</Link></li>
        //         <li><Link to="#">8</Link></li>
        //         <li><Link to="#">9</Link></li>
        //         <li><Link to="#">10</Link></li>
        //         <li><Link to="#">11</Link></li>
        //         <li><Link to="#">12</Link></li>
        //       </ul>
        //     </div>
        //     <div className="next">
        //       <Link to="#">Next</Link>
        //     </div>
        //     <div className="clearfix"> </div>
        // </div>
    );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
