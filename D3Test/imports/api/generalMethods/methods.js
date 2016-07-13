/**
 * Created by Jeroen on 06/07/16.
 */
import {Meteor} from 'meteor/meteor'

import {StreamOne} from '/imports/api/StreamOne/collection'
import {StreamTwo} from '/imports/api/StreamTwo/collection'
import {StreamThree} from '/imports/api/StreamThree/collection'
import {StreamFour} from '/imports/api/StreamFour/collection'
import {StreamFive} from '/imports/api/StreamFive/collection'

export const valueNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

if(Meteor.isServer){
    Meteor.startup(function(){
        Meteor.call('generateData')
        //generateData.call()
    })

}

export const generateData = {
    name: 'generateRandomDataStream',

    run (){
        Meteor.call('initializeData')
        if(Meteor.isServer){
            Meteor.setInterval(function () {
                for (key of valueNames) {
                    StreamOne.update(StreamOne.findOne({name: key})._id, {$set: {value: Math.floor(Math.random() * 500)}})
                }
            }, 500)
        }
    },

    call(args, callback){
        const options = {
            returnStubValue: true,
            throwStubExceptions: true
        }
        Meteor.apply(this.name, [args], options, callback)
    }
}

Meteor.methods({
    [generateData.name]: function(args) {
        generateData.run.call(this, args)
    },
    generateData(){
        if(StreamOne.find().fetch().length == 0){
            Meteor.call('initializeData')
        }
        if(Meteor.isServer){
            Meteor.setInterval(function () {
                for (key of valueNames) {
                    StreamOne.update(StreamOne.findOne({name: key})._id, {$set: {value: Math.floor(Math.random() * 500)}})
                    StreamTwo.update(StreamTwo.findOne({name: key})._id, {$set: {value: Math.floor(Math.random() * 500)}})
                    StreamThree.update(StreamThree.findOne({name: key})._id, {$set: {value: Math.floor(Math.random() * 500)}})
                    StreamFour.update(StreamFour.findOne({name: key})._id, {$set: {value: Math.floor(Math.random() * 500)}})
                    StreamFive.update(StreamFive.findOne({name: key})._id, {$set: {value: Math.floor(Math.random() * 500)}})
                }
            }, 500)
        }
    },
    initializeData(){
        // FYI: I realize this isn't the most efficient way to create mock data, it is however, fast to implement :)
        if(StreamOne.find().fetch().length == 0
            && StreamTwo.find().fetch().length == 0
            && StreamThree.find().fetch().length == 0
            && StreamFour.find().fetch().length == 0
            && StreamFive.find().fetch().length == 0){

            for(key of valueNames){
                StreamOne.insert({name: key, value: 0})
                StreamTwo.insert({name: key, value: 0})
                StreamThree.insert({name: key, value: 0})
                StreamFour.insert({name: key, value: 0})
                StreamFive.insert({name: key, value: 0})
            }
        }

    }
})