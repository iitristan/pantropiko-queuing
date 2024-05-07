const express = require("express");
const router = express.Router();

router.post("/queue", queue);
router.post("/admin", admin);

module.exports = router;