export const typeDefs = `
type Goods {
  _id: String,
  name: String,
  img: String,
  price: String,
  description: String,
  content: String,
}
type Query {
  Goods(id: String): Goods
  GoodsAll(keyword: String, r: String): [Goods]
}
type Mutation {
  createGoods(name: String, img: String, price: String, description: String, content: String): Goods
  update(id: String, name: String, img: String, price: String, description: String, content: String): Goods
  deleteOne(id:String): Goods
}
`;
