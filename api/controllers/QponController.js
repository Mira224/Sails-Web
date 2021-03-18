/**
 * WebAppController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // action - create
  create: async function (req, res) {

    if (req.method == "GET") return res.view('qpon/create');

    var qpon = await Qpon.create(req.body).fetch();

    return res.status(201).json({ id: qpon.id });
  },


  //action - home
  home: async function (req, res) {

    var HKIsland = await Qpon.find({
      where: { region: "HK Island" },
      sort: "id DESC",
      limit: 2,
    });

    var Kowloon = await Qpon.find({
      where: { region: "Kowloon" },
      sort: "id DESC",
      limit: 2,
    });

    var NewT = await Qpon.find({
      where: { region: "New Territories" },
      sort: "id DESC",
      limit: 2,
    })

    return res.view('qpon/home', { HKIslands: HKIsland, Kowloons: Kowloon, NewTs: NewT });
  },


  // json function
  json: async function (req, res) {

    var everyRecord = await Qpon.find();

    return res.json(everyRecord);
  },

  // action - read
  read: async function (req, res) {

    var thatRecord = await Qpon.findOne(req.params.id);

    if (!thatRecord) return res.notFound();

    var button = false;
    if (req.session.userrole == "member") {
      var thatQpon = await Qpon.findOne(req.params.id).populate("owners", { id: req.session.userid });
      if (thatQpon.owners.length == 0) var button = true;
    }


    return res.view('qpon/read', { qpon: thatRecord, button });
  },


  //action - admin
  admin: async function (req, res) {

    var everyRecord = await Qpon.find();

    //return res.json({record: everyRecord});

    return res.view('qpon/admin', { record: everyRecord });
  },

  // action - update
  update: async function (req, res) {

    if (req.method == "GET") {

      var thatRecord = await Qpon.findOne(req.params.id);

      if (!thatRecord) return res.notFound();

      return res.view('qpon/update', { qpon: thatRecord });

    } else {

      var updatedRecord = await Qpon.updateOne(req.params.id).set(req.body);

      if (!updatedRecord) return res.notFound();

      return res.ok();
    }
  },

  // action - delete 
  delete: async function (req, res) {

    var deletedRecord = await Qpon.destroyOne(req.params.id);

    if (!deletedRecord) return res.notFound();

    return res.ok();
  },

  // search function
  search: async function (req, res) {
    var whereClause = {};

      var parsedMinCoins = parseInt(req.query.searchMinCoin);

      var parsedMaxCoins = parseInt(req.query.searchMaxCoin);

      if (req.query.searchRegion) whereClause.region = { contains: req.query.searchRegion };
      if (req.query.searchExpiryDate) whereClause.expiryDate = { '<=': req.query.searchExpiryDate };

      if (!isNaN(parsedMinCoins) && !isNaN(parsedMaxCoins)) whereClause.coins = { '>=': req.query.searchMinCoin, '<=': req.query.searchMaxCoin };
      else if (!isNaN(parsedMinCoins)) whereClause.coins = { '>=': req.query.searchMinCoin };
      else if (!isNaN(parsedMaxCoins)) whereClause.coins = { '<=': req.query.searchMaxCoin };

    if (req.wantsJSON) {
      

      var limit = Math.max(req.query.limit, 2) || 2;
      var offset = Math.max(req.query.offset, 0) || 0;

      var thoseRecords = await Qpon.find({
        where: whereClause,
        limit: limit,
        skip: offset,
      });
      var count = await Qpon.count({
        where: whereClause
      });
      return res.json({thoseRecords, count});
    } else {

      var count = await Qpon.count({ where: whereClause });

      return res.view('qpon/search', { numOfRecords: count });
    };
  },

  //action populate
  populate: async function (req, res) {

    var o = await Qpon.findOne(req.params.id).populate("owners");

    if (!o) return res.notFound();

    //return res.json(o);

   return res.view('qpon/owners', { owners: o });


  },


};

