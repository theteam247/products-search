import { Meteor } from 'meteor/meteor';
import { Goods } from '../goods';
import { Client } from 'elasticsearch';

//連接到 localhost:9200 ，使用默認的設定。
// const client = Client({
//   hosts: [
//     'localhost:3000'
//   ]
// });
// client.cluster.health(function (err, resp) {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.dir(resp);
//   }
// });

// Meteor.publish('goods.all', function (key) {
//   // console.log(key);
//   if (key) {
//     var reg = new RegExp(key);
//     return Goods.find({$or:[{
//       name: { $regex: reg},
//     }, {
//       description: { $regex: reg},
//     }]});
//   } else {
//     return Goods.find({});
//   }
// });

// Meteor.publish('goods.findOne', function(id) {
//   console.log('xxxxx')
//   return Goods.findOne(id);
// })
