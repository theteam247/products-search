import './list.html'
import { Goods } from '/imports/api/goods/goods';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.App_goods.onCreated(()=>{
  Meteor.subscribe('goods.all');
});
Template.App_goods.helpers({
  goods() {
    const k = FlowRouter.getQueryParam('keyword');
    console.log(k);
    return Goods.find();
  },
  // 生成商品序号 索引加一
  num(i) {
    return i+1;
  }
});
Template.App_goods.events({
  'click .btn-del'(event) {
    // console.log(event.currentTarget.dataset.id);
    if(confirm('是否删除指定项目')){
      Meteor.call('goods.remove',event.currentTarget.dataset.id,(err)=>{
        console.log(err);
        if (err) {
          alert(err.error);
        } else {
          FlowRouter.go('Goods')
        }
      })
    }
  },
  'submit #mainForm'(event, instance) {
    event.preventDefault();
    console.dir(instance);
    const target = event.target;
    const keyword = target.keyword.value.trim();
    if (keyword) {
      FlowRouter.go('/goods?keyword='+keyword);
    }
    else {
      alert('请输入要查询的关键字');
    }
  }
});
