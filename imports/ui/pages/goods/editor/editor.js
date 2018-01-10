import { Goods } from '/imports/api/goods/goods';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
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
    return Goods.findOne(getId());
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



