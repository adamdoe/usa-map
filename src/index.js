import * as d3 from 'd3';
import './main.scss';
import json from './us-states.json';
import * as topojson from "topojson-client";

function drawMap(e, checkbox) {

  // 1) This is mock data returned from your API
  let data = [
    {name: 'Nevada', data: '6'},
    {name: 'Wisconsin', data: '2'},
    {name: 'Minnesota', data: '3'},
    {name: 'Florida', data: 9 }
  ]
  
  // Setup Constants for your chart
  const width = 960
  const height = 500
  
  // Setup colors as needed you can then use D3's color function if needed.
  // Not used in this example.
  // const purples = ['#612cde', '#906be8', '#c0abf2', 'gray', 'lightgray']
  // const greens = ['#22756b', '#3fc5b5', '#91ded5', 'gray', 'lightray']
  // const yellows = ['#eeb040', '#f5d65f', '#f9e7a3']
  // const colorMap = [purples, greens, yellows]

  // Set map projection
  var projection = d3.geoAlbersUsa()

  // Path function
  var path = d3.geoPath()
    .projection(projection);

  const svg = d3.select("#example").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")

    const unitedStates = topojson.feature(json, json.objects.states).features

    const getColor = (d) => {

      // no data return default color
      if (!d.properties.data) return '#c6c6c6';

      console.log('d', d.properties.data)
      const data = d.properties.data
      if (data < 10) return 'orange'
    }

    // Loop through data and add data values to geoJSON
    for (var i = 0; i < data.length; i++) {
    
      // Grab State Name
      var dataState = data[i].name;
    
      // Grab data value 
      var dataValue = data[i].data;
    
      // Find the corresponding state inside the GeoJSON
      for (var j = 0; j < unitedStates.length; j++) {
        var jsonState = unitedStates[j].properties.name;
        if (dataState == jsonState) {
          unitedStates[j].properties.data = dataValue;
          break;
        }
      }
    
    }

    svg.selectAll("path")
      .data(unitedStates)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .attr("data-fill", d => getColor(d))
      .attr("fill", (d) => getColor(d))
 };


drawMap();
