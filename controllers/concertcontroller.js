const Express = require("express");
const router = Express.Router();
const { models } = require("../models")
const adminJwtValid = require("../middleware/adminJwtValid")
const jwtValid = require("../middleware/jwtValid")



// POST Concert Create - works 

router.post('/create', jwtValid, async (req, res) => {
    const { bandName, openingAct, dateAttended, location, description } = req.body.concert;
    const { id } = req.user;
    const ConcertEntry = {
        bandName,
        openingAct,
        dateAttended,
        location,
        description,
        userId: id,
    }
    try {
        const newConcert = await models.ConcertModel.create(ConcertEntry);
        res.status(200).json(newConcert);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// router.post("/create", jwtValid, async (req, res)=>{
//     const {bandName, openingAct, dateAttended, location, description} = req.body.concert;

//     try{
//         await models.ConcertModel.create({
//             bandName: bandName,
//             openingAct: openingAct,
//             dateAttended: dateAttended,
//             location: location,
//             description: description,
//             userId: req.user.id

//         })
//         .then(
//             concertCreate => {
//                 res.status(201).json ({
//                     concertCreate: concertCreate,
//                     message: "New Concert Expirence created!"
//                 });
//             }
//         )
//     } catch (err) {
//         res.status(500).json({
//             error: `Could not create new expirence: ${err}`
//         });
//     };

// });

// GET all Concert entries - works
router.get("/all", jwtValid, async (req, res) => {
    try {
        const shows = await models.ConcertModel.findAll();
        res.status(200).json(shows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// GET concerts by user - works
router.get("/mine", jwtValid, async (req, res) => {
    let userId = req.user.id;

    try {
        const userConcerts = await models.ConcertModel.findAll({

            where: {
                userId: userId
            },
            include: [
                {
                    model: models.CommentModel
                }
            ],


        });
        res.status(200).json(userConcerts);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// GET a concert 
router.get("/one/:concertId", jwtValid, async (req, res) => {
    let userId = req.user.id;
    let concertId = req.params.concertId
    console.log(userId)
    try {
        const userConcerts = await models.ConcertModel.findOne({

            where: {
                id: concertId,
                // userId: userId
            },
            include: [
                {
                    model: models.CommentModel
                }
            ],
        });
        res.status(200).json(userConcerts);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});


// UPDATE concert expirence - works
router.put("/update/:id", jwtValid, async (req, res) => {
    const { bandName, openingAct, dateAttended, location, description, comment } = req.body.concert;
    const concertId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: concertId,
            userId: userId
        }
    };

    const updatedConcert = {
        bandName: bandName,
        openingAct: openingAct,
        dateAttended: dateAttended,
        location: location,
        description: description,
        comment: comment,
    };

    try {
        const update = await models.ConcertModel.update(updatedConcert, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    };
});

// Admin Update - works
router.put("/update/admin/:entryId", adminJwtValid, async (req, res) => {
    const { bandName, openingAct, dateAttended, location, description, comment } = req.body.concert;
    const concertId = req.params.entryId;


    const query = {
        where: {
            id: concertId,

        }
    };

    const updatedConcert = {
        bandName,
        openingAct,
        dateAttended,
        location,
        description,
        comment,
    };

    try {
        const update = await models.ConcertModel.update(updatedConcert, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    };
});

// DELETE concert experience - Works
router.delete("/delete/:id", jwtValid, async (req, res) => {
    const userId = req.user.id;
    const concertId = req.params.id;

    try {
        const query = {
            where: {
                id: concertId,
                userId: userId
            }
        };
        await models.ConcertModel.destroy(query);
        res.status(200).json({ message: "Your concert experience was destroyed!" });
    } catch (err) {
        res.status(500).json({ error: err });
    };
});


module.exports = router;