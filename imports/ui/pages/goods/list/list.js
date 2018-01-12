import './list.html'
import { Goods } from '/imports/api/goods/goods';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict'; // 用于解决页面内部数据状态问题,实现数据绑定传递
import { Template } from 'meteor/templating';

function getKeyWord(){
  return FlowRouter.getQueryParam('keyword');
}
function loadData(instanceT) {
  Meteor.call('goods.all',getKeyWord(),function(err, d){
    instanceT.state.set('Goods',d);
  });
}
Template.App_goods.onCreated(function(){
  // const k = FlowRouter.getQueryParam('keyword');
  // console.log(k);
  // Meteor.subscribe('goods.all', k);
  // url地址改变之后自动获取数据
  // this.k = () => FlowRouter.getQueryParam('keyword');
  // this.autorun(() => {
  //   // this.subscribe('goods.all', this.k());
  //   Meteor.call('goods.all',this.k());
  // });
  this.state = new ReactiveDict();
  this.state.setDefault({
    Goods: [], // 当前数据
  });
  loadData(this);
});
Template.App_goods.helpers({
  goods() {
    return Template.instance().state.get('Goods');
    // return Goods.find();
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
    const i = Template.instance();
    if(confirm('是否删除指定项目')){
      Meteor.call('goods.remove',event.currentTarget.dataset.id,(err)=>{
        console.log(err);
        if (err) {
          alert(err.error);
        } else {
          FlowRouter.go('Goods');
          loadData(i);
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
      // alert('请输入要查询的关键字');
      FlowRouter.go('/goods?keyword=');
    }
  }
});
