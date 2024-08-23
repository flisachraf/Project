const express = require("express");
const router = express.Router();

const {createSubscriber,deleteSubscribe,findAll}=require("../controllers/subscribeController")
const { authMiddleware, authorizeRoles } = require("./authMiddleware");

router.post("/",createSubscriber);
router.get("/allSubscribers",authMiddleware,authorizeRoles('super admin','admin'),findAll);
router.delete("/deleteSubscriber/:id",authMiddleware,authorizeRoles('super admin','admin'),deleteSubscribe);

module.exports= router;