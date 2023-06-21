var express = require("express");
var router = express.Router();
module.exports = router;
const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contact");

router.get("/", (req, res, next) => {
	Contact.find().populate("group")
		.then(contacts => {
			res.status(200).json({
				contacts: contacts
			});
		}).catch(error => {
			res.status(500).json({
				contact: "An error occurred",
				error: error
			});
		});
});


router.post("/", async (req, res, next) => {
	const maxContactId = await sequenceGenerator("contacts");

	const contact = new Contact({
		id: maxContactId,
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		imageUrl: req.body.imageUrl,
		group: req.body.group
	});

	contact.save()
		.then(createdContact => {
			res.status(201).json({
				contact: createdContact
			});
		})
		.catch(error => {
			res.status(500).json({
				contact: "An error occurred",
				error: error
			});
		});
});

router.put("/:id", (req, res, next) => {
	Contact.findOne({ id: req.params.id })
		.then(contact => {
			contact.name = req.body.name
			contact.email = req.body.email
			contact.phone = req.body.phone
			contact.imageUrl = req.body.imageUrl
			contact.group = req.body.group

			Contact.updateOne({ id: req.params.id }, contact)
				.then(result => {
					res.status(204).json({
						contact: "Contact updated successfully"
					})
				})
				.catch(error => {
					res.status(500).json({
						contact: "An error occurred",
						error: error
					});
				});
		})
		.catch(error => {
			res.status(500).json({
				contact: "Contact not found.",
				error: error
			});
		});
});

router.delete("/:id", (req, res, next) => {
	Contact.findOne({ id: req.params.id })
		.then(contact => {
			Contact.deleteOne({ id: req.params.id })
				.then(result => {
					res.status(204).json({
						contact: "Contact deleted successfully"
					});
				})
				.catch(error => {
					res.status(500).json({
						contact: "An error occurred",
						error: error
					});
				})
		})
		.catch(error => {
			res.status(500).json({
				contact: "Contact not found.",
				error: error
			});
		});
});
