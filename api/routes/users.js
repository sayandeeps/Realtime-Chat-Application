const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


//update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isExpert) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json('Account has been updated');
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json('You can update only your account');
    }
});
//delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isExpert) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted');
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json('You can delete only your account');
    }
});
//get a user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
});
//connect a user
router.put('/:id/connect', async (req, res) => {
    try {
      const studentId = req.params.id;
      const expertId = req.body.userId;
        console.log(studentId, expertId);
      if (studentId === expertId) {
        return res.status(400).json({ message: 'Cannot connect a student to themselves' });
      }
  
      const [student, expert] = await Promise.all([
        User.findById(studentId),
        User.findById(expertId),
      ]);
  
      if (!student || !expert) {
        return res.status(404).json({ message: 'Student or expert not found' });
      }
  
      if (!expert.isExpert) {
        return res.status(400).json({ message: 'User is not an expert' });
      }
  
      if (student.connecedExpert.includes(expertId)) {
        return res.status(400).json({ message: 'Expert is already connected' });
      }
  
      student.connecedExpert.push(expertId);
      expert.connecedStudent.push(studentId);
  
      await Promise.all([student.save(), expert.save()]);
  
      res.status(200).json({ message: 'Expert connected successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

//student disconnect a expert
router.put('/:id/sdisconnect', async (req, res) => {
    try {
        const studentId = req.params.id;
        const expertId = req.body.userId;

        // Check if studentId from URL matches the studentId from request body
        if (studentId !== expertId) {
            // Find the student by ID
            const student = await User.findById(studentId);
            // Find the expert by ID
            const expert = await User.findById(expertId);

            if (!student || !expert) {
                return res.status(404).json({ message: 'Student or expert not found' });
            }

            // Check if the user with expertId is an expert
            if (!expert.isExpert) {
                return res.status(400).json({ message: 'User is not an expert' });
            }

            // Check if the expert is already in the student's connecedExpert list
            if (!student.connecedExpert.includes(expertId)) {
                return res.status(400).json({ message: 'Expert is not connected' });
            }

            // Remove expertId from the student's connecedExpert list
            student.connecedExpert = student.connecedExpert.filter((id) => id !== expertId);
            await student.save();

            // Remove studentId from the expert's connecedStudent list
            expert.connecedStudent = expert.connecedStudent.filter((id) => id !== studentId);
            await expert.save();

            res.status(200).json({ message: 'Expert disconnected successfully' });
        } else {
            res.status(400).json({ message: 'Cannot disconnect a student from themselves' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//expert disconnect a student
router.put('/:id/edisconnect', async (req, res) => {
    try {
        const expertId = req.params.id;
        const studentId = req.body.userId;

        // Check if expertId from URL matches the expertId from request body
        if (expertId !== studentId) {
            // Find the expert by ID
            const expert = await User.findById(expertId);
            // Find the student by ID
            const student = await User.findById(studentId);

            if (!expert || !student) {
                return res.status(404).json({ message: 'Expert or student not found' });
            }

            // Check if the user with studentId is a student
            if (student.isExpert) {
                return res.status(400).json({ message: 'User is not a student' });
            }

            // Check if the student is already in the expert's connecedStudent list
            if (!expert.connecedStudent.includes(studentId)) {
                return res.status(400).json({ message: 'Student is not connected' });
            }

            // Remove studentId from the expert's connecedStudent list
            expert.connecedStudent = expert.connecedStudent.filter((id) => id !== studentId);
            await expert.save();

            // Remove expertId from the student's connecedExpert list
            student.connecedExpert = student.connecedExpert.filter((id) => id !== expertId);
            await student.save();

            res.status(200).json({ message: 'Student disconnected successfully', expert, student });
        } else {
            res.status(400).json({ message: 'Cannot disconnect a student from themselves' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
//get and search all users
router.get('/', async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;