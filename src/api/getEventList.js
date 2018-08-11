const req = require("../config/uri_req")
const apikey = require("../config/apikey")
const axios = require("axios")


class GetEventLsit {
    getToken(token) {
        let tokens = token
        console.log(tokens)
        return tokens
    }
    getEvents(data) {
        // const api_key = "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88"
        const tokens = this.getToken();
        // const uri = "http://api.shutterrunning2014.com/api/v2/stris/_proc/Main.uspGetEventLists"
        const option = {
            method: 'POST',
            header: {
                "X-DreamFactory-API-Key": "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88",
                "X-DreamFactory-Session-Token": tokens,
                "Content-Type": 'application/json'
            },
            body: {
                params: [
                    { name: "Keyword", value: "" },
                    { name: "EventStatus", value: 1 },
                    { name: "PageNo", value: 1 },
                    { name: "RowPerPage", value: 30 }
                ]
            }
        }
        return fetch("http://api.shutterrunning2014.com/api/v2/stris/_proc/Main.uspGetEventLists", option)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

}

const getEventList = new GetEventLsit();

module.exports = {
    getEvents: getEventList.getEvents,
    getToken: getEventList.getToken
}
// export default GetEventLsit
