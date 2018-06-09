import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './pagenation.css'

class Pagenation extends React.Component {
    render() {
        return (
            <div className="pagenation">

                <Pagination aria-label="Page navigation example" className="page-item">
                    <PaginationItem disabled>
                        <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem active>
                        <PaginationLink href="#">
                            1
          </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            2
          </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            3
          </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            4
          </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            5
          </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#" />
                    </PaginationItem>
                </Pagination>
            </div>
        );
    }
}

export default Pagenation