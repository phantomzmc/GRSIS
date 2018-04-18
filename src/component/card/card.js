import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';

import dataEvent from '../../data/dataEvent'
import './card.css'

class CardEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount = () => {
        this.setState({ data: dataEvent })
    }
    render() {
        return (
            <div>
                {
                    this.state.data.map((dynamicData, i) =>
                    
                        <CardDeck>
                            <Card>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{dynamicData.name}</CardTitle>
                                    <CardSubtitle>{dynamicData.detail}</CardSubtitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>

                        </CardDeck>
                    )
                }

            </div>
        )
    }
}

export default CardEvents