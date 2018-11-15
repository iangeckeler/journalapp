console.log('working');
// console.log(data)
// myPlot = Plotly.newPlot('myDiv', data);
// console.log(text)






var myPlot = document.getElementById('myDiv'),
    d3 = Plotly.d3,
    data = [ { x:x, y:y, type:'scatter',
            mode:'markers', marker:{size:16} } ],
    layout = {
        hovermode:'closest',
        title:'Click on Points'
     };

Plotly.newPlot('myDiv', data, layout);

myPlot.on('plotly_click', function(data){
    document.getElementById("entry").innerText = '';
    console.log(data.points)
    var pts = '';
    for(var i=0; i < data.points.length; i++){
        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
        document.getElementById("entry").innerText = text[data.points[i].pointNumber]
    }
    alert('Closest point clicked:\n\n'+pts);
});