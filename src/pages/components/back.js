var data = [];

var number = [[10, 20, 30], [20], [15]];
var startTime = 0;
var categories = ['categoryA', 'categoryB', 'categoryC'];
var types = ["#7b9ce1", "#bd6d6c", "#75d874", "#e0bc78", "#dc77dc", "#72b362"]
// Generate mock data
categories.forEach(function (category, index) {
  var baseTime = startTime;
  for (var i = 0; i < number[index].length; i++) {
    // var typeItem = types[Math.round(Math.random() * (types.length - 1))];
    // var duration = Math.round(Math.random() * 10000);
    var duration = number[index][i];
    data.push({
      // name: typeItem.name,
      value: [index, baseTime, (baseTime += duration), duration],
      itemStyle: {
        normal: {
          color: types[i]
        }
      }
    });
    console.log(index, baseTime, (baseTime += duration), duration)
  }
});
function renderItem(params, api) {
  console.log('api')
  var categoryIndex = api.value(0);
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);
  var height = api.size([0, 1])[1] * 0.6;
  // console.log(categoryIndex, start, end, height);

  var rectShape = echarts.graphic.clipRectByRect(
    {
      x: start[0],
      y: start[1] - height / 2,
      width: end[0] - start[0],
      height: height
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
    }
  );
  // console.log( {
  //         x: start[0],
  //         y: start[1] - height / 2,
  //         width: end[0] - start[0],
  //         height: height,
  //       },
  //       {
  //         x: params.coordSys.x,
  //         y: params.coordSys.y,
  //         width: params.coordSys.width,
  //         height: params.coordSys.height,
  //       });
  // console.log(
  //       rectShape
  //     );
  //     console.log({
  //         type: "rect",
  //         transition: ["shape"],
  //         shape: rectShape,
  //         style: api.style(),
  //       })
  return (
    rectShape && {
      type: 'rect',
      transition: ['shape'],
      shape: rectShape,
      style: api.style()
    }
  );
}
option = {
  tooltip: {
    formatter: function (params) {
      return params.marker + params.name + ': ' + params.value[3] + ' ms';
    }
  },
  xAxis: {
    min: startTime,
    // scale: true,
    axisLabel: {
      formatter: function (val) {
        return ' ms';
      }
    }
  },
  yAxis: {
    data: categories
  },
  series: [
    {
      type: 'custom',
      renderItem: renderItem,
      encode: {
        x: [1, 2],
        y: 0
      },
      data: data
    }
  ]
};