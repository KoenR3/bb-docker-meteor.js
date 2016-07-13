/**
 * Created by Jeroen on 06/07/16.
 */
import './graph.html'

import d3 from 'd3'

import {StreamOne} from '/imports/api/StreamOne/collection'
import {StreamTwo} from '/imports/api/StreamTwo/collection'
import {StreamThree} from '/imports/api/StreamThree/collection'
import {StreamFour} from '/imports/api/StreamFour/collection'
import {StreamFive} from '/imports/api/StreamFive/collection'

Template.graph.onCreated(function(){
    this.lineGenerator = d3.line().x((d, i)=>{return (1000/(StreamOne.find().fetch().length-1)*i)}).y((d,i)=>{return 250}).curve(d3.curveBasis)
    this.refineData = (d) => {return d}
})

Template.graph.onRendered(function(){
    const self = this

    this.autorun(function(){
        //Get the svg container
        const svg = d3.select("svg")

        //This would be the reactive datasource (reactive thanks to Meteor's autorun)
        const dataFromStreamOne = self.refineData(StreamOne.find().fetch())
        const dataFromStreamTwo = self.refineData(StreamTwo.find().fetch())
        const dataFromStreamThree = self.refineData(StreamThree.find().fetch())
        const dataFromStreamFour = self.refineData(StreamFour.find().fetch())
        const dataFromStreamFive = self.refineData(StreamFive.find().fetch())

        //Update new path coordinates
        svg.selectAll("#streamOne").transition().attr("d", self.lineGenerator(dataFromStreamOne))
        svg.selectAll("#streamTwo").transition().attr("d", self.lineGenerator(dataFromStreamTwo))
        svg.selectAll("#streamThree").transition().attr("d", self.lineGenerator(dataFromStreamThree))
        svg.selectAll("#streamFour").transition().attr("d", self.lineGenerator(dataFromStreamFour))
        svg.selectAll("#streamFive").transition().attr("d", self.lineGenerator(dataFromStreamFive))
    })
})

//TODO: The dataset needs to be altered according to a chosen algorithm, this should be incorporated as well!
Template.graph.events({
    'click #noGraph': function(event, template){
        event.preventDefault()

        template.lineGenerator = d3.line()
            .x((d, i) => {
                return (1000/(StreamOne.find().fetch().length-1)*i)
            })
            .y(()=>{return 250})
            .curve(d3.curveBasis)

        template.refineData = (d) => {return d}
    },
    'click #lineGraph': function(event, template){
        event.preventDefault()

        template.lineGenerator = d3.line()
            .x((d, i)=>{return 1000/(StreamOne.find().fetch().length+1) * i})
            .y((d)=>{return d.value})
            .curve(d3.curveBasis)

        template.refineData = (d) => {
            d.unshift({value: 250})
            d.push({value: 250})

            return d
        }
    },
    'click #polarGraph': function(event, template){
        event.preventDefault()

        template.lineGenerator = d3.line()
            .x((d,i)=>{return (Math.cos((Math.PI * 2) * (i / (StreamOne.find().fetch().length * 2))) * (50 + d.value/2)) + 500})
            .y((d,i)=>{return (Math.sin((Math.PI * 2) * (i / (StreamOne.find().fetch().length * 2))) * (50 + d.value/2)) + 250})
            .curve(d3.curveBasisClosed)

        template.refineData = (d) => {
            const out = []
            for (data of d){
                out.push({value: 250})
                out.push(data)
            }

            return out
        }
    },

    'click #XGraph': function(event, template){
        event.preventDefault()

        template.lineGenerator = d3.line()
            .x((d) => {return d.value * 2})
            .y((d, i) => {return 500 / (StreamOne.find().fetch().length+1) * i})
            .curve(d3.curveBasis)

        template.refineData = (d) => {
            d.unshift({value: 0})
            d.push({value: 0})

            return d
        }
    }
})