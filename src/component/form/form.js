import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Button } from 'semantic-ui-react'

import './form.css'
import { connect } from 'react-redux'
import dataCart from '../../data/dataCart'
import SugestTambon from './sugestion/sug_tambon'
import SugestAmphoe from './sugestion/sug_amphoe'
import SugestProvince from './sugestion/sug_province'
import SugestCountry from './sugestion/sug_country'

class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formAddress: false,
            submitBtn: true,
            tumpon: "",
            amphoe: "",
            province: "",
            country: "",
            totalPrice: this.props.order.totalPrice,
            postPrice : this.props.order.pricePost == undefined || null ? 0.0 : this.props.order.pricePost
        }
        this.sumPricePost = this.sumPricePost.bind(this)
    }
    componentWillMount() {
        this.checkFormAddress()
        this.sumPricePost()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.onStatusForm != this.props.onStatusForm) {
            this.handleSubmit
            console.log(nextProps.onStatusForm + "" + this.props.onStatusForm)
        }
    }
    sumPricePost() {
        const price = this.state.totalPrice
        const pricepost = this.state.postPrice
        const totalPrice = (price + pricepost)
        // this.props.setPricePost(parseFloat(pricepost).toFixed(2))
        this.props.setTotalPrice(parseFloat(totalPrice).toFixed(2))

    }
    checkFormAddress() {
        for (const index in dataCart) {
            // console.log(`dataCart.${index} = ${dataCart[index].FormatBuyImageID}`);
            if (dataCart[index].FormatBuyImageID == 2 || dataCart[index].FormatBuyImageID == 3) {
                this.setState({ formAddress: true })
                // this.sumPricePost()
            }
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitBtn: false })
        this.checkDataAddress()
    }

    checkDataAddress() {
        if (this.state.formAddress !== true) {
            const dataAddress = {
                name: this.getName.value,
                lastname: this.getLastname.value,
                email: this.getEmail.value,
                tel: this.getTel.value,
            }
            this.props.setAddress(dataAddress)
            this.props.onNextPage(dataAddress)
        }
        else if (this.state.formAddress === true) {
            const dataAddress = {
                name: this.getName.value,
                lastname: this.getLastname.value,
                email: this.getEmail.value,
                tel: this.getTel.value,
                address: this.getAddress.value,
                street: this.getStreet.value,
                tumpon: this.state.tumpon,
                amphoe: this.state.amphoe,
                province: this.state.province,
                passcode: this.getPasscode.value,
                country: this.state.country,
                help: this.getWarn.value,
            }
            this.props.setAddress(dataAddress)
            this.props.onNextPage(dataAddress)
        }
    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12}>
                            <h2>กรุณากรอกรายละเอียด</h2>
                            <Form className="form-register" onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for="username" sm={2} md={2} xs={12}>ชื่อ (จำเป็น)</Label>
                                    <Col sm={4} md={4} xs={12}>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Ex.ชื่อ............"
                                            innerRef={(input) => this.getName = input}
                                        />
                                    </Col>
                                    <Label for="lastname" sm={2} md={2} xs={12}>นามสกุล (จำเป็น)</Label>
                                    <Col sm={4} md={4} xs={12}>
                                        <Input
                                            type="text"
                                            name="surname"
                                            placeholder="Ex.นามสกุล..........."
                                            innerRef={(input) => this.getLastname = input} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email (จำเป็น)</Label>
                                    <Col sm={10}>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Ex.Abc@gmail.com"
                                            innerRef={(input) => this.getEmail = input}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="tel" sm={2}>โทรศัพท์ (จำเป็น)</Label>
                                    <Col sm={10}>
                                        <Input
                                            type="text"
                                            name="tel"
                                            placeholder="Ex.090-3198XXX"
                                            innerRef={(input) => this.getTel = input}
                                        />
                                    </Col>
                                </FormGroup>
                                {this.state.formAddress &&
                                    <div>
                                        <FormGroup row>
                                            <Label for="username" sm={2}>บ้านเลขที่/อาคาร :  </Label>
                                            <Col sm={4}>
                                                <Input
                                                    type="text"
                                                    placeholder="Ex.100/xx"
                                                    innerRef={(input) => this.getAddress = input} />
                                            </Col>
                                            <Label for="lastname" sm={2}>ซอย/ถนน : </Label>
                                            <Col sm={4}>
                                                <Input
                                                    type="text"
                                                    placeholder="Ex.ถนน ......"
                                                    innerRef={(input) => this.getStreet = input}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="tel" sm={2}>แขวง/ตำบล : </Label>
                                            <Col sm={4}>
                                                <SugestTambon
                                                    setTambon={(value) => this.setState({ tumbon: value })}
                                                />
                                                {/* <Input type="text" name="tel" id="tel" placeholder="Ex.090-3198XXX" /> */}
                                            </Col>
                                            <Label for="username" sm={2}>เขต/อำเภอ :  </Label>
                                            <Col sm={4}>
                                                <SugestAmphoe
                                                    setAmphone={(value) => this.setState({ amphoe: value })}
                                                />
                                                {/* <Input type="text" name="username" id="username" placeholder="Ex.ชื่อ............" /> */}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="lastname" sm={2}>จังหวัด : </Label>
                                            <Col sm={4}>
                                                <SugestProvince
                                                    setProvince={(value) => this.setState({ province: value })}
                                                />
                                                {/* <Input type="text" name="lastname" id="lastname" placeholder="Ex.นามสกุล..........." /> */}
                                            </Col>
                                            <Label for="tel" sm={2}>รหัสไปรษณีย์ : </Label>
                                            <Col sm={4}>
                                                <Input
                                                    type="text"
                                                    placeholder="Ex.10160"
                                                    innerRef={(input) => this.getPasscode = input}
                                                />                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="username" sm={2}>ประเทศ :  </Label>
                                            <Col sm={10}>
                                                <SugestCountry
                                                    setCountry={(value) => this.setState({ country: value })}
                                                />
                                            </Col>
                                        </FormGroup>

                                    </div>
                                }
                                {/* <div>
                                    <FormGroup row>
                                        <Label for="address" sm={2}>ที่อยู่การจัดส่ง : </Label>
                                        <Col sm={10} xs={12}>
                                            <Input type="textarea" name="text" id="exampleText" rows="4" />
                                        </Col>
                                    </FormGroup>
                                </div> */}
                                <FormGroup row>
                                    <Label for="tel" sm={2}>หมายเหตุ : </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="text"
                                            placeholder="อยากได้อะไรบอกพี่ตุ้มได้นะจ๊ะ"
                                            innerRef={(input) => this.getWarn = input}
                                        />
                                        {/* <Input type="text" name="tel" id="tel" placeholder="อยากได้อะไรบอกพี่ตุ้มได้นะจ๊ะ" /> */}
                                    </Col>
                                </FormGroup>
                                <div id="btn-submit">
                                    <Button inverted color='red' onClick={() => this.props.clickPrev()} className="btn-prev">
                                        <p>ย้อนกลับ</p>
                                    </Button>
                                    <Button inverted color='green' onClick={() => this.props.clickNext()} className="btn-next" type="submit">
                                        <p>ไปยังชำระค่าบริการ</p>
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        order: state.order
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAddress: (dataAddress) => {
            dispatch({
                type: "setAddress",
                payload: dataAddress
            })
        },
        setPricePost: (pricepost) => {
            dispatch({
                type: "setPricePost",
                payload: pricepost
            })
        },
        setTotalPrice: (totalPrice) => {
            dispatch({
                type: "setTotalPrice",
                payload: totalPrice
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormRegister);