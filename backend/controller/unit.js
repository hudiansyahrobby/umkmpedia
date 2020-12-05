const Unit = require('../model/unit');

exports.addUnit = async (req, res, next) => {
  const { unit } = req.body;
  const loweredCaseUnit = unit.toLowerCase();

  const isUnitExist = await Unit.findOne({ name: loweredCaseUnit });

  if (isUnitExist) {
    return res.status(400).json({ success: false, message: 'Satuan Telah Ada' });
  }

  const newUnit = new Unit({
    unit: loweredCaseUnit,
  });

  try {
    await newUnit.save();
    return res.status(201).json({ success: true, unit: newUnit });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUnits = async (req, res, next) => {
  try {
    const units = await Unit.find({});
    if (!units) {
      return res.status(400).json({ success: false, message: 'Satuan Tidak Ada' });
    }

    return res.status(200).json({ success: true, units });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
