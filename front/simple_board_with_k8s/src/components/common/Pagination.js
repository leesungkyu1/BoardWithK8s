import { Pagination } from "../../../node_modules/react-bootstrap/esm/index";
import Body from "./Body";

const Pagenation = ({page, pageObject, pageMoveClick}) => {
    const {first, last} = pageObject;
    const pageItemRendering = (first, last, page) => {
        let pageItemArr = [];

        for (let i=first; i<=last; i++){
            pageItemArr.push(
                <Pagination.Item
                    key={i}
                    active={page === i ? true : false}
                    onClick={() => pageMoveClick(i)}
                >{i}</Pagination.Item> 
            );
        }

        return pageItemArr;
    };

    return <>
        <Body>
            <Pagination className="justify-content-md-center">
                <Pagination.First onClick={() => pageMoveClick(1)}/>
                    {pageItemRendering(first, last, page)}
                <Pagination.Last onClick={() => pageMoveClick(last)}/>
            </Pagination>
        </Body>
    </>
};

export default Pagenation;