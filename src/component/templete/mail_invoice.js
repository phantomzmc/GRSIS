import React, { Component } from 'react'
import dataCart from '../../data/dataCart'

class MailInvoice extends Component {

    render() {
        return (
            <div>
                <html>
                    <body style={{ margin: 5, padding: 5 }}>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td style={{ textAlign: 'center' }}>
                                    {this.props.status === 1 ?
                                        <h3>Order ชำระเงินเรียบร้อยแล้ว</h3>
                                        :
                                        <h3>Order รอการตรวจสอบการชำระเงิน</h3>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center', color: "#FA8601" }}>
                                    {this.props.status === 1 ?
                                        <p>ข้อมูลการสั่งซื้อของท่านถูกบันทึกไว้ในระบบแล้ว กรุณารออีเมล์เพื่อแจ้งการจัดส่งภาพอีกครั้ง</p>
                                        :
                                        <p>ข้อมูลการสั่งซื้อของท่านถูกบันทึกไว้ในระบบแล้ว</p>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <hr style={{ width: '100%', borderColor: "#FA8601" }} />
                                </td>
                            </tr>
                        </table>
                        <h4 style={{ color: "#FA8601" }}>ใบเสร็จหมายเลขที่ #{this.props.idinvoice}</h4>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <th>#</th>
                                <th>รายละเอียด</th>
                                <th>ขนาด</th>
                                <th>จำนวน</th>
                                <th style={{ textAlign: 'right' }}>ทั้งหมด</th>
                            </tr>
                            {dataCart.map((item, index) =>
                                <tr style={{ textAlign: 'center' }}>
                                    <td>
                                        <p>{index + 1}</p>
                                    </td>
                                    <td>{item.Detail}</td>
                                    <td>{item.Size}</td>
                                    <td>{item.Quantity}</td>
                                    <td style={{ textAlign: 'right' }}>{item.Price} บาท</td>
                                </tr>
                            )
                            }

                            <tr style={{ textAlign: 'right' }}>
                                <td colspan="4">ค่าจัดส่ง</td>
                                <td>{this.props.postPrice} บาท</td>
                            </tr>
                            <tr style={{ textAlign: 'right' }}>
                                <td colspan="4">ค่าธรรมเนียมการใชับัตรเครดิต/เดบิต</td>
                                <td>{this.props.creditPrice} บาท</td>
                            </tr>
                            <tr style={{ textAlign: 'right' }}>
                                <td colspan="4"><b>รวมทั้งหมด</b></td>
                                <td><b>{this.props.price} บาท</b></td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <span>หมายเหตุ</span>
                                    <ul>
                                        <li>ไฟล์ภาพจะจัดส่งทันที ที่ตรวจสอบการชำระเงินเรียบร้อย กรุณาตรวจสอบใน Junk หรือ Spam mail</li>
                                        <li>รูปอย่างเดียวจะจัดส่งทุกวันศุกร์สำหรับออเดอร์ที่สั่งซื้อภายในวันพุธ</li>
                                        <li>รูปภาพพร้อมกรอบจะใช้เวลาประมาณ 25 วันโดยประมาณ เสร็จเรียบร้อยจะจัดส่งทางไปรษณีย์</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center', color: "#FA8601" }} colspan="5">
                                    <span>อีเมล์ฉบับนี้เป็นระบบตอบกลับอัตโนมัติ กรุณาอย่าตอบกลับในเมล์นี้
                    หากต้องการความช่วยเหลือเพิ่มเติม โปรดโทรติดต่อ 081-7344644</span>
                                </td>
                            </tr>
                        </table>
                        <hr style={{ width: '100%', borderColor: "#FA8601" }} />
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style={{ textAlign: 'center' }}>
                            <tr>
                                <th style={{ color: "#FA8601" }}><b>Shutter Running Image Service</b></th>
                            </tr>
                            <tr>
                                <td>7 Market Today krungthepkreetra 7 Huamark Bangkepi</td>
                            </tr>
                            <tr>
                                <td>Bangkok, Thailand 10240</td>
                            </tr>
                            <tr>
                                <td>Phone:(+66)61 734 4044</td>
                            </tr>
                            <tr>
                                <td style={{ color: "#FA8601" }}>http://shutterrunning.com</td>
                            </tr>
                        </table>
                    </body>
                </html>
            </div>
        )
    }
}


export default MailInvoice