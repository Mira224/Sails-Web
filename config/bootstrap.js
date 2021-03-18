/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);

  if (await Qpon.count() > 0) {
    return generateUsers();
  }

  await Qpon.createEach([
    {
      "title": "Free for couple",
      "restaurant": "TNT",
      "quota": 40,
      "coins": 750,
      "detail": "First come first serve.",
      "region": "Kowloon",
      "mall": "Harbour City",
      "image": "https://imgs.weekendhk.com/wp-content/uploads/2018/06/72754545_2912300025460875_5485262858692329472_o_4195821325de7932dd597e-800x550.jpg",
      "expiryDate": "2020-12-25",

    },
    {
      "title": "50% discount on Supreme Seafood Feast (for 2 person)",
      "restaurant": "Mango Tree",
      "quota": 300,
      "coins": 750,
      "detail": "First come first serve.",
      "region": "HK Island",
      "mall": "Times Square",
      "image": "https://media.oceanpark.com.hk/files/s3fs-public/inside_banner01_mobile__Neptune.jpg",
      "expiryDate": "2021-01-16",
    },
    {
      "title": "50% off Yoogane's Chicken Galbi",
      "restaurant": "Yoogane",
      "quota": 200,
      "coins": 500,
      "detail": "Really good.",
      "region": "New Territories",
      "mall": "New Town Plaza",
      "image": "https://obs.line-scdn.net/0hXmG5Hy1uB0J6TC8k8GV4FUAaBC1JIBRBHnpWXSUiWXYDfUAdQCwcd1ZODSJVdUAcFH9ALFxFHHMEfhVEEi0c/w644",
      "expiryDate": "2021-03-25",

    },
    {

      "title": "Simply receive a complimentary drink",
      "restaurant": "Greyhound Cafe",
      "quota": 300,
      "coins": 200,
      "detail": "Welcome!",
      "region": "Kowloon",
      "mall": "APM",
      "image": "https://static02-proxy.hket.com/res/v3/image/content/2605000/2607263/03_1024.jpg",
      "expiryDate": "2021-04-23",

    },
    {
      "title": "15% off on Whole Bill",
      "restaurant": "ANA Gura",
      "quota": 300,
      "coins": 400,
      "detail": "We are waiting for you.",
      "region": "Kowloon",
      "mall": "APM",
      "image": "https://img.lookvin.com/editor/201901/23/141027765.jpg",
      "expiryDate": "2020-12-09",

    },
    {

      "title": "Drinks for free",
      "restaurant": "Ocean",
      "quota": 200,
      "coins": 100,
      "detail": "All kinds of drinks are free.",
      "region": "HK Island",
      "mall": "IFC MALL",
      "image": "https://img95.699pic.com/photo/50122/1029.jpg_wh860.jpg",
      "expiryDate": "2020-12-17",
    },{
      "title": "Lady free",
      "restaurant": "River Town",
      "quota": 100,
      "coins": 200,
      "detail": "First come first serve.",
      "region": "Kowloon",
      "mall": "Festival Walk",
      "image": "https://imgs.weekendhk.com/wp-content/uploads/2018/06/1_mp_fortnummasonk11_int_mp-274-hdr_5772710045de9f95963997-800x533.jpg",
      "expiryDate": "2021-03-16",
    },{
      "title": "$1 for a meal",
      "restaurant": "Green Noodles",
      "quota": 200,
      "coins": 200,
      "detail": "A bowl of egg noodles",
      "region": "New Territories",
      "mall": "Tsuen Wan Plaza",
      "image": "https://taiwan17go.com/wp-content/uploads/2018/10/2018-10-28_161250.jpg",
      "expiryDate": "2021-02-25",

    },
    ,{
      "title": "First 50 enjoys 50% discount",
      "restaurant": "Happy Day",
      "quota": 50,
      "coins": 300,
      "detail": "Delicious",
      "region": "HK Island",
      "mall": "Pacific Place",
      "image": "https://pic.pimg.tw/abcjcba/1537878266-2540003390.jpg",
      "expiryDate": "2021-02-25",

    },

  ]);
  return generateUsers();

  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }
    var hash = await sails.bcrypt.hash('123456', salt);
    await User.createEach([
      { username: "visitor", role: "visitor" },
      { username: "admin1", role: "admin", password: hash },
      { username: "admin2", role: "admin", password: hash },
      { username: "member1", role: "member", password: hash, coins: "1000" },
      { username: "member2", role: "member", password: hash, coins: "300" },

    ])

    const qpon1 = await Qpon.findOne({ title: "Free for couple" });
    const qpon2 = await Qpon.findOne({ title: "50% discount on Supreme Seafood Feast (for 2 person)" });
    const qpon3 = await Qpon.findOne({ title: "50% off Yoogane's Chicken Galbi" });
    const member1 = await User.findOne({ username: "member1" });
    const member2 = await User.findOne({ username: "member2" });



    await User.addToCollection(member1.id, 'possessions').members([qpon1.id, qpon2.id, qpon3.id]);
    await User.addToCollection(member2.id, 'possessions').members([qpon1.id, qpon2.id]);



  }


};

