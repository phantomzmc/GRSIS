import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'lightbox-react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import images from './dataimage'
import LigthBoxImage from "../lightboxImg/lightbox";
import './image-grid.css'


class ImageLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: images,
            photoIndex: 0,
            isOpen: false,
            isOpenImage: false,
            data: [],
            counter: 0
        };
        this.onPressNextPage = this.onPressNextPage.bind(this)
    }
    componentDidMount() {
        console.log(images[0])
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
        data.push(images[photoIndex].src)
        this.props.addImage(data)
        this.counterimage()
    }
    ha

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
    render() {
        let { images, photoIndex, isOpen, isOpenImage } = this.state
        return (
            <div >
                <Gallery photos={images} onClick={() => this.setState({ isOpen: !this.state.isOpen, isOpenImage: !this.state.isOpenImage })} />
                {isOpen &&
                    <Lightbox
                        mainSrc={
                            <div className="ligthbox-style">
                                {isOpenImage &&
                                    <LigthBoxImage
                                        image={this.state.images[photoIndex].src}
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

}
const mapStateToProps = state => {
    return {

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