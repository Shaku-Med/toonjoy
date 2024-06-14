import CryptoJS from 'crypto-js'
import { enc, dec } from 'encmed';

let Objects = {
    encDec(data, key, isdec, iscrypto) {
        try {
            if (isdec) {
                let d = CryptoJS.AES.decrypt(data.includes('U2FsdGVkX1') ? data : `U2FsdGVkX1${data}`, key).toString(CryptoJS.enc.Utf8)
                if (d && d !== '') {
                    if (iscrypto) {
                        return d
                    }
                    else {
                        let dd = dec(d, key)
                    if (dd) {
                        return dd
                    } else {
                        return null
                    }
                    }
                } else {
                    return null
                }
            } else {
                return CryptoJS.AES.encrypt(iscrypto ? data : enc(data, key), key).toString().split(`U2FsdGVkX1`)[1]
            }
        } catch {
            return null
        }
    }
}

export default Objects