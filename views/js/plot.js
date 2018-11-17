console.log('working');
// console.log(data)
// myPlot = Plotly.newPlot('myDiv', data);
// console.log(text)



var myPlot = document.getElementById('myDiv'),
    d3 = Plotly.d3,
    data = [ { x:x, y:y, type:'scatter',
            mode:'markers', marker:{size:16} },{ x:x, y:z, type:'scatter',
            mode:'markers', marker:{size:12} } ],
    layout = {
        hovermode:'closest',
        title: title,
        width: window.innerWidth,
        height: 0.6 * window.innerHeight
     };

Plotly.newPlot('myDiv', data, layout);

document.getElementById("entryTitle").innerText = 'Entry on: '+x[0];
document.getElementById("entry").innerText = text[0];

myPlot.on('plotly_click', function(data){
    console.log(data.points)
    for(var i=0; i < data.points.length; i++){
        document.getElementById("entryTitle").innerText = 'Entry on: '+x[data.points[i].pointNumber];
        document.getElementById("entry").innerText = text[data.points[i].pointNumber]
    }
});