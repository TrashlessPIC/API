// Controller de la route '/shops'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import ShopModel from "../models/ShopModel";

const shops = () => {
  // On fait appel à la fonction getShops du model
  // Celle ci renvoie tous les shops présents en base
  return ShopModel.getShops()
  .then((data) => {
    // On récupère ici data qui est une liste de shops

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noShopsError'
      throw new Error('noShopsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];shop
    for (let shop of data){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
      response[response.length] = {
        id: shop._id,
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
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'name');
  });
}

const shop = (_id) => {
  // On fait appel à la fonction getShop du model
  // Celle ci renvoie le shop dont l'id est _id
  return ShopModel.getShop(_id)
  .then((data) => {
    // On récupère ici data qui est une liste de shops

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noShopError'
      throw new Error('noShopError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: data._id,
      name: data.name,
      shoptype: data.shoptype,
      zwtype: data.zwtype,
      zwprecisetype: data.zwprecisetype,
      description: data.description,
      address: data.address,
      picture: data.picture,
      phone: data.phone,
      mail: data.mail,
      facebook: data.facebook,
      website: data.website,
      hours: data.hours,
      lat: data.lat,
      lng: data.lng
    };
    return response;
  });
}

const createShop = (shop) => {
  // On fait appel à la fonction createShop du model
  // Celle ci renvoie le shop dont l'id est _id
  return ShopModel.createShop(shop);
}

const updateShop = (id, shop) => {
  // On fait appel à la fonction updateShop du model
  // Celle ci renvoie le shop dont l'id est _id
  return ShopModel.updateShop(id, shop);
}

const deleteShop = (id) => {
  // On fait appel à la fonction deleteShop du model
  // Celle ci renvoie le shop dont l'id est _id
  return ShopModel.deleteShop(id);
}

export default {
  // Controller des views
  getShops: (req, res) => {
    shops()
    .then((data) => {
      // data contient une liste de shops
      res.render('shop/shops', { shops: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getShop: (req, res) => {
    shop(req.params.id)
    .then((data) => {
      res.render('shop/shop', { shop: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateShop: (req, res) => {
    res.render('shop/createShop');
  },

  postCreateShop: (req, res) => {
    let shop = {
      name: req.body.name,
      shoptype: req.body.shoptype,
      zwtype: req.body.zwtype,
      zwprecisetype: req.body.zwprecisetype,
      description: req.body.description,
      address: req.body.address,
      picture: req.body.picture,
      phone: req.body.phone,
      mail: req.body.mail,
      facebook: req.body.facebook,
      website: req.body.website,
      hours: req.body.hours,
      lat: req.body.lat,
      lng: req.body.lng
    };

    createShop(shop)
    .then((data) => {
      res.redirect('/shops');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateShop: (req, res) => {
    shop(req.params.id)
    .then((data) => {
      res.render('shop/updateShop', { shop: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateShop: (req, res) => {
    let shop = {
      name: req.body.name,
      shoptype: req.body.shoptype,
      zwtype: req.body.zwtype,
      zwprecisetype: req.body.zwprecisetype,
      description: req.body.description,
      address: req.body.address,
      picture: req.body.picture,
      phone: req.body.phone,
      mail: req.body.mail,
      facebook: req.body.facebook,
      website: req.body.website,
      hours: req.body.hours,
      lat: req.body.lat,
      lng: req.body.lng
    };

    updateShop(req.params.id, shop)
    .then((data) => {
      res.redirect('/shops');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteShop: (req, res) => {
    deleteShop(req.params.id)
    .then((data) => {
      res.redirect('/shops');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getShopsApi: (req, res) => {
    shops()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de shops
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getShopApi: (req, res) => {
    shop(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateShopApi: (req, res) => {
    let shop = {
      name: req.body.name,
      shoptype: req.body.shoptype,
      zwtype: req.body.zwtype,
      zwprecisetype: req.body.zwprecisetype,
      description: req.body.description,
      address: req.body.address,
      picture: req.body.picture,
      phone: req.body.phone,
      mail: req.body.mail,
      facebook: req.body.facebook,
      website: req.body.website,
      hours: req.body.hours,
      lat: req.body.lat,
      lng: req.body.lng
    };

    createShop(shop)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateShopApi: (req, res) => {
    let shop = {
      name: req.body.name,
      shoptype: req.body.shoptype,
      zwtype: req.body.zwtype,
      zwprecisetype: req.body.zwprecisetype,
      description: req.body.description,
      address: req.body.address,
      picture: req.body.picture,
      phone: req.body.phone,
      mail: req.body.mail,
      facebook: req.body.facebook,
      website: req.body.website,
      hours: req.body.hours,
      lat: req.body.lat,
      lng: req.body.lng
    };

    updateShop(req.params.id, shop)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteShopApi: (req, res) => {
    deleteShop(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
