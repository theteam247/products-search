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

Template.App_goods.onCreated(function(){
  this.state = new ReactiveDict();
  this.state.setDefault({
    allGoods: [], // 所有的数据
  });
  // 初始化查询
  const res = Template.instance().gqlQuery({
    query: gql`
    query{
        GoodsAll(keyword: "") {
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
  res.then(res=>{
    this.state.set('allGoods',res.GoodsAll);//Goods.find();
  })
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
    console.log(Template.instance().state);
    return Template.instance().state.get('editing');
  }
});
Template.App_goods.events({
  'click .btn-del'(event) {
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
    const ss = Template.instance(); // 转存实例
    const res = Template.instance().gqlQuery({
      query: gql`
      query{
          GoodsAll(keyword: "${keyword}") {
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
    res.then(res=>{
      ss.state.set('allGoods',res.GoodsAll);//Goods.find();
    })
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
