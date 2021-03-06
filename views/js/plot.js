console.log('working');
// console.log(data)
// myPlot = Plotly.newPlot('myDiv', data);

//detect mobile browser
function detectmob() {
    if(window.innerWidth <= 800 && window.innerHeight <= 600) {
      return true;
    } else {
      return false;
    }
 }

var myPlot = document.getElementById('myDiv'),
    d3 = Plotly.d3,
    data = [ 
        { x:x, y:y, name: 'Happiness Score', type:'scatter',
            mode:'markers', marker:{size:12} },{ x:x, y:z, name:'Sadness Score', type:'scatter',
            mode:'markers', marker:{size:12} } ],
    layout = {
        hovermode:'closest',
        title: title,
        width: window.innerWidth,
        height: 0.6 * window.innerHeight,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font:{
            color: '#ffffff'
        },
        yaxis: {
          title: 'AI Mood Score',
          titlefont: {
            size: 18,
            color: '#ffffff'
          },
          tickfont:{
            color:'white'
        }
        },
        xaxis: {
            tickfont: {
                color:'white'
            }
        }
     };

Plotly.newPlot('myDiv', data, layout,{responsive:true});

window.onresize = function() {
    Plotly.relayout(myDiv, {
      width: window.innerWidth,
    })
  }

document.getElementById("entryTitle").innerText = x[0].substring(0, 10);
document.getElementById("entry").innerText = text[0];

myPlot.on('plotly_click', function(data){
    console.log(data.points)
    for(var i=0; i < data.points.length; i++){
        document.getElementById("entryTitle").innerText = x[data.points[i].pointNumber].substring(0, 10);
        document.getElementById("entry").innerText = text[data.points[i].pointNumber]
    }
});
