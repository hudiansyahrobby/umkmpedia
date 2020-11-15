const Category = require('../model/category');

exports.addCategory = async (req, res, next) => {
  const { name } = req.body;
  const loweredCaseName = name.toLowerCase();

  const category = await Category.findOne({ name: loweredCaseName });

  if (category) {
    return res.status(400).json({ success: false, message: 'Kategori Telah Ada' });
  }

  const newCategory = new Category({
    name: loweredCaseName,
  });

  try {
    await newCategory.save();
    return res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res.status(400).json({ success: false, message: 'Kategori Tidak Ada' });
    }

    return res.status(200).json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.find({ _id: categoryId }).select('name _id');
    if (!category) {
      return res.status(400).json({ success: false, message: 'Kategori Tidak Ditemukan' });
    }

    return res.status(200).json({ success: true, category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: 'Tidak Dapat Menghapus Kategori Yang Tidak Ada' });
    }

    return res.status(200).json({ success: true, message: 'Kategori Berhasil Dihapus' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res, next) => {
  const { name } = req.body;

  const categoryId = req.params.id;

  const isCategoryExist = await Category.findOne({ name });
  if (isCategoryExist) {
    return res.status(400).json({ success: false, message: 'Kategori Sudah Ada' });
  }
  const updatedCategory = {
    name,
  };

  try {
    const category = await Category.findByIdAndUpdate(categoryId, updatedCategory);
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: 'Tidak Bisa Mengupdate Kategori Yang Tidak Ada' });
    }

    return res.status(200).json({ success: true, message: 'Kategori Berhasil Diupdate' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
