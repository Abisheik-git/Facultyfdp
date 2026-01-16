const express = require('express');
const router = express.Router();
const FDPAttended = require('../models/FDPAttended');
const FDPOrganized = require('../models/FDPOrganized');
const Seminar = require('../models/Seminar');
const ABL = require('../models/ABL');
const JointTeaching = require('../models/JointTeaching');
const AdjunctFaculty = require('../models/AdjunctFaculty');
const Notification = require('../models/Notification');

// Middleware to get faculty ID from headers
const getFacultyId = (req, res, next) => {
  req.facultyId = req.headers['user-id'] || req.body.facultyId;
  if (!req.facultyId) {
    return res.status(401).json({ error: 'Unauthorized - Faculty ID required' });
  }
  next();
};

// ========== FDP Attended Routes ==========
router.get('/fdp/attended', getFacultyId, async (req, res) => {
  try {
    const records = await FDPAttended.find({ facultyId: req.facultyId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/fdp/attended', getFacultyId, async (req, res) => {
  try {
    const record = new FDPAttended({
      ...req.body,
      facultyId: req.facultyId,
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/fdp/attended/:id', getFacultyId, async (req, res) => {
  try {
    const record = await FDPAttended.findOneAndUpdate(
      { _id: req.params.id, facultyId: req.facultyId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/fdp/attended/:id', getFacultyId, async (req, res) => {
  try {
    const record = await FDPAttended.findOneAndDelete({
      _id: req.params.id,
      facultyId: req.facultyId,
    });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== FDP Organized Routes ==========
router.get('/fdp/organized', getFacultyId, async (req, res) => {
  try {
    const records = await FDPOrganized.find({ facultyId: req.facultyId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/fdp/organized', getFacultyId, async (req, res) => {
  try {
    const record = new FDPOrganized({
      ...req.body,
      facultyId: req.facultyId,
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/fdp/organized/:id', getFacultyId, async (req, res) => {
  try {
    const record = await FDPOrganized.findOneAndUpdate(
      { _id: req.params.id, facultyId: req.facultyId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/fdp/organized/:id', getFacultyId, async (req, res) => {
  try {
    const record = await FDPOrganized.findOneAndDelete({
      _id: req.params.id,
      facultyId: req.facultyId,
    });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== Seminar Routes ==========
router.get('/seminars', getFacultyId, async (req, res) => {
  try {
    const records = await Seminar.find({ facultyId: req.facultyId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/seminars', getFacultyId, async (req, res) => {
  try {
    const record = new Seminar({
      ...req.body,
      facultyId: req.facultyId,
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/seminars/:id', getFacultyId, async (req, res) => {
  try {
    const record = await Seminar.findOneAndUpdate(
      { _id: req.params.id, facultyId: req.facultyId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/seminars/:id', getFacultyId, async (req, res) => {
  try {
    const record = await Seminar.findOneAndDelete({
      _id: req.params.id,
      facultyId: req.facultyId,
    });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== ABL Routes ==========
router.get('/abl', getFacultyId, async (req, res) => {
  try {
    const records = await ABL.find({ facultyId: req.facultyId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/abl', getFacultyId, async (req, res) => {
  try {
    const record = new ABL({
      ...req.body,
      facultyId: req.facultyId,
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/abl/:id', getFacultyId, async (req, res) => {
  try {
    const record = await ABL.findOneAndUpdate(
      { _id: req.params.id, facultyId: req.facultyId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/abl/:id', getFacultyId, async (req, res) => {
  try {
    const record = await ABL.findOneAndDelete({
      _id: req.params.id,
      facultyId: req.facultyId,
    });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== Joint Teaching Routes ==========
router.get('/joint-teaching', getFacultyId, async (req, res) => {
  try {
    const records = await JointTeaching.find({ facultyId: req.facultyId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/joint-teaching', getFacultyId, async (req, res) => {
  try {
    const record = new JointTeaching({
      ...req.body,
      facultyId: req.facultyId,
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/joint-teaching/:id', getFacultyId, async (req, res) => {
  try {
    const record = await JointTeaching.findOneAndUpdate(
      { _id: req.params.id, facultyId: req.facultyId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/joint-teaching/:id', getFacultyId, async (req, res) => {
  try {
    const record = await JointTeaching.findOneAndDelete({
      _id: req.params.id,
      facultyId: req.facultyId,
    });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== Adjunct Faculty Routes ==========
router.get('/adjunct', getFacultyId, async (req, res) => {
  try {
    const records = await AdjunctFaculty.find({ facultyId: req.facultyId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/adjunct', getFacultyId, async (req, res) => {
  try {
    const record = new AdjunctFaculty({
      ...req.body,
      facultyId: req.facultyId,
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/adjunct/:id', getFacultyId, async (req, res) => {
  try {
    const record = await AdjunctFaculty.findOneAndUpdate(
      { _id: req.params.id, facultyId: req.facultyId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/adjunct/:id', getFacultyId, async (req, res) => {
  try {
    const record = await AdjunctFaculty.findOneAndDelete({
      _id: req.params.id,
      facultyId: req.facultyId,
    });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== Notifications Routes ==========
router.get('/notifications', getFacultyId, async (req, res) => {
  try {
    const records = await Notification.find({ recipientId: req.facultyId })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/notifications/:id/read', getFacultyId, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipientId: req.facultyId },
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/notifications/read-all', getFacultyId, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipientId: req.facultyId, read: false },
      { read: true }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== Dashboard Stats ==========
router.get('/dashboard', getFacultyId, async (req, res) => {
  try {
    const [fdpAttended, fdpOrganized, seminars, abl, jointTeaching, adjunct] = await Promise.all([
      FDPAttended.countDocuments({ facultyId: req.facultyId }),
      FDPOrganized.countDocuments({ facultyId: req.facultyId }),
      Seminar.countDocuments({ facultyId: req.facultyId }),
      ABL.countDocuments({ facultyId: req.facultyId }),
      JointTeaching.countDocuments({ facultyId: req.facultyId }),
      AdjunctFaculty.countDocuments({ facultyId: req.facultyId }),
    ]);

    const recentFDPs = await FDPAttended.find({ facultyId: req.facultyId })
      .sort({ createdAt: -1 })
      .limit(3);

    res.json({
      stats: {
        fdpAttended,
        fdpOrganized,
        seminars,
        abl,
        jointTeaching,
        adjunct,
      },
      recentFDPs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
