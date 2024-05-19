const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Aventure' },
    { id: 3, name: 'Romantic' },
    { id: 4, name: 'Comedy' }, 
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error)  return res.status(400).send(error.details[0].message);
       
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found.');

    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // Update course
    genre.name = req.body.name;
    // Return the updated course 
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found.');

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1); // to remove/delete an object

    // Return the same course
    res.send(genre);
})

// /api/courses/1 - Single Route Parameters
// We use route parameters for essential or required values
router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found.');
    res.send(genre);
});

function validateGenre(genre) {
    // Validate
    // If invalid, return 400 - Bad request
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });

    return schema.validate(genre);
}

module.exports = router;

