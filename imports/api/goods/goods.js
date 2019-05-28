import { Mongo } from 'meteor/mongo';

import { Index } from 'meteor/easy:search'
import { ElasticSearchEngine } from 'meteor/easysearch:elasticsearch'


export const Goods = new Mongo.Collection('goods');

export function searchGoods(key) {
  if(key) {
    const GoodsIndex = new Index({
      collection: Goods,
      fields: ['name', 'description'],
      engine: new ElasticSearchEngine({
        body: (q) => {
          return {
            query: {
              multi_match: {
                query: key,
                fields: ['name', 'description'],
              },
            }
          }
        },
        sort: () => {
          return {
            name: 1
          }
        }
      }),
    });
    const dd = GoodsIndex.search('');
    // console.log(dd);
    const res = dd.fetch();
    console.log(res);
    return res;
  } else {
    const GoodsIndex = new Index({
      collection: Goods,
      fields: ['name', 'description'],
      engine: new ElasticSearchEngine({
        body: (q) => {
          return {
          }
        },
        sort: () => {
          return {
            name: 1
          }
        }
      }),
    });
    const dd = GoodsIndex.search('');
    // console.log(dd);
    const res = dd.fetch();
    console.log(res);
    return res;
  }
}

// console.log(searchGoods('信息'));
