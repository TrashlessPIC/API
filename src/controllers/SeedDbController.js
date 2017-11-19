// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import ShopModel from "../models/ShopModel";
import BookingModel from "../models/BookingModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      ShopModel.deleteShops(),
      BookingModel.deleteBookings(),
    ])
    .then((data) => {
      return Promise.all([
        ShopModel.seedShops(),
      ]);
    })
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};