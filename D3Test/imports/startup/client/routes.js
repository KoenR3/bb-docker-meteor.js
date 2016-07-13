/**
 * Created by Jeroen on 05/07/16.
 */

import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import '/imports/ui/pages/home'
import '/imports/ui/components/graph'
import '/imports/ui/layouts/test'


FlowRouter.route('/', {
    name: 'graph',
    action: function(params) {
        BlazeLayout.render('home', {content: "graph"})
    }
})

FlowRouter.route('/test', {
    name: 'test',
    action: function(params) {
        BlazeLayout.render('test')
    }
})

