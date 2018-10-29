import React from 'react';
import Lightbox from 'lightbox-react';
import ReactLoading from 'react-loading';
import { Container, Col, Row, Card, CardBody, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import axios from 'axios'
import images from './dataimage'
// import Modal from "react-responsive-modal";
import Pagenation from '../pagenation/pagenation'
import TabsLightBox from '../lightboxImg/tabs/tabs'
import req from '../../config/uri_req'
import apikey from '../../config/apikey'
import { Icon } from "semantic-ui-react";
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
            eventid: this.props.event.event.EventID,
            data: [],
            counter: 0,
            pageNo: 1,
            imagesFull: [],
            showimage: false,
            index: 0,
            isLoad: true,
            activeIndex: 0,
            openTab: false,
            noSugest: false
        };
        this.onPressNextPage = this.onPressNextPage.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
    }
    componentWillMount() {
        this.setState({
            eventid: this.props.event.event.EventID
        })

    }
    componentDidMount() {
        this.feedImage(this.props.event.event.EventID)
        // console.log(this.props.event.photoGraID)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.searchBib)
        console.log(this.props.searchBib)
        if (this.props.photograID != nextProps.event.photoGraID) {
            this.setState({ showimage: false })
            setTimeout(() => {
                this.feedImage(this.props.event.event.EventID)
            }, 100)
        }
        else if (this.props.searchBib === nextProps.searchBib) {
            console.log("shouldComponentUpdate searchBib")

        }
    }
    shouldComponentUpdate(nextProps) {
        if (images !== nextProps.images) {
            console.log("shouldComponentUpdate")
            return true
        }
        return true
    }
    componentDidUpdate(prevProps) {
        if (prevProps.searchBib !== this.props.searchBib) {
            images.splice(0)
            this.feedImage(this.props.evenid)
        }
        else if (prevProps.searchTime !== this.props.searchTime) {
            images.splice(0)
            this.feedImage(this.props.evenid)
        }
        else if(prevProps.photograID !== this.props.photograID){
            images.splice(0)
            this.feedImage(this.props.evenid)
        }
        else if(prevProps.photograID !== this.props.photograID){
            images.splice(0)
            this.feedImage(this.props.evenid)
        }
    }
    feedImage(eventid) {
        console.log("image-grid" + this.state.pageNo)
        const uri = req[0].uspGetImageLists_
        const api_key = apikey[0].apikey
        let data = ({
            params: [
                { name: "EventID", value: eventid },
                { name: "PhotoGrapherID", value: this.props.photograID },
                { name: "BibNumber", value: this.props.searchBib },
                { name: "Time", value: this.props.searchTime },
                { name: "PageNo", value: this.state.pageNo },
                { name: "RowPerPage", value: "33" }
            ]
        })
        console.log(data)
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
                this.setState({ showimage: true, images: response.data });
                console.log(this.state.images)
                this.checkSuggest(response.data)
            }).catch((error) => {
                this.setState({ isLoad: true, showimage: false })
                setTimeout(() => {
                    this.feedImage(this.props.evenid)
                }, 100)
                // this.props.history.push("./")
            });
    }
    checkSuggest(data) {
        if (data == "") {
            this.setState({ noSugest: true })
        }
        else if (data != "") {
            this.setState({ noSugest: false })
            data.map((item, index) => {
                var tem = {
                    src: item.ImageURL,
                    timer: item.ImageTakenTime
                }
                images.splice(index, 1, tem)
                setTimeout(() => {
                    // console.log(images)
                    this.setState({ showimage: true, isLoad: false })
                })
            })
        }
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
            this.setState({ isOpen: false, openTab: false })
            this.submit()
        }, 1000)
        data.push(images[photoIndex].ImageURL)
        // this.props.addImage(data)
        this.props.addOrderList(orderlist)
        this.props.addImage(orderlistFull)
        this.counterimage()
    }
    sendQuantity() {
        console.log(this.props.order.quantity)
        this.props.setQuantity(this.props.order.quantity)
        this.props.onSentQuantity(this.props.order.quantity)
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
                    label: <label style={{ fontFamily: 'kanit' }}>เลือกภาพอื่นต่อ</label>,
                    onClick: () => this.sendQuantity()
                }
            ]
        })
    };
    onChangePage = (pageNum) => {
        images.splice(0)
        this.setState({ pageNo: pageNum, showimage: false });
        console.log("pageNum" + pageNum)
        setTimeout(() => {
            this.feedImage(this.props.event.event.EventID)
        }, 100)
    }



    render() {
        let { photoIndex, isOpen, isOpenImage, index } = this.state
        return (
            <div>
                <Container>
                    {/* <Container id="contai"> */}
                    {
                        this.state.isLoad &&
                        <div className="container-isload">
                            <ReactLoading type="bubbles" color="#000" height={'15%'} width={'15%'} />
                        </div>
                    }
                    {this.state.showimage &&
                        <Row>
                            {images.map((dynamicData, i = 1) =>
                                <Col xs={12} sm={4} md={4}>
                                    {/* <div id="contai-img"> */}
                                    <div onClick={() => this.setState({ isOpen: !this.state.isOpen, isOpenImage: !this.state.isOpenImage, photoIndex: i })}>
                                        <div id="contai-timer">
                                            <span id="timer">{dynamicData.timer}</span>
                                        </div>
                                        <div id="contai-img2">
                                            <ImageWorker
                                                src={dynamicData.src}
                                                style={{ width: "100%", height: "50%", }}
                                            />
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </Col>
                            )}
                        </Row>
                    }

                    {this.state.noSugest &&
                        <Container>
                            <Row>
                                <Col xs={12} md={12} sm={12} lg={12}>
                                    <div className="no-suggest">
                                        <h3>ไม่พบรายการที่ค้นหา</h3>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    }
                </Container>
                {isOpen &&
                    <Lightbox
                        // mainSrc={
                        //     <div className="ligthbox-style">
                        //         <LigthBoxImage
                        //             detail={this.state.images[photoIndex]}
                        //             image={images[photoIndex].src}
                        //             keyImage={this.state.photoIndex}
                        //             nextPage={this.onPressNextPage}
                        //             onOpenTab={this.state.openTab}
                        //         />
                        //     </div>

                        // }
                        mainSrc={images[photoIndex].src}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() => this.setState({
                            photoIndex: (photoIndex + images.length - 1) % images.length,
                        })}
                        onMoveNextRequest={() => this.setState({
                            photoIndex: (photoIndex + 1) % images.length,
                        })}
                        imageTitle={
                            <span>{this.state.photoIndex + 1} / 35</span>
                        }
                        imageCaption={
                            <div id="btn-caption">
                                <Row>
                                    <Col xs={12} sm={3} md={3}>
                                        <div id="contai-caption">
                                            <span> รายการ : {this.props.event.event.EventName}</span>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={3} md={3}>
                                        <div id="contai-caption">
                                            {this.props.photograName === "" ?
                                                <span> รูปภาพจากช่างภาพทั้งหมด </span> :
                                                <span> รูปภาพโดย : {this.props.photograName} </span>
                                            }
                                        </div>

                                    </Col>
                                    <Col xs={12} sm={3} md={3}>
                                        <div id="contai-caption">
                                            <span> รูปภาพที่ {this.state.photoIndex + 1} จาก 35 รูป</span>
                                        </div>

                                    </Col>
                                    <Col xs={12} sm={3} md={3}>
                                        <Button color="success" outline onClick={() => this.setState({ openTab: true, isOpen: false })} id="btn-buy">
                                            <Icon name="cart" className="icon-full" />
                                            <span id="text-buy">สั่งซื้อภาพ</span>
                                        </Button>
                                    </Col>
                                </Row>

                            </div>
                        }
                    />
                }
                <Modal isOpen={this.state.openTab} toggle={() => this.setState({ openTab: false, isOpen: true })} size="lg">
                    <ModalHeader toggle={() => this.setState({ openTab: false, isOpen: true })}>
                        <p>รายละเอียดรูปภาพ</p>
                    </ModalHeader>
                    <div className="detail-img-tab">
                        <ModalBody>
                            <TabsLightBox
                                detail={this.state.images[photoIndex]}
                                nextPages={this.onPressNextPage}
                            />
                        </ModalBody>
                    </div>
                </Modal>
                {/* {this.state.openTab &&
                    <Lightbox
                        mainSrc={
                            <div className="ligthboxTab-style">
                                <TabsLightBox
                                    detail={this.state.images[photoIndex]}
                                    nextPages={this.onPressNextPage}
                                />
                            </div>

                        }
                        onCloseRequest={() => this.setState({ openTab: false })}
                    />
                } */}
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
        event: state.event,
        order: state.order
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
        },
        setQuantity: (quantity) => {
            dispatch({
              type: "setQuantity",
              payload: quantity
            })
          }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageLayout))