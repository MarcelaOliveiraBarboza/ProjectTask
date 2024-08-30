const Contact = require('../models/ContactModel');

exports.homePage = async (req, res) => {
  const contacts = await Contact.searchContact();
  res.render('homePage', { contacts });
};
