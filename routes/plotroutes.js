const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session')

// const getWeek = require('../scripts/getweek');
// const getAll = require('../scripts/getallentries');
// const getMonth = require('../scripts/getmonth');
const getEntries = require('../scripts/getentries');

const monthPlot = require('../controllers/plothandler').monthPlot;
const allPlot = require('../controllers/plothandler').allPlot;
const weekPlot = require('../controllers/plothandler').weekPlot;

router.get('/month',monthPlot)

router.get('/all',allPlot)

router.get('/week',weekPlot)

module.exports = router;