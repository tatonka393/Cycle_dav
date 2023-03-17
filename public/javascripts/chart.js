





// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);



// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  focusable: true,
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  
}));

var easing = am5.ease.linear;


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.5,
  extraMin:-0.1,
  extraMax:0.1,
  groupData: true,
  baseInterval: {
    timeUnit: "second",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 50
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  minBulletDistance: 10,
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal",
    labelText: "{valueY}"
  })
}));
// series.strokes.template.setAll({
//     //templateField: "strokeSettings",
//     strokeWidth: 2,
//     templateField:{
//      strokeSettings: {
//          stroke: am5.color(0x3240a8)
//        }
//     }
//   });
//series.data.setAll(data);

// series.bullets.push(function () {
//   return am5.Bullet.new(root, {
//     locationX:undefined,
//     sprite: am5.Circle.new(root, {
//       radius: 4,
//       fill: series.get("fill")
//     })
//   })
// });


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false);


// Update data every second
// setInterval(function () {
//   addData();
// }, 1000)

//var colorSet = am5.ColorSet.new(root, {});
function addData(newValue) {
  //var lastDataItem = series.dataItems[series.dataItems.length - 1];
  var time = am5.time.add(new Date()).getTime();
  if(series.data.length > 18000)
    series.data.shift()
  series.data.push({
    date: time,
    value: newValue,
    // strokeSettings: {
    //     stroke: am5.color(0x3240a8)
    //   }
  })

//   var newDataItem = series.dataItems[series.dataItems.length - 1];
//   newDataItem.animate({
//     key: "valueYWorking",
//     to: newValue,
//     //from: lastValue,
//     duration: 200,
//     easing: easing
//   });

//   var animation = newDataItem.animate({
//     key: "locationX",
//     to: 0.5,
//     from: -0.5,
//     duration: 600
//   });
//   if (animation) {
//     var tooltip = xAxis.get("tooltip");
//     if (tooltip && !tooltip.isHidden()) {
//       animation.events.on("stopped", function () {
//         xAxis.updateTooltip();
//       })
//     }
//   }
}


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);




