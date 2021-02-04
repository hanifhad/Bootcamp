/* Step 1: Chart Configuration

// Establish the scale of the graph that is to be used,
it should be noted that the scale of the graphs has two factors:
1. Height
2. Width
 */

// Setup width of the graph
var width = 1000

// The height will be dependent on the width of the graph
var height = width - width / 10;

/* Apply spacing to graph, 
NOTE: The higher the margin, the smaller the graph will become 
*/ 
var margin = 200;

// Apply space for placing words
var spacingarea = 150;

// Apply padding for the words along the vertical and horizontal 
var HorizontalPadding = 20;
var VerticalPadding = 20;

//  Append an SVG group that will hold our chart,
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  // Removed attribute as it is unnecessary .attr("class", "chart");

// Set the radius for each dot that will appear in the graph.
// Note: Making this a function allows us to easily call
// it in the mobility section of our code.
var RadiusCalculation;
function crGet() {
      RadiusCalculation = 8;}
crGet();

// The Labels for our Axes

// A) Horizontal
// ==============

// Nest the bottom labels.
svg.append("g")
  .attr("class", "xText");
// NOTE: xText allows a selection without additional code.
var xText = d3.select(".xText");

// We give xText a transform property that places it at the bottom of the chart.
function xTextRefresh() {
  xText.attr(
    "transform",
    "translate(" +
      ((width - 400) ) +
      ", " +
      (height - 200) +
      ")"
  );
}
xTextRefresh();

/* Use xText to append three text SVG files, to space out the labels.
NOTE: This has to be done three times for each label. */
xText
  .append("text")
  .attr("y", -30)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");
xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age");
// 3. Income
xText
  .append("text")
  .attr("y", 30)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Household Income");

// B) Left Axis
// ============

// Specifying the variables like this allows us to make our transform attributes more readable.
var leftTextX = margin + VerticalPadding;
var leftTextY = (height + spacingarea) / 2 - spacingarea;

// We add a second label group, this time for the axis left of the chart.
svg.append("g").attr("class", "yText");

// yText will allows us to select the group without excess code.
var yText = d3.select(".yText");

function yTextRefresh() {
  yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
}
yTextRefresh();

// To append Obesity
yText
  .append("text")
  .attr("y", -30)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Obeseity (%)");

// To append Smokes
yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Smoking (%)");

// To append Healthcare
yText
  .append("text")
  .attr("y", 20)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Healthcare (%)");

// 2. Import our .csv file.

// Import  CSV data.
d3.csv("assets/data/data.csv").then(function(data) {
  // Visualize the data
  visualize(data);
});

// Visualizing
// ====================================
// Designate a visualization function on the data via .csv.
// NOTE: This function handles the visual manipulation of all elements. If this visualization fails then the code is useless.
function visualize(Datasets) {
  var labelhorizontal = "poverty";
  var labelvertical = "obesity";

  // Assign empty variables to min/max, this in turn will reduce ecess code.  
  var xMin;
  var xMax;
  var yMin;
  var yMax;

  var ToolTipsForGraph = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
      console.log(d)
      var XCode;
      var theState = "<div>" + d.state + "</div>";
      var YCode = "<div>" + labelvertical + ": " + d[labelvertical] + "%</div>";
      if (labelhorizontal === "poverty") {
        XCode = "<div>" + labelhorizontal + ": " + d[labelhorizontal] + "%</div>";
      }
      else {
        XCode = "<div>" +
          labelhorizontal +
          ": " +
          parseFloat(d[labelhorizontal]).toLocaleString("en") +
          "</div>";
      }
      return theState + XCode + YCode;
    });
  svg.call(ToolTipsForGraph);  

  // PART 2: Data configuration
  // ==============
  // These functions remove some repitition from later code.
 
  function xMinMax() {
    xMin = d3.min(Datasets, function(d) {
      return parseFloat(d[labelhorizontal]) * 0.90;
    });

    xMax = d3.max(Datasets, function(d) {
      return parseFloat(d[labelhorizontal]) * 1.10;
    });
  }

  function yMinMax() {
    // Scale the graph according to the lowest min value
    yMin = d3.min(Datasets, function(d) {
      return parseFloat(d[labelvertical]) * 0.80;
    });

    // Scale the graph according to the highest ma value
    yMax = d3.max(Datasets, function(d) {
      return parseFloat(d[labelvertical]) * 1.5;
    });
  }

  
  function labelChange(axis, clickedText) {
    d3
      .selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);

    
    clickedText.classed("inactive", false).classed("active", true);
  }

  // Deploying the Data
  // ====================================
  // Now that we have established the graph, and made it interactable we must deploy the data itself.

  // This puts all the data onto the graphs.
  xMinMax();
  yMinMax();

  /* With the min and max values now defined, we can create our scales.
   NOTE: The range element here is important because without it the graphs all shift to the left, meaning that the data is unreadable. */
    var horizontalscale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + spacingarea, width - margin]);
  var verticalscale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - spacingarea, margin]);

  var xAxis = d3.axisBottom(horizontalscale);
  var yAxis = d3.axisLeft(verticalscale);
  
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - spacingarea) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + spacingarea) + ", 0)");

  var circlesize = svg.selectAll("g circlesize").data(Datasets).enter();

  circlesize
    .append("circle")
    .attr("cx", function(d) {
      return horizontalscale(d[labelhorizontal]);
    })
    .attr("cy", function(d) {
      return verticalscale(d[labelvertical]);
    })
    .attr("r", RadiusCalculation)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    })

