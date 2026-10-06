const express = require("express");
const router = express.Router();
const {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.route("/").post(addContact).get(getAllContacts);
router.route("/:id").get(getContactById).put(updateContact).delete(deleteContact);

module.exports = router;
