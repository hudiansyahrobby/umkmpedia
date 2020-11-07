const Brand = require('../model/brand');

exports.addBrand = async (req, res, next) => {
  const { name } = req.body;
  const loweredCaseName = name.toLowerCase();

  const brand = await Brand.findOne({ name: loweredCaseName });

  if (brand) {
    return res.status(400).json({ success: false, message: 'Brand has already exist' });
  }

  const newBrand = new Brand({
    name: loweredCaseName,
  });

  try {
    await newBrand.save();
    return res.status(201).json({ success: true, brand: newBrand });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find({});
    if (!brands) {
      return res.status(400).json({ success: false, message: 'Brands not found' });
    }

    return res.status(200).json({ success: true, brands });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBrand = async (req, res, next) => {
  const brandId = req.params.id;
  try {
    const brand = await Brand.find({ _id: brandId }).select('name _id');
    if (!brand) {
      return res.status(400).json({ success: false, message: 'brand not found' });
    }

    return res.status(200).json({ success: true, brand });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBrand = async (req, res, next) => {
  const brandId = req.params.id;
  try {
    const brand = await Brand.findByIdAndDelete(brandId);
    if (!brand) {
      return res
        .status(400)
        .json({ success: false, message: "Can't delete brand that doesn't exist" });
    }

    return res.status(200).json({ success: true, message: 'Brand successfully deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBrand = async (req, res, next) => {
  const { name } = req.body;

  const brandId = req.params.id;

  const updatedBrand = {
    name,
  };

  try {
    const brand = await Brand.findByIdAndUpdate(brandId, updatedBrand);
    if (!brand) {
      return res
        .status(400)
        .json({ success: false, message: "Can't update brand that doesn't exist" });
    }

    return res.status(200).json({ success: true, message: 'Brand successfully updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
