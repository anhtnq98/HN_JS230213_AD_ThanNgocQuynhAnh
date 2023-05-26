const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

// Midleware kiểm tra dữ liệu đầu vào
const validateData = (req, res, next) => {
  const { Content, Points } = req.body;
  if (checkIsEmpty(Content)) {
    return res.status(404).json({
      message: "Nội dung không được phép để trống",
    });
  }

  next();
};

module.exports = validateData;
