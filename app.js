//backend

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


require('dotenv').config();//טעינת הקובץ env 
const app = express();//יצירת מופע של השרת שיצרתי 
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Successful login"))
  .catch(err => console.error("Connection error", err));

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  const SchemaP = require('./models/SchemaP');

  app.post('/api/data', async (req, res) => {
    console.log('Body received:', req.body);

    try {
      const { Altitude, HSI, ADI } = req.body;
  
      // בדיקת שדות חסרים
      if (
        Altitude === undefined || Altitude === null ||
        HSI === undefined || HSI === null ||
        ADI === undefined || ADI === null
      ) {
        return res.status(400).json({
          error: 'שגיאה בנתונים: יש למלא את כל השדות (Altitude, HIS, ADI)'
        });
      }
  
      // בדיקת טווחים
      if (
        Altitude < 0 || Altitude > 3000 ||
        HSI < 0 || HSI > 360 ||
        ADI < -100 || ADI > 100
      ) {
        return res.status(400).json({
          error: 'אחד הערכים חורג מהטווח המותר'
        });
      }
  
      const newEntry = new SchemaP({ Altitude, HSI, ADI });
      await newEntry.save();
  
      res.status(201).json({ message: 'The data has been saved in db', data: newEntry });
  
    } catch (err) {
      res.status(500).json({ error: 'Error saving', details: err });
    }
  });

  app.get('/api/last', async (req, res) => {
    try {
      const lastEntry = await SchemaP.findOne().sort({ _id: -1 });
      res.json(lastEntry);
    } catch (err) {
      res.status(500).json({ error: 'שגיאה בשליפה אחרונה', details: err });
    }
  });
  
  