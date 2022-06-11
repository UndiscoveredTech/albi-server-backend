const Settings = require('../models/settings.model');    


const insertSettings = async (req, res) => {
    const settings = new Settings({
        salary: req.body.salary,
        bonusDay: req.body.bonusDay,
        bonusNight: req.body.bonusNight,
        
    });
    try {
        const settingsClaim = await settings.save();
        const returnAllSettings = await Settings.find();
        res.json(returnAllSettings);
    } catch (err) {
        res.json({ message: err });
    }
}

const getSettings = async (req, res) => {
   
    try {
        const settings = await Settings.find();
        res.json(settings);
    } catch (err) {
        res.json({ message: err });
    }
}



const updateSettings = async (req, res) => {

  const settings = req.body;
  const updatedSettings = [];
  settings.forEach(async (element) => {
      try {
      const updateSettings = await Settings.updateOne(
        { _id: element._id },
        {
          $set: {
            salary: element.salary,
            bonusDay:element.bonusDay,
            bonusNight:element.bonusNight,
          }
        }
      );
      updatedSettings.push(updateSettings)
    }
    catch (err) {
      res.json({ message: err });
    }
  });

  res.json(JSON.stringify(updatedSettings));

  }



  const getSingleSettingsById = async (req, res) => {
    try {
      const setting = await Settings.findById(req.params.settingId);
      res.json(setting)
    } catch (err) {
      res.json({ message: err });
    }
  }


  const getSingleSettingsBySalary = async (req, res) => {
    try {
      const setting = await Settings.findOne({salary: req.params.salary});
      res.json(setting)
    } catch (err) {
      res.json({ message: err });
    }
  }
module.exports = { insertSettings, getSettings, updateSettings, getSingleSettingsById, getSingleSettingsBySalary};

