const Contact = require('../models/ContactModel');

exports.contacts = (req, res) => {
  res.render('contacts', {
    contact: {}
  });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();
  
    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('/contact'));
      return;
    }
  
    req.flash('success', 'Contato registrado na sua agenda com sucesso');
    req.session.save(() => res.redirect(`/contact/homePage/${contact.contact._id}`));
    return;
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.editHomePage = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const contact = await Contact.searchById(req.params.id);
  if(!contact) return res.render('404');
  res.render('contacts', { contact });
}

exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const contact = new Contact(req.body);
    await contact.edit(req.params.id);
  
    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }
  
    req.flash('success', 'Contato editado com sucesso');
    req.session.save(() => res.redirect(`/contact/homePage/${contact.contact._id}`));
    return;
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
}