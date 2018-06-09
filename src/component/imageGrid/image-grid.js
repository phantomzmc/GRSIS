import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'lightbox-react';
import { withRouter } from 'react-router-dom'
import images from './dataimage'
import LigthBoxImage from "../lightboxImg/lightbox";
import './image-grid.css'


class ImageLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: images,
            photoIndex: 0,
            isOpen: false
        };
        this.onPressNextPage = this.onPressNextPage.bind(this)
    }
    componentDidMount() {
        console.log(images[0])
    }
    onPressNextPage(){
        this.setState({ isOpen: !this.state.isOpen })        
        console.log("cart")
        this.props.history.push("/stepcontrol")
    }
    render() {
        let { images, photoIndex, isOpen } = this.state
        return (
            <div >
                <Gallery photos={images} onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
                {isOpen &&
                    <Lightbox
                        mainSrc={
                            <div className="ligthbox-style">
                                <LigthBoxImage 
                                    image={this.state.images[0].src}
                                    nextPage={this.onPressNextPage}
                                    close={this.onCloseRequest}
                                />
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

export default withRouter(ImageLayout)