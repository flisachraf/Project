// controllers/newSchemaController.js
const NewSchema = require("../models/newModel");
const fs = require("fs-extra");
const path = require("path");

// Create a new document
exports.createDocument = async (req, res) => {
  try {
    // Parsing JSON fields from FormData
    const title = JSON.parse(req.body.title);
    const mainParagraph = JSON.parse(req.body.mainParagraph);
    const subtitles = JSON.parse(req.body.subtitles);
    const category = req.body.category;
    const isUrgent=req.body.isUrgent;
    const isNews=req.body.isNews

    const newDocument = new NewSchema({
      title,
      creator:req.body.creator,
      mainParagraph,
      subtitles,
      category,
      isUrgent,
      isNews,
      image: req.file ? req.file.path : undefined,
      // Add any additional fields you need to initialize
    });

    await newDocument.save();
    res.status(201).json({ message: 'Article created successfully' });
  } catch (err) {
    console.log("**************",err)
    res.status(400).json({ error: err.message });
  }
};

// Get all documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await NewSchema.find().sort({ createdAt: -1 }).populate([{
      path: 'creator',
      select: 'username role image' // Include only specific fields from the creator
    },{path: 'publisher',
      select: 'username role image'}])
    res.status(200).json(documents);
  } catch (error) {
    console.log("*************",error)
    res.status(500).json({ message: "Error fetching documents", error });
  }
};
exports.getConfirmedNews = async (req, res) => {
  try {
    // Fetch the latest 4 confirmed articles, excluding specific categories
    const documents = await NewSchema.find({
      status: "confirmed",
      category: { $nin: ["Infographs", "VideoGraphs"] } // Exclude specific categories
    })
    .sort({ confirmedAt: -1 }) // Sort by confirmedAt in descending order
    .limit(4) // Limit to 4 articles
    .populate([{
      path: 'creator',
      select: 'username role image' // Include only specific fields from the creator
    }, {
      path: 'publisher',
      select: 'username role image'
    }]);

    res.status(200).json(documents);
  } catch (error) {
    console.log("*************", error);
    res.status(500).json({ message: "Error fetching documents", error });
  }
};

exports.getDocumentsByCreator =async (req,res)=>{
  try{
    const documents = await NewSchema.find({creator:req.params.id}).sort({confirmedAt:-1}).populate([{
      path: 'creator',
      select: 'username role image' // Include only specific fields from the creator
    },{path: 'publisher',
      select: 'username role image'}]);
    res.status(200).json(documents);
  }catch (error) {
    console.log("*************",error)
    res.status(500).json({ message: "Error fetching documents", error });
  }
},
// Get a single document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await NewSchema.findById(id).populate({
      path: 'creator',
      select: 'username image',
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: "Error fetching document", error });
  }
};

// Update a document
exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, mainParagraph, subtitles, creator, publisher, status, category,isUrgent,isNews } = req.body;

    // Find existing document
    const existingDoc = await NewSchema.findById(id);

    if (!existingDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Handle image update
    if (req.file) {
      // Delete the old image if it exists
      if (existingDoc.image) {
        await fs.unlink(path.join(__dirname, "../uploads", existingDoc.image));
      }
      existingDoc.image = req.file.filename;
    }

    // Update fields
    existingDoc.title = JSON.parse(title);
    existingDoc.mainParagraph = JSON.parse(mainParagraph);
    existingDoc.subtitles = JSON.parse(subtitles);
    existingDoc.creator = creator;
    existingDoc.publisher = publisher;
    existingDoc.status = status;
    existingDoc.category = category;
    existingDoc.isUrgent=isUrgent;
    existingDoc.isNews=isNews;
    existingDoc.updatedAt = Date.now();

    // Save updated document
    const updatedDoc = await existingDoc.save();

    res.status(200).json(updatedDoc);
  } catch (error) {
    console.error('Error updating document:', error); // Log the full error
    res.status(500).json({ message: "Error updating document", error });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the document from MongoDB and ensure it's a Mongoose document
    const existingDoc = await NewSchema.findByIdAndDelete(id);
    
    if (!existingDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Delete the image if it exists
    if (existingDoc.image) {
      const imagePath = path.join(__dirname, "", existingDoc.image);

      // Check if the file exists before attempting deletion
      try {
        await fs.access(imagePath); // Check if file exists
        await fs.unlink(imagePath); // Delete the file
      } catch (err) {
        console.error("Error deleting image:", err);
        // Handle the error as needed, like logging or continuing without throwing
      }
    }

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ message: "Error deleting document", error });
  }
};


exports.confirmNews = async (req, res) => {
  try {
    const id =req.params.id
    const userId = req.user.id;
    console.log(userId)
    const news = await NewSchema.findByIdAndUpdate(
      id,
      {
        status: 'confirmed',
        confirmedAt: new Date(),
        publisher: userId
      },{ new: true } );

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    console.error("Error confirming news:", error);
    res.status(500).json({ message: "Error confirming news", error });
  }
};

const moment = require('moment'); // For handling date and time calculations

