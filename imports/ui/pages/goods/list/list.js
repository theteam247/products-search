import './list.html'
import { Goods } from '/imports/api/goods/goods';
// import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict'; // 用于解决页面内部数据状态问题,实现数据绑定传递
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { setup } from 'meteor/swydo:blaze-apollo';
import gql from 'graphql-tag';
const client = new ApolloClient(meteorClientConfig());
setup({ client });
// const _instance = Template.instance();

/**
 * 重新加载数据
 * @param {*} instanceT 实例
 * @param {*} keyword   查询关键字
 */
function loadData(instanceT,keyword) {
  // console.log('11');
  if(keyword){}
  else{
    keyword = '';
  }
  // 重新加载数据
  const res = instanceT.gqlQuery({
    query: gql`
    query{
        GoodsAll(keyword: "${keyword}", r: "${Math.random()}") {
        _id
        name
        img
        price
        description
        content
      }
    }
    `});
  // instanceT.state.set('allGoods',[]);
  // console.log(res);
  res.then(d=>{
    instanceT.state.set('allGoods',d.GoodsAll);//Goods.find();
  })
}

Template.App_goods.onCreated(function(){
  // console.log('11');
  this.state = new ReactiveDict();
  this.state.setDefault({
    allGoods: [], // 所有的数据
  });
  console.log(this);
  loadData(this,'');
});
Template.App_goods.helpers({
  goods() {
    // return Goods.find();
    // return Meteor.subscribe('goods.all',k);
    return Template.instance().state.get('allGoods');
  },
  // 生成商品序号 索引加一
  num(i) {
    return i+1;
  },
  editor() {
    // console.log(Template.instance().state);
    return Template.instance().state.get('editing');
  }
});
Template.App_goods.events({
  'click .btn-del'(event) {
    const i = Template.instance();
    // console.log(event.currentTarget.dataset.id);
    if(confirm('是否删除指定项目')){
      const res = Template.instance().gqlMutate({
        mutation: gql`
        mutation{
          deleteOne(id: "${event.currentTarget.dataset.id}") {
            _id
            name
            img
            price
            description
            content
          }
        }
        `
      });
      // console.log(res);
      res.then(r=>{
        console.log(r);
        // 重制数据
        loadData(i,FlowRouter.getQueryParam('keyword'));
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  'submit #mainForm'(event, instance) {
    event.preventDefault();
    // console.dir(instance);
    const target = event.target;
    const keyword = target.keyword.value.trim();

    // 根据条件查询数据
    loadData(Template.instance(),keyword);
    if (keyword) {
      FlowRouter.go('/goods?keyword='+keyword);
    }
    else {
      // alert('请输入要查询的关键字');
      FlowRouter.go('/goods?keyword=');
    }
    // Template.instance().state.set('editing',keyword);
  }
});
