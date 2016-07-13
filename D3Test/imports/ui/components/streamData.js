/**
 * Created by Jeroen on 07/07/16.
 */

import './streamData.html'
import { valueNames as names} from '/imports/api/generalMethods/methods'
import { StreamOne } from '/imports/api/StreamOne/collection'
import { StreamTwo } from '/imports/api/StreamTwo/collection'
import { StreamThree } from '/imports/api/StreamThree/collection'
import { StreamFour } from '/imports/api/StreamFour/collection'
import { StreamFive } from '/imports/api/StreamFive/collection'


Template.streamData.helpers({
    names(){
        return names
    },
    streams(){
        const out = []

        out.push({name: StreamOne._name, values: StreamOne.find()})
        out.push({name: StreamTwo._name, values: StreamTwo.find()})
        out.push({name: StreamThree._name, values: StreamThree.find()})
        out.push({name: StreamFour._name, values: StreamFour.find()})
        out.push({name: StreamFive._name, values: StreamFive.find()})

        return out
    }
})
