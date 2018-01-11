import { Goods } from './goods/goods';
import { Meteor } from 'meteor/meteor';
import { validateEmpty, validatePrice } from '../utils/validates';
// 商品部分操作
export const resolvers = {
  Query: {
    Goods:  async (root, args, context) => {
      const id = args.id;
      const res = await Goods.findOne(id);
      return await res;
    },
    GoodsAll: async (root, args, context) => {
      const key = args.keyword;
      // console.log('我正在查询----')
      // console.log(args);
      if (key) {
        var reg = new RegExp(key);
        const res = await Goods.find({$or:[{
          name: { $regex: reg},
        }, {
          description: { $regex: reg},
        }]}).fetch();
        console.log(res);
        return await res;
      } else {
        const res = await Goods.find({}).fetch();
        return await res;
      }
    },
  },
  Mutation: {
    createGoods: async (root, args, context, info) => {
      const m = args;
      if (!validateEmpty(m.name)) {
        throw new Meteor.Error('商品名字不能为空');
        return;
      }
      if (!validatePrice(m.price)) {
        throw new Meteor.Error('商品价格输入不正确');
        return;
      }
      m.createdAt = args.createdAt || new Date();
      const res = await Goods.insert(m)
      return res;
    },
    update: async (root, args, context, info) => {
      const id = args.id;
      const m = args;
      delete m.id;
      if (!validateEmpty(m.name)) {
        throw new Meteor.Error('商品名字不能为空');
        return;
      }
      if (!validatePrice(m.price)) {
        throw new Meteor.Error('商品价格输入不正确');
        return;
      }
      // m.createdAt = args.createdAt || new Date();
      const res = await Goods.update(id,m);
      return res;
    },
    deleteOne: async (root, args, context, info) => {
      const id = args.id;
      const res = await Goods.remove(id);
      return res;
    }
  }
}
