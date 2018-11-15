console.log('working');
// console.log(data)
// myPlot = Plotly.newPlot('myDiv', data);
// console.log(text)



// allow for the ability to add a variety of objects
//function that spawns a new object
let DivObject = function(id,index) {
    //create div
    this.div = document.createElement( "div" ) ;
    console.log(`div ${id}created`)
    this.div.setAttribute("id",id);
    document.body.appendChild( this.div ) ;
    document.getElementById(id).innerText = text[index]
};
//loop through and spawn each of these
for (i=0;i<text.length;i++) {
    DivObject(id[i],i)
}


// var myPlot = document.getElementById('myDiv'),
//     d3 = Plotly.d3,
//     data = [ { x:x, y:y, type:'scatter',
//             mode:'markers', marker:{size:16} },{ x:x, y:z, type:'scatter',
//             mode:'markers', marker:{size:12} } ],
//     layout = {
//         hovermode:'closest',
//         title:'Click on Points'
//      };

// Plotly.newPlot('myDiv', data, layout);

// myPlot.on('plotly_click', function(data){
//     document.getElementById("entry").innerText = '';
//     console.log(data.points)
//     for(var i=0; i < data.points.length; i++){
//         document.getElementById("entry").innerText = text[data.points[i].pointNumber]
//     }
// });