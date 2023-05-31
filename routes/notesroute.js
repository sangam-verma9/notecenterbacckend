const express = require("express");
const {
  getnote,
  createnote,
  getnotebyid,
  updatenote,
  deletenote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/protectnotemiddleware");

const router = express.Router();

// router.route("/").get(protect,getnote);
router.route("/").get(getnote);

// router.route("/create").post(protect, createnote);
router.route("/create").post(createnote);
router.route("/:id").get(getnotebyid).put(updatenote).delete(deletenote);

module.exports = router;
