exports.apartmentList = (req, res) => {
  res.status(200).json({
    message: 'Appartments fetched successfuly',
    data: [],
  });
};
