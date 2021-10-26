const router = require("express").Router();
const { models } = require("../models");
const jwtValid = require("../middleware/jwtValid");
const adminJwtValid = require("../middleware/adminJwtValid");


// POST a comment - works

router.post("/comment/:postId", jwtValid, async (req, res) => {
    const { content } = req.body.comment;
    const { postId } = req.params
    const { id } = req.user
    const CommentEntry = {
        content,
        concertId: postId,
        userId: id,
    }
    try {
        const newComment = await models.CommentModel.create(CommentEntry)
        res.status(200).json(newComment)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

// router.post("/comment/:postId", jwtValid,  async (req, res)=>{
//     const {content} = req.body.comment;
//     const {postId} = req.params;

//     try{
//         await models.CommentModel.create({
//             content: content,
//             userId: req.user.id,
//             concertId: postId
//         })
//         .then(
//             comment=>{
//                 res.status(201).json({
//                     comment: comment,
//                     message: "Comment successfully created!"
//                 });
//             }
//         )
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to create comment: ${err}`
//         });
//     };

// });

// GET comments by user - works
router.get("/mine", jwtValid, async (req, res) => {
    let userId = req.user.id;
    try {
        const userComments = await models.CommentModel.findAll({
            // include: [
            //     {
            //         model: models.ConcertModel,
            //         include: [
            //             {
            //             model: models.CommentModel
            //             }
            //         ]
            //     }
            // ],
            where: {
                userId: userId
            }
        });
        res.status(200).json(userComments);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// Update Comment - works
router.put("/comment/update/:commentId", jwtValid, async (req, res) => {
    const { content } = req.body.comment;
    const { commentId } = req.params;
    const userId = req.user.id

    const query = {
        where: {
            id: commentId,
            userId: userId,
        }
    };

    const updatedComment = {
        content,
        userId: userId
    };

    try {

        const update = await models.CommentModel.update(updatedComment, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// 10/09 comment - change endpoint to :id?
// DELETE comment - works
router.delete("/comment/delete/:commentId", jwtValid, async (req, res) => {
    const userId = req.user.id;
    const { commentId } = req.params;

    try {
        const query = {
            where: {
                id: commentId,
                userId: userId
            }
        };
        await models.CommentModel.destroy(query);
        res.status(200).json({ message: "Your concert comment was destroyed!" });
    } catch (err) {
        res.status(500).json({ error: err });
    };
});

// Admin Comment Delete - works
router.delete("/comment/delete/admin/:commentId", adminJwtValid, async (req, res) => {
    // const userId = req.user.id;
    const { commentId } = req.params;

    try {
        const query = {
            where: {
                id: commentId,
                // userId: userId
            }
        };
        await models.CommentModel.destroy(query);
        res.status(200).json({ message: "Your concert comment was destroyed!" });
    } catch (err) {
        res.status(500).json({ error: err });
    };
});

module.exports = router;