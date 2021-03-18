/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).json("User not found");

        var match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).json("Wrong Password");

        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username;
            req.session.userid = user.id;
            req.session.userrole = user.role;
            req.session.coins = user.coins;

            return res.json(user);
        }

        // Start a new session for the new login user
        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = user.username;
            req.session.userid = user.id;
            req.session.userrole = user.role;
            req.session.coins = user.coins;

            return res.json(user);
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/");
            // return location.assign("/");
            // return res.json(req.session.id);
        });

    },
    populate: async function (req, res) {

        var user = await User.findOne(req.session.userid).populate("possessions");

        if (!user) return res.notFound();
        if (req.wantsJSON) {
            return res.json({user});
        }
         return res.view('user/redeemed', { user });
    },

    redeem: async function (req, res) {
        if (req.wantsJSON) {

            if (!await User.findOne(req.session.userid)) return res.status(404).json("User not found.");

            var thatQpon = await Qpon.findOne(req.params.fk).populate("owners", { id: req.session.userid });

            if (!thatQpon) return res.status(404).json("Qpon not found.");

            if (thatQpon.owners.length > 0)
                return res.status(409).json("Already added.");   // conflict

            if (thatQpon.quota <= 0) return res.status(410).json("Not enough quota.");

            if (req.session.coins < thatQpon.coins) return res.status(411).json("Not enough coins.");

            await User.addToCollection(req.session.userid, "possessions").members(req.params.fk);
            var updatedQuota = await Qpon.updateOne(req.params.fk).set({ quota: thatQpon.quota - 1 });
            var updatedCoins = await User.updateOne(req.session.userid).set({ coins: req.session.coins - thatQpon.coins });
            req.session.coins = updatedCoins.coins;

            return res.ok();
        }

    },



};

