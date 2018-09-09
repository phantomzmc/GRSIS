import React from 'react';
import Image from "react-image";
// import Gallery from '../../lib/Gallery';
import Gallery from 'react-photo-gallery';
// import Modal from "react-responsive-modal";
import Modal from 'react-modal';

import Lightbox from 'lightbox-react';
import ReactLoading from 'react-loading';
import { Container, Col, Row, Table } from "reactstrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import axios from 'axios'
import images from './dataimage'
import LigthBoxImage from "../lightboxImg/lightbox";
import Pagenation from '../pagenation/pagenation'
import req from '../../config/uri_req'
import apikey from '../../config/apikey'
import './image-grid.css'
import ImageWorker from 'react-worker-image';
import StackGrid from "react-stack-grid";
import orderlist from '../../json/orderlist'
import orderlistFull from '../../json/orderlistFull';


class ImageLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: images,
            photoIndex: 0,
            isOpen: false,
            isOpenImage: false,
            eventid: "214",
            data: [],
            counter: 0,
            pageNo: 1,
            imagesFull: [],
            showimage: false,
            index: 0,
            isLoad: true
        };
        this.onPressNextPage = this.onPressNextPage.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
    }
    componentWillMount() {
        this.setState({
            eventid: this.props.event.event.EventID
        })
        this.feedImage(this.props.event.event.EventID)

    }
    componentDidMount() {
        console.log(this.props.event.photoGraID)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.event.photoGraID)
        console.log(this.props.photograID)
        if (this.props.photograID != nextProps.event.photoGraID) {
            this.setState({ showimage: false })
            setTimeout(() => {
                this.feedImage(this.props.event.event.EventID)
            }, 100)
        }
    }
    shouldComponentUpdate(nextProps) {
        if (images !== nextProps.images) {
            console.log("shouldComponentUpdate")
            return true
        }
        return true
    }
    feedImage(eventid) {
        const token = this.props.token.token
        const uri = req[0].uspGetImageLists_
        const api_key = apikey[0].apikey
        let data = ({
            params: [
                { name: "EventID", value: eventid },
                { name: "PhotoGrapherID", value: this.props.event.photoGraID },
                { name: "BibNumber", value: "" },
                { name: "Time", value: "" },
                { name: "PageNo", value: this.state.pageNo },
                { name: "RowPerPage", value: "36" }
            ]
        })

        axios.post(uri, data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'X-Content-Type-Options': 'nosniff',
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": this.props.token.token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            // responseType: 'json'
        })
            .then((response) => {
                this.setState({ images: response.data, showimage: true, isLoad: false });
                console.log(this.state.images)
                this.state.images.map((item, index) => {
                    var tem = { src: item.ImageURL }
                    console.log(tem)
                    images.splice(index, 1, tem)
                })
                // this.state.images.map((item, index) => {
                //     var tem = item.ImageURL
                //     console.log(tem)
                //     images.splice(index, 1, tem)
                // })
            }).catch((error) => {
                this.setState({ isLoad: true, showimage: false })
                console.log(error)
                this.props.history.push("./")
            });
    }
    counterimage() {
        let { count, countter } = 0
        countter = this.state.counter + 1
        this.setState({ counter: countter })
        this.props.counterCart(countter)
    }
    onPressNextPage() {
        let { image, photoIndex, data } = this.state
        this.setState({ isOpenImage: false })
        console.log("cart")
        setTimeout(() => {
            this.setState({ isOpen: false })
            this.submit()
        }, 1000)
        data.push(images[photoIndex].ImageURL)
        // this.props.addImage(data)
        this.props.addOrderList(orderlist)
        this.props.addImage(orderlistFull)
        this.counterimage()
    }

    submit = () => {
        confirmAlert({
            title: <label style={{ fontFamily: 'kanit' }}>ข้อมูลการสั่งซื้อ</label>,
            message: <label style={{ fontFamily: 'kanit' }}>คุณต้องการจะดูรายการที่คุณสั่งซื้อ หรือต้องการเลือกภาพอื่นๆต่อไป</label>,
            buttons: [
                {
                    label: <label style={{ fontFamily: 'kanit' }}>ดูรายการที่สั่งซื้อ</label>,
                    onClick: () => this.props.history.push("/stepcontrol")

                },
                {
                    label: <label style={{ fontFamily: 'kanit' }}>เลือกภาพอื่นต่อ</label>
                    // onClick: () => this.setState({ isOpenImage: true })
                }
            ]
        })
    };
    onChangePage = (pageNum) => {
        this.setState({ pageNo: pageNum, showimage: false });
        console.log("pageNum" + pageNum)
        setTimeout(() => {
            this.feedImage(this.props.event.event.EventID)

        }, 100)
    }
    handleClickPrev = () => {
        this.setState({ index: this.state.index - 1 });
    };

    handleClickNext = () => {
        this.setState({ index: this.state.index + 1 });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        let { photoIndex, isOpen, isOpenImage, index } = this.state
        return (
            <div>
                <Container>
                    {
                        this.state.isLoad &&
                        <div className="container-isload">
                            <ReactLoading type="bubbles" color="#000" height={'15%'} width={'15%'} />
                        </div>
                    }
                    {this.state.showimage &&
                        // <Row>
                        <Row>
                            {
                                images.map((dynamicData, i = 0) =>
                                    <Col xs={12} md={4} sm={3}>
                                        <div onClick={() => this.setState({ isOpen: !this.state.isOpen, isOpenImage: !this.state.isOpenImage, photoIndex: i })}>
                                            <ImageWorker
                                                src={dynamicData.src}
                                                style={{ width: "100%", height: "50%" }}
                                                containerClass="container-style"
                                            />
                                        </div>
                                    </Col>
                                )}

                        </Row>

                        // <Gallery
                        //     photos={images}
                        //     onClick={() => this.setState({ isOpen: !this.state.isOpen, isOpenImage: !this.state.isOpenImage })} />
                    }
                </Container>

                <div>

                    {/* {isOpen &&
                        <Lightbox
                            mainSrc={
                                <div className="ligthbox-style">
                                    {isOpenImage &&
                                        <LigthBoxImage
                                            detail={this.state.images[photoIndex]}
                                            image={images[photoIndex].src}
                                            nextPage={this.onPressNextPage}
                                        />
                                    }
                                </div>

                            }
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() => this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })}
                            onMoveNextRequest={() => this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })}
                        />
                    } */}
                    <Modal
                        isOpen={this.state.isOpen}
                        onRequestClose={this.closeModal}
                        className="customStyles"
                    >
                        {isOpenImage &&
                            <div className="ligthbox-style">
                                <Container>
                                    <Row>
                                        <Col xs="12" md="12" sm="12">
                                            <LigthBoxImage
                                                detail={this.state.images}
                                                image={images[photoIndex].src}
                                                nextPage={this.onPressNextPage}
                                            />
                                        </Col>
                                    </Row>
                                </Container>

                            </div>
                        }
                    </Modal>
                    {/* <Modal
                        open={this.state.isOpen}
                        onClose={() => this.setState({ isOpen: false })}
                        center
                        classNames="modal-custom">
                        {isOpenImage &&
                            <div className="ligthbox-style">
                                <LigthBoxImage
                                    detail={this.state.images}
                                    image={images[photoIndex].src}
                                    nextPage={this.onPressNextPage}
                                />
                            </div>
                        }
                    </Modal> */}
                </div>

                <div className="pagenation">
                    <Pagenation
                        numPage={(page) => this.onChangePage(page)} />
                </div>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        token: state.token,
        event: state.event
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addImage: (image) => {
            dispatch({
                type: "addImage",
                payload: image
            })
        },
        counterCart: (counter) => {
            dispatch({
                type: "counterCart",
                payload: counter
            })
        },
        addOrderList: (orderlist) => {
            dispatch({
                type: "addOrderList",
                payload: orderlist
            })
        },
        addOrderListFull: (orderlistFull) => {
            dispatch({
                type: "addOrderListFull",
                payload: orderlistFull
            })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageLayout))