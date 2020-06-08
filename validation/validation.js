const { check } = require('express-validator');
const project = [
    check('title').notEmpty().escape().trim(),
    check('description').notEmpty().escape().trim(),
    check('tags').notEmpty().escape().trim()
];

const update = [
    check('title').notEmpty().escape().trim(),
    check('text').notEmpty().escape().trim()
];

const feedback = [
    check('title').notEmpty().escape().trim(),
    check('text').notEmpty().escape().trim()
];

const comment = [
    check('text').notEmpty().escape().trim()
];

const searchproject = [
    check('searchItem').notEmpty().escape().trim()
];

const outside = [
    check('name').notEmpty().escape().trim(),
    check('link').notEmpty().trim()
];

const email = [
    check('name').notEmpty().escape().trim(),
    check('email').notEmpty().isEmail().escape().trim(),
    check('subject').notEmpty().escape().trim(),
    check('message').notEmpty().escape().trim()
];
module.exports = { project, update, feedback, comment, searchproject, outside, email }