.on("mouseover", function(d) {
  ToolTipsForGraph.show(d, this);
  // Highlight the state circle's border
  d3.select(this).style("stroke", "green");
})

  circlesize
    .append("text")
    .text(function(d) {
      return d.abbr;})
    .attr("dx", function(d) {
      return horizontalscale(d[labelhorizontal]);
    })
    .attr("dy", function(d) {
      return verticalscale(d[labelvertical]) + RadiusCalculation / 3;
    })
    .attr("font-size", RadiusCalculation)
    .attr("class", "statename")
    .on("mouseout", function(d) {
    });

  // Switching through the datasets
  // ==========================
  // This section will allow the user to click through the information
  
  d3.selectAll(".aText").on("click", function() {
    var self = d3.select(this);
    if (self.classed("inactive")) {
      var axis = self.attr("data-axis");
      var name = self.attr("data-name");
      if (axis === "x") {
        labelhorizontal = name;
        xMinMax();
        horizontalscale.domain([xMin, xMax]);
        svg.select(".xAxis").transition().duration(300).call(xAxis);
        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cx", function(d) {
              return horizontalscale(d[labelhorizontal]);
            })
            .duration(300);
        });
        d3.selectAll(".statename").each(function() {
          d3
            .select(this)
            .transition()
            .attr("dx", function(d) {
              return horizontalscale(d[labelhorizontal]);
            })
            .duration(300);
        });
        labelChange(axis, self);
      }
      else {
        labelvertical = name;
        yMinMax();
        verticalscale.domain([yMin, yMax]);
        svg.select(".yAxis").transition().duration(300).call(yAxis);
        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cy", function(d) {
              return verticalscale(d[labelvertical]);
            })
            .duration(300);
        });
        d3.selectAll(".statename").each(function() {
          d3
            .select(this)
            .transition()
            .attr("dy", function(d) {
              return verticalscale(d[labelvertical]) + RadiusCalculation / 4;
            })
            .duration(300);
        });
        labelChange(axis, self);
      }
    }
  });

  // Changing Size
  // =========================
  d3.select(window).on("resize", resize);

  function resize() {
    /* There are three elements to resizing: the width, the height and the leftTextY, all of these are depending on the width of the window */
    width = parseInt(d3.select("#scatter").style("width"));
    height = width - width / 4;
    leftTextY = (height + spacingarea) / 2 - spacingarea;

    // Apply changes to svg.
    svg.attr("width", width).attr("height", height);

    horizontalscale.range([margin + spacingarea, width - margin]);
    verticalscale.range([height - margin - spacingarea, margin]);

    svg
      .select(".xAxis")
      .call(xAxis)
      .attr("transform", "translate(0," + (height - margin - spacingarea) + ")");

    svg.select(".yAxis").call(yAxis);

    tickCount();

    xTextRefresh();
    yTextRefresh();

    crGet();

    d3
      .selectAll("circle")
      .attr("cy", function(d) {
        return verticalscale(d[labelvertical]);
      })
      .attr("cx", function(d) {
        return horizontalscale(d[labelhorizontal]);
      })
      .attr("r", function() {
        return RadiusCalculation;
      });

    d3
      .selectAll(".statename")
      .attr("dy", function(d) {
        return verticalscale(d[labelvertical]) + RadiusCalculation / 3;
      })
      .attr("dx", function(d) {
        return horizontalscale(d[labelhorizontal]);
      })
      .attr("r", RadiusCalculation / 3);
  }
}

