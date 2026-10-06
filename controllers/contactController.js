const Contact = require("../models/Contact");

// @desc    Add a new contact
// @route   POST /contacts
// @access  Public
const addContact = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    // Check if email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(409).json({
        success: false,
        message: "A contact with this email already exists.",
      });
    }

    const contact = await Contact.create({ name, phone, email });

    res.status(201).json({
      success: true,
      message: "Contact created successfully.",
      data: contact,
    });
  } catch (error) {
    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: messages,
      });
    }

    // Duplicate key error (e.g. duplicate email at DB level)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A contact with this email already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// @desc    Get all contacts
// @route   GET /contacts
// @access  Public
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// @desc    Get a single contact by contactId
// @route   GET /contacts/:id
// @access  Public
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ contactId: req.params.id });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// @desc    Update a contact by contactId
// @route   PUT /contacts/:id
// @access  Public
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ contactId: req.params.id });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    // If email is being updated, check for duplicates
    if (req.body.email && req.body.email !== contact.email) {
      const emailExists = await Contact.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "A contact with this email already exists.",
        });
      }
    }

    // Update only provided fields
    const updatedContact = await Contact.findOneAndUpdate(
      { contactId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Contact updated successfully.",
      data: updatedContact,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: messages,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A contact with this email already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// @desc    Delete a contact by contactId
// @route   DELETE /contacts/:id
// @access  Public
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ contactId: req.params.id });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

module.exports = {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
