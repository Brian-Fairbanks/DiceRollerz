const router = require("express").Router();
const bookRoutes = require("./chat");

// Book routes
router.use("/chat", bookRoutes);

module.exports = router;
