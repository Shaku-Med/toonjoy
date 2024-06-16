'use client';
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import Objects from './Objects'

let Key = async (id, di) => {
    try {
        let date = new Date()
        let au = window.navigator.userAgent.split(/\s+/).join('')

        let obS = {
            exp: date.setSeconds(date.getSeconds() + 10),
            id: di
        }
        let ax = await axios.post(`https://backend.toonjoy.org`, {
            data: {
                d: Objects.encDec(JSON.stringify(obS), `${id}+${au}`)
            }
        });
        if (ax.data) {
            let d = JSON.parse(Objects.encDec(ax.data.v, `${di}`, true))
            if (d) {
                return d
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
};

export default Key;