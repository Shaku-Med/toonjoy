'use client';
import axios from 'axios'
import Objects from './Objects'
import { v4 as uuid } from 'uuid'
// 
let GetK = async (id) => {
    try {
        let date = new Date()
        let au = window.navigator.userAgent.split(/\s+/).join('')
        let uid = uuid()
        let obS = {
            exp: date.setSeconds(date.getSeconds() + 4),
            id
        }
        let ax = await axios.get(`https://backend.toonjoy.org/v/${uid}`, {
            headers: {
                a: Objects.encDec(JSON.stringify(obS), au)
            }
        });
        if (ax.data) {
            let d = JSON.parse(Objects.encDec(ax.data.v, `${id}+${uid}+${au}`, true))
            if (d) {
                return d.d
            }
            else {
                return null
            }
        }
        else {
            return null
        }
    }
    catch (e) {
        return null
    }
}

export default GetK