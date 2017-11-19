// Model de la route '/Shops'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import ShopSeeds from "../helpers/ShopSeeds";

let Schema = new mongoose.Schema({
  name: { type: String },         // le nom du concert
  venue: { type: String },        // le nom de la salle
  description: { type: String },  // la description
  capacity: { type: Number },     // la capacité du shop
  price: { type: Number },        // le prix
  image: { type: String },        // l'url de l'image
  date: { type: String },         // la date du concert
  lat: { type: String },          // latitude du lieu
  lng: {type: String }            // longitude du lieu
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
      venue: shop.venue,
      description: shop.description,
      capacity: shop.capacity,
      price: shop.price,
      image: shop.image,
      date: shop.date,
      lat: shop.lat,
      lng: shop.lng
    });
  },

  updateShop: (_id, shop) => {
    return Model.findOneAndUpdate({ _id }, {
      name: shop.name,
      venue: shop.venue,
      description: shop.description,
      capacity: shop.capacity,
      price: shop.price,
      image: shop.image,
      date: shop.date,
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