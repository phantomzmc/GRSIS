import React from 'react';
import Image from "react-image";
import Gallery from '../../lib/Gallery';
// import Lightbox from 'lightbox-react';
import Lightbox from 'react-images';
import { Container, Col, Row } from "reactstrap";
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
            pageNo : 1            
        };
        this.onPressNextPage = this.onPressNextPage.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
    }
    componentWillMount(){
        this.setState({
            eventid : this.props.event.event.EventID
        })
    }
    componentDidMount(){
        this.feedImage()
    }
    feedImage() {
        const token = this.props.token.token
        const uri = req[0].uspGetImageLists_
        const api_key = apikey[0].apikey
        let data = ({
            params: [
                { name: "EventID", value: this.state.eventid },
                { name: "PhotoGrapherID", value: "" },
                { name: "BibNumber", value: "" },
                { name: "Time", value: "" },
                { name: "PageNo", value: this.state.pageNo },
                { name: "RowPerPage", value: "36" }
            ]
        })

        axios.post(uri, data, {
            headers: {
                'Access-Control-Allow-Origin' :  '*',
                'X-Content-Type-Options': 'nosniff',
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": this.props.token.token,
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            // responseType: 'json'
        })
            .then((response) => {
                this.setState({ images: response.data });
                console.log(this.state.images)
            }).catch((error) => {
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
        this.props.addImage(data)
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
        this.setState({ pageNo: pageNum });
        console.log("pageNum" + pageNum)
        this.feedImage()
    }
    
    render() {
        let { photoIndex, isOpen, isOpenImage } = this.state
        return (
            //     <Gallery photos={images} onClick={() => this.setState({ isOpen: !this.state.isOpen, isOpenImage: !this.state.isOpenImage })} />
            <div>
                <div class='ui doubling four column grid'>
                    {
                        this.state.images.map((item, i) =>
                            <div class='column'>
                                <img src={item.ImageURL} class='ui image' onClick={() => this.setState({ isOpen: !this.state.isOpen, isOpenImage: !this.state.isOpenImage })} />
                                {isOpen &&
                                    <Lightbox
                                        mainSrc={
                                            <div className="ligthbox-style">
                                                {isOpenImage &&
                                                    <LigthBoxImage
                                                        image={this.state.images[photoIndex].ImageURL}
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
                                }
                            </div>
                        )
                    }
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
        event : state.event
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
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageLayout))