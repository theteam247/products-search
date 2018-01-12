import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Goods, searchGoods } from './goods';
import { validateEmpty, validatePrice } from '../../utils/validates';


Meteor.methods({
  // 查询所有的数据, 使用elasticsearch
  'goods.all'(key) {
    console.log('调用查询方法');
    return searchGoods(key);
  },
  // 查询单条记录
  'goods.findOne'(id) {
    // console.log(id);
    return Goods.findOne(id);
  },
  'goods.insert'(doc, cb) {
    // console.group('新增----');
    // console.dir(doc);
    // console.dir(cb);
    // console.groupEnd();
    // check(doc.name, String);
    // check(Number(doc.price), Number);
    const m = doc;
    if (!validateEmpty(doc.name)) {
      // cb('商品名字不能为空');
      throw new Meteor.Error('商品名字不能为空');
      return;
    }
    if (!validatePrice(doc.price)) {
      // cb('商品价格输入不正确');
      throw new Meteor.Error('商品价格输入不正确');
      return;
    }
    m.createdAt = doc.createdAt || new Date();
    const result = Goods.insert(m, cb);
    return result;
  },
  'goods.update'(id, doc, cb) {
    if (!validateEmpty(doc.name)) {
      // cb('商品名字不能为空');
      throw new Meteor.Error('商品名字不能为空');
      return;
    }
    if (!validatePrice(doc.price)) {
      // cb('商品价格输入不正确');
      throw new Meteor.Error('商品价格输入不正确');
      return;
    }
    return Goods.update(id, doc, {}, cb);
  },
  'goods.remove'(id, cb) {
    return Goods.remove(id, cb);
  }
});


