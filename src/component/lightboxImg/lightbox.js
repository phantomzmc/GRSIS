import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import './lightbox.css'
import Lightbox from 'lightbox-react';
import TabsLightBox from './tabs/tabs'
import { Icon } from "semantic-ui-react";



class LigthBoxImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.image,
            imgDetail: this.props.detail,
            isOpen1: true,
            isOpen: false,
            layoutCart: false
        };
    }
    componentDidMount() {
        console.log(this.props.keyImage)
        console.log(this.state.imgDetail)
    }
    render() {
        return (
            <div className="row-style">
                {this.state.isOpen1 &&
                    
                    <img src={this.state.img} />

                }
                {this.props.onOpenTab &&
                    <Lightbox
                        mainSrc={
                            <div className="ligthboxTab-style">
                                <TabsLightBox
                                    detail={this.state.imgDetail}
                                    nextPages={() => this.props.nextPage()}
                                />
                            </div>

                        }
                        onCloseRequest={() => this.setState({ layoutCart: false, isOpen1: true })}
                    />
                }
                {
                    this.state.isOpen &&
                    <Lightbox
                        mainSrc={this.state.img}
                        onCloseRequest={() => this.setState({ isOpen: false, isOpen1: true })}

                    />

                }

            </div>
        )
    }
}

export default LigthBoxImage