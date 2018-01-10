import { Meteor } from 'meteor/meteor';
import { Goods } from '../goods';
// import { console } from 'meteor/tools';

Meteor.publish('goods.all', function () {
  return Goods.find();
});

Meteor.publish('goods.findOne', function(id) {
  // console.log('xxxxx')
  return Goods.findOne(id);
})
