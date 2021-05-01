const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workouts", ({
  body
}, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//// put route used to update excerise by id number 

router.put('/api/workouts/:id', (req, res) => {
  Workout.updateOne({
      _id: req.params.id
    }, {
      $push: {
        exercises: req.body
      }
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


router.post("/api/workouts/bulk", ({
  body
}, res) => {
  Workout.insertMany(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/// get 7 workouts for stats page


router.get("/api/workouts/range", (req, res) => {

  Workout.aggregate([{
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }, /// necessary for red line on left of dashboard to display correctly

      }
    }])
    .limit(7) // 7 day 
    .then(dbWorkout => {
      console.log(`range: ${dbWorkout}`)
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    })

})

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({
      date: -1
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;