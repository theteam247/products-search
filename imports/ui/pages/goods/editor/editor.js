import { Goods } from '/imports/api/goods/goods';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { setup } from 'meteor/swydo:blaze-apollo';
import gql from 'graphql-tag';
const client = new ApolloClient(meteorClientConfig());
setup({ client });

import './editor.html';

/**
 * 获取url中传递的参数
 */
function getId() {
   return FlowRouter.getQueryParam('id');
}
// console.dir(Template);
Template.App_goods_editor.onCreated(()=>{
});
Template.App_goods_editor.helpers({
  goods() {
    // console.log('1111');
    // return Goods.findOne(getId());
    // 根据id获取数据
    const res = Template.instance().gqlQuery({
      query: gql`
      query{
          Goods(id:"${getId()}") {
          _id
          name
          img
          price
          description
          content
        }
      }
      `
    }).get();
    // console.log(res);
    return res.Goods;
  },
  // isSave: false,
});
Template.App_goods_editor.events({
  'submit #mainForm'(event) {
    // console.dir(Meteor.methods);
    event.preventDefault();
    const target = event.target;
    const doc = {
      name: target.txtName.value,
      img: target.txtImg.value,
      price: target.txtPrice.value,
      description: target.txtDescription.value,
      content: target.inputContent.value,
    };
    const id = getId();
    if(id) { // 更新
      const res = Template.instance().gqlMutate({
        mutation: gql`
        mutation{
          update(id:"${id}",name: "${doc.name}",img:"${doc.img}",price:"${doc.price}",description:"${doc.description}",content:"${doc.content}") {
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
        FlowRouter.go('Goods');
      }).catch(err=>{
        alert(err);
      })
    } else{ // 新增
      // 新增
      const res = Template.instance().gqlMutate({
        mutation: gql`
        mutation{
          createGoods(name: "${doc.name}",img:"${doc.img}",price:"${doc.price}",description:"${doc.description}",content:"${doc.content}") {
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
        FlowRouter.go('Goods');
      }).catch(err=>{
        alert(err);
      })
    }
  }
});



