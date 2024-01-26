import { Pagination } from "../../../node_modules/react-bootstrap/esm/index";
import Body from "./Body";
import Container from "../../../node_modules/react-bootstrap/esm/index";
import Row from "../../../node_modules/react-bootstrap/esm/index";
import Col from "../../../node_modules/react-bootstrap/esm/index";

const Pagenation = () => {
    return <>
        <Body>
            <Pagination className="justify-content-md-center">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </Body>
    </>
};

export default Pagenation;