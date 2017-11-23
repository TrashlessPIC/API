// Model de la route '/Shops'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import ShopSeeds from "../helpers/ShopSeeds";

let Schema = new mongoose.Schema({
  name: { type: String },         // le nom du concert
  shoptype: { type: String },
  zwtype: { type: String },
  zwprecisetype: { type: String },
  description: { type: String },  // la description
  address: { type: String },  // 
  picture: { type: String },  // 
  phone: { type: String },  // 
  mail: { type: String },  // 
  facebook: { type: String },
  website: { type: String },
  hours: { type: String },
  lat: { type: String },          // latitude du lieu
  lng: {type: String },           // longitude du lieu
});

let Model = mongoose.model('Shop', Schema);

export default {
  seedShops: () => {
    let promises = [];
    for (let shop of ShopSeeds){
      promises[promises.legth] = Model.create(shop);
    }
    return Promise.all(promises);
  },

  getShops: () => {
    return Model.find({}).exec();
  },

  getShop: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createShop: (shop) => {
    return Model.create({
      name: shop.name,
      shoptype: shop.shoptype,
      zwtype: shop.zwtype,
      zwprecisetype: shop.zwprecisetype,
      description: shop.description,
      address: shop.address,
      picture: shop.picture,
      phone: shop.phone,
      mail: shop.mail,
      facebook: shop.facebook,
      website: shop.website,
      hours: shop.hours,
      lat: shop.lat,
      lng: shop.lng
    });
  },

  updateShop: (_id, shop) => {
    return Model.findOneAndUpdate({ _id }, {
      name: shop.name,
      shoptype: shop.shoptype,
      zwtype: shop.zwtype,
      zwprecisetype: shop.zwprecisetype,
      description: shop.description,
      address: shop.address,
      picture: shop.picture,
      phone: shop.phone,
      mail: shop.mail,
      facebook: shop.facebook,
      website: shop.website,
      hours: shop.hours,
      lat: shop.lat,
      lng: shop.lng
    }, {upsert: true}).exec();
  },

  deleteShops: () => {
    return Model.remove({}).exec();
  },

  deleteShop: (_id) => {
    return Model.remove({ _id }).exec();
  },
};