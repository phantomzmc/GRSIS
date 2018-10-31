import req from './uri_req'
import api from './apikey'

let url = req[1].url_mailgun
let auth = api[0].api_mailgun

class MailGunSend {
    onSendInvoice(data) {
        let headers = {
            // 'Origin' : 'https://api.mailgun.net',
            'Access-Control-Allow-Origin':'*',
            'Authorization': auth,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Headers' : 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'
        }
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(url, {
            method: 'POST',
            headers: headers,
            mode : 'no-cors',
            cache: 'no-cache',
            body: formBody,

        }).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            })
    }
}


const mailgunsend = new MailGunSend();

export default  {
    onSendInvoice : mailgunsend.onSendInvoice
}