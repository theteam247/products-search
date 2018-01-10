import './list.html'
import { Goods } from '/imports/api/goods/goods';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.App_goods.onCreated(function(){
  // const k = FlowRouter.getQueryParam('keyword');
  // console.log(k);
  // Meteor.subscribe('goods.all', k);
  // url地址改变之后自动获取数据
  this.k = () => FlowRouter.getQueryParam('keyword');
  this.autorun(() => {
    this.subscribe('goods.all', this.k());
  });
});
Template.App_goods.helpers({
  goods() {
    return Goods.find();
    // return Meteor.subscribe('goods.all',k);
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
    // console.dir(instance);
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
