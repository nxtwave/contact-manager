var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  company: String,
  firstName: String,
  lastName: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  email: String
});

mongoose.connect('mongodb://localhost/contacts');

var Contact = mongoose.model('Contact', contactSchema);

/**
 * Return the list of contacts
 * @returns {T|Query|State|*}
 */
module.exports.list = function() {
  return Contact.find({}).exec();
};

/**
 * Retrieve single contact
 * @param id contact id to retrieve
 * @param callback the callback method
 */
module.exports.get = function(id) {
  return Contact.findOne({_id: id}).exec();
};

/**
 * Update a single contact
 * @param id the contact id to update
 * @param document the update document
 * @param callback the callback method
 */
module.exports.update = function(id, document) {
  return Contact.update({_id: id}, document).exec();
};

/**
 * Create a new contact
 * @param document the create document
 * @param callback the callback method
 */
module.exports.create = function(document) {
  return Contact.create(document).exec();
};

/**
 * Delete a single contact
 * @param id the contact id to delete
 * @param callback the callback method
 */
module.exports.delete = function(id) {
  return Contact.remove({_id: id}).exec();
};
