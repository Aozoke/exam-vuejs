const News = require('../models/News');


const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des actualités",
      error: error.message
    });
  }
};

module.exports = { getNews };
