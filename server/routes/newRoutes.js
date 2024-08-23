const express = require("express");
const router = express.Router();
const upload=require('../config/upload')

const {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentsByCreator,
    getUrgentNews,
    confirmNews,
    getDocumentsPolitics,
    getDocumentsEconomic,
    getDocumentsSocial,
    getDocumentsSecurity,
    getDocumentsHealth,
    getDocumentsTorist,
    getDocumentsLimits,
    getConfirmedNews,
    createInfoVideo,
    editInfoVideo,
    dayNews,
    categoryNews,
    randomArticles,
    latestArticles
  } = require("../controllers/newController");
const { authMiddleware, authorizeRoles } = require("./authMiddleware");

  router.post("/create",authMiddleware,authorizeRoles('super admin','admin',"editor") ,upload.single("image"), createDocument);
  router.get("/allNews", getDocuments);
  router.get("/confirmed/News",getConfirmedNews)
  router.get("/getNew/:id", getDocumentById);
  router.put('/edit/:id',authMiddleware,authorizeRoles('super admin','admin',"editor"),upload.single("image"),updateDocument);
  router.delete('/delete/:id',authMiddleware,authorizeRoles('super admin','admin',"editor"),deleteDocument);
  router.get("/myNews/:id",authMiddleware,authorizeRoles('super admin','admin',"editor"),getDocumentsByCreator);
  router.get("/urgent/News",getUrgentNews);
  router.put("/confirmNews/:id",authMiddleware,authorizeRoles('super admin','admin'),confirmNews)
  router.get("/Politics", getDocumentsPolitics);
  router.get("/Economic", getDocumentsEconomic);
  router.get("/Social", getDocumentsSocial);
  router.get("/Security", getDocumentsSecurity);
  router.get("/Health", getDocumentsHealth);
  router.get("/Torist", getDocumentsTorist);
  router.get("/Limits", getDocumentsLimits);
  router.post("/createInfoVideo", authMiddleware, authorizeRoles('super admin', 'admin', 'editor'), upload.single("image"), (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
  
    createInfoVideo(req, res);
  });

  router.put("/editInfoVideo/:id", authMiddleware, authorizeRoles('super admin', 'admin', 'editor'), upload.single("image"), (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
  
    editInfoVideo(req, res);
  });
  router.get("/Day/News",dayNews);
  router.get("/news/category",categoryNews);
  router.get('/random',randomArticles)
  router.get('/latest',latestArticles)


  module.exports = router;