exports.getUrgentNews = async (req, res) => {
  try {
    const now = new Date();
    const fourHoursLater = moment(now).subtract(4, 'hours').toDate(); // Time 4 hours ago

    const news = await NewSchema.find({
      status: 'confirmed',
      confirmedAt: { $gte: fourHoursLater }, // Check if confirmedAt is within the last 4 hours
      isUrgent: true
    });

    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching urgent news:", error);
    res.status(500).json({ message: "Error fetching urgent news", error });
  }
};
exports.getDocumentsPolitics = async (req, res) => {
  try {
    const documents = await NewSchema.find({category:"Politics"});
    res.status(200).json(documents);
  } catch (error) {
    console.log("*************",error)
    res.status(500).json({ message: "Error fetching documents", error });
  }
};
exports.getDocumentsEconomic = async (req, res) => {
  try {
    const documents = await NewSchema.find({category:"Economic"});
    res.status(200).json(documents);
  } catch (error) {
    console.log("*************",error)
    res.status(500).json({ message: "Error fetching documents", error });
  }
};
exports.getDocumentsSocial = async (req, res) => {
  try {
    const documents = await NewSchema.find({category:"Social"});
    res.status(200).json(documents);
  } catch (error) {
    console.log("*************",error)
    res.status(500).json({ message: "Error fetching documents", error });
  }
};
exports.getDocumentsSecurity = async (req, res) => {
  try {
    const documents = await NewSchema.find({category:"Security"});
    res.status(200).json(documents);
  } catch (error) {
    console.log("*************",error)
    res.status(500).json({ message: "Error fetching documents", error });
  }
};
exports.getDocumentsHealth = async (req, res) => {
  try {
    const documents = await NewSchema.find({category:"Health"});
    res.status(200).json(documents);
  } catch (error) {
    console.log("*************",error)
    res.status(500).json({ message: "Error fetching documents", error });
  }
};
exports.getDocumentsTorist = async (req, res) => {
  try {
    const documents = await NewSchema.find({category:"Torist"});
    res.status(200).json(documents);
  } catch (error) {
    console.log("*************",error)
    res.status(500).json({ message: "Error fetching documents", error });
  }
};
exports.getDocumentsLimits = async (req, res) => {
  try {
    const documents = await NewSchema.find({category:"Limits"});
    res.status(200).json(documents);
  } catch (error) {
    console.log("*************",error)
    res.status(500).json({ message: "Error fetching documents", error });
  }
};
exports.createInfoVideo = async(req,res)=>{
  try {
    const { title, category, creator, videoUrl } = req.body;
    let image = null;

    if (req.files && req.files.image) {
      image = req.files.image.data.toString('base64');
    }

    const newMediaItem = new NewSchema({
      title: JSON.parse(title),
      category,
      creator,
      videoUrl,
      image: req.file ? req.file.path : undefined,
    });

    await newMediaItem.save();

    res.status(201).json({ message: 'Media item created successfully', mediaItem: newMediaItem });
  } catch (error) {
  console.log("*************",error)
  res.status(500).json({ message: "Error create documents", error });
}
}

exports.editInfoVideo = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you pass the ID of the media item via URL parameters
    const { title, category, creator, videoUrl } = req.body;
    let newImage = null;

    // Find the media item by ID
    const mediaItem = await NewSchema.findById(id);

    if (!mediaItem) {
      return res.status(404).json({ message: 'Media item not found' });
    }

    // Update fields
    mediaItem.title = JSON.parse(title) || mediaItem.title;
    mediaItem.category = category || mediaItem.category;
    mediaItem.creator = creator || mediaItem.creator;
    mediaItem.videoUrl = videoUrl || mediaItem.videoUrl;

    // Handle file update
    if (req.file) {
      // If there's a new file, delete the old one
      if (mediaItem.image) {
        // Resolve the path to the old image
        const oldImagePath = path.join(__dirname, '../uploads', path.basename(mediaItem.image));
        
        // Delete the old image file
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      }

      // Update with new image data
      mediaItem.image = req.file.path;
    }

    // Save the updated media item
    await mediaItem.save();

    res.status(200).json({ message: 'Media item updated successfully', mediaItem });
  } catch (error) {
    console.error("*************", error);
    res.status(500).json({ message: "Error updating document", error });
  }
};
exports.dayNews =async(req,res)=>{
  try {
    // Fetch the latest 4 confirmed articles, excluding specific categories
    const documents = await NewSchema.find({
      status: "confirmed",
      isNews:true // Exclude specific categories
    })
    .sort({ confirmedAt: -1 }) // Sort by confirmedAt in descending order
    .limit(10) // Limit to 4 articles
    .populate([{
      path: 'creator',
      select: 'username role image' // Include only specific fields from the creator
    }, {
      path: 'publisher',
      select: 'username role image'
    }]);

    res.status(200).json(documents);
  } catch (error) {
    console.log("*************", error);
    res.status(500).json({ message: "Error fetching documents", error });
  }
}

exports.categoryNews=async(req,res)=>{
  const { category, page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const totalArticles = await NewSchema.countDocuments({ category });
    const articles = await NewSchema.find({ category })
      .sort({confirmedAt:-1})
      .skip(Number(skip))
      .limit(Number(limit));

    res.json({
      articles,
      totalPages: Math.ceil(totalArticles / limit),
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles', error });
  }
}
exports.randomArticles= async (req, res) => {
  try {
      const { category, startDate, endDate } = req.query;

      if (!category || !startDate || !endDate) {
          return res.status(400).json({ message: 'Category, startDate, and endDate are required' });
      }

      // Convert startDate and endDate to Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Fetch random articles
      const articles = await NewSchema.aggregate([
          {
              $match: {
                  category: category,
                  confirmedAt: { $gte: start, $lte: end }
              }
          },
          { $sample: { size: 3 } } // Get 3 random articles
      ]);

      res.json({ articles });
  } catch (error) {
      console.error('Error fetching random articles:', error);
      res.status(500).json({ message: 'Server error' });
  }
}
exports.latestArticles = async (req, res) => {
  const { category } = req.query;
  
  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    const articles = await NewSchema.find({ category: category }).sort({ confirmedAt: -1 }).limit(3);
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
};