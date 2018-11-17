const getEntries = require('../scripts/getentries')

const monthPlot = function(req,res){
    let user = req.session.user;
    getEntries('month', user).then(data=>{
        res.render('plot.html',{message:'Month Plot', data: data})
    }
    ).catch(err=>{
        res.render('plot')
        console.log('whoops')
    })
};

const allPlot = (req,res)=>{
    let user = req.session.user;
    getEntries('', user).then(data=>{
        res.render('plot.html',{message:'All Plot', data: data})
    }
    ).catch(err=>{
        res.render('plot')
        console.log('whoops')
    })
};

const weekPlot = (req,res)=>{
    let user = req.session.user;
    getEntries('week',user).then((data)=> {
    res.render('plot.html',{message:'Week Plot', data: data})
    }).catch(err=>{
        res.render('plot')
        console.log('whoops')
    })
};

module.exports.monthPlot = monthPlot;
module.exports.weekPlot = weekPlot;
module.exports.allPlot = allPlot;

