const base64 = require("base-64");
// const pkgConfig = require("./package.json");
const vaultEndpoint = "https://vault.omise.co/tokens";
const apiEndpoint = "https://api.omise.co/charges";

let _publicKey;
let _secretKey;
let _apiVersion;

/**
 * ReactOmise
 */
class ReactOmise {

    /**
     * constructor
     */
    constructor() {
        this.createSource = this.createSource.bind(this);
        this.createToken = this.createToken.bind(this);
    }

    /**
     * To set a public key and API version
     * @param {String} publicKey
     * @param {String} secretKey
     * @param {String} apiVersion
     */
    config(publicKey, secretKey, apiVersion = "2015-11-17") {
        _publicKey = publicKey;
        _secretKey = secretKey
        _apiVersion = apiVersion;
    }

    /**
     * Get headers
     * @return {*} headers
     */
    getHeaders() {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Basic ' + base64.encode(_publicKey + ":"),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'
        };
        if (_apiVersion && _apiVersion !== "") {
            headers['Omise-Version'] = _apiVersion;
        }
        // console.log(headers)
        return headers;
    }
    getHeaders2() {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Basic ' + base64.encode(_secretKey + ":"),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'
        };
        if (_apiVersion && _apiVersion !== "") {
            headers['Omise-Version'] = _apiVersion;
        }
        // console.log(headers)
        return headers;
    }
    getHeaders3() {
        let headers = {
            'user': _secretKey,
            'Content-Type': 'application/json',
        };
        if (_apiVersion && _apiVersion !== "") {
            headers['Omise-Version'] = _apiVersion;
        }
        // console.log(headers)
        return headers;
    }

    /**
     * Create a token
     * @param {*} data
     */
    createToken(data) {
        const tokenEndpoint = vaultEndpoint;
        // set headers
        let headers = this.getHeaders();

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(tokenEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }

    /**
     * Create a source
     * @param {*} data
     */
    createSource(data) {
        // set headers
        let headers2 = this.getHeaders2();
        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(apiEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                mode : 'no-cors',
                headers: headers2,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    // reject(response.json());
                }
            }).catch((error) => {
                this.createSource(data)
                resolve(error)
            });
        });
    }
}


const reactOmise = new ReactOmise();

module.exports = {
    config: reactOmise.config,
    createToken: reactOmise.createToken,
    createSource: reactOmise.createSource,
}