import { Goods } from '/imports/api/goods/goods';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict'; // 用于解决页面内部数据状态问题,实现数据绑定传递
import './editor.html';

/**
 * 获取url中传递的参数
 */
function getId() {
   return FlowRouter.getQueryParam('id');
}
// console.dir(Template);
Template.App_goods_editor.onCreated(function(){
  this.state = new ReactiveDict();
  this.state.setDefault({
    Goods: {}, // 当前数据
  });
});
Template.App_goods_editor.helpers({
  goods() {
    const i = Template.instance();
    Meteor.call('goods.findOne',getId(),function(err, d){
      i.state.set('Goods',d);
    });
    return Template.instance().state.get('Goods');
  },
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
      Meteor.call('goods.update', id, doc, function(err){
        if (err) {
          alert(err.error);
        } else {
          // alert('保存成功');
          FlowRouter.go('Goods')
        }
      });
    } else{ // 新增
      Meteor.call('goods.insert', doc, function(err){
        // console.log(err);
        if (err) {
          alert(err.error);
        } else {
          // alert('保存成功');
          FlowRouter.go('Goods')
        }
      })
    }
  }
});



