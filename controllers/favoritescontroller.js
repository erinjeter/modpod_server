let express = require("express");
let router = express.Router();

let validateSession = require("../middleware/validate-session");
const Favorites = require("../db").import("../models/favorites");

router.get("/practice", validateSession, function (req, res) {
  res.send("Hey!! This is a modPod practice router!");
});

// router.get("/about", function (req, res) {
//   res.send("Hey!! This is a modPod about route!");
// });

//Favorites Create
router.post("/create", validateSession, (req, res) => {
  const favoritesEntry = {
    podcastid: req.body.favorites.podcastid,
    rating: req.body.favorites.rating,
    review: req.body.favorites.review,

    owner: req.user.id,
  };
  Favorites.create(favoritesEntry)
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get all entires
router.get("/", (req, res) => {
  Favorites.findAll()
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get entires by user
router.get("/mine", validateSession, (req, res) => {
  let userid = req.user.id;
  Favorites.findAll({
    where: { owner: userid },
  })
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get entries by podcastid
router.get("/:podcastid", function (req, res) {
  let podcastid = req.params.podcastid;

  Favorites.findAll({
    where: { podcastid: podcastid },
  })
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

//Updating a podcastid Entry
router.put("/update/:entryId", validateSession, function (req, res) {
  const updateFavoritesEntry = {
    rating: req.body.favorites.rating,
    review: req.body.favorites.review,
  };

  const query = { where: { id: req.params.entryId, owner: req.user.id } };

  Favorites.update(updateFavoritesEntry, query)
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

//Deleting an Entry
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Favorites.destroy(query)
    .then(() =>
      res.status(200).json({ message: "modPod Favorites Entry Removed" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
