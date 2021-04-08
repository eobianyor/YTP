// // // // ===================================================================================== // // // // 
// // // //                                 SET DEFAULTS TO BEGIN                                 // // // // 
// // // // ===================================================================================== // // // //
var currentCountry
var currentCategory
var currentMetric
// var currentYear

// // // // ===================================================================================== // // // // 
// // // //              SETUP AN INITIALIZE FUNCTION THAT'LL POPULATE THE DROPDOWNS              // // // // 
// // // // ===================================================================================== // // // //
function initialization() {
  // // // // ======================= COUNTRY DROPDOWN ====================== // // // //
  var selector1 = d3.select("#countrySelection");

  url = "/dropdown1"
  d3.json(url).then(function (response1) {

    var countryList = response1;
    // console.log(countryList)

    countryList.forEach((item) => {
      selector1
        .append("option")
        .text(item)
        .property("value", item);
    });

  });
  // // // // ====================== CATEGORY DROPDOWN ====================== // // // //
  var selector2 = d3.select("#categorySelection");

  url = "/dropdown2"
  d3.json(url).then(function (response2) {

    var categoryList = response2;
    // console.log(categoryList)

    categoryList.forEach((item) => {
      selector2
        .append("option")
        .text(item)
        .property("value", item);
    });

  });
  // // // // ======================= METRICS DROPDOWN ====================== // // // //
  var selector3 = d3.select("#metricSelection");

  url = "/dropdown3"
  d3.json(url).then(function (response3) {

    var metricList = response3;
    // console.log(metricList)

    metricList.forEach((item) => {
      selector3
        .append("option")
        .text(item)
        .property("value", item);
    });

  });
  // // // // ======================== YEAR DROPDOWN ======================== // // // //
  // var selector4 = d3.select("#yearSelection");

  // // url = "/dropdown4"
  // // d3.json(url).then(function (response4) {
  // response4 = [2018, 2019, 2020]
  // var yearList = response4;
  // // console.log(yearList)

  // yearList.forEach((year) => {
  //   selector4
  //     .append("option")
  //     .text(year)
  //     .property("value", year);
  // });

  // // });
}
initialization()
// // // // ======================================== END ======================================== // // // //

// // // // ===================================================================================== // // // // 
// // // //        FUNCTION TO GRAB THE SELECTED VALUES WHEN THE 'FILTER' BUTTON IS PRESSED       // // // // 
// // // // ===================================================================================== // // // //

// Select the button
var button = d3.select("#filter-btn");
// console.log(button);
// addEvent(selectedContsainter, "change", function )
button.on("click", function () {

  // Select the input element and get the raw HTML node
  var inputElement1 = d3.select("#countrySelection");
  var inputElement2 = d3.select("#categorySelection");
  var inputElement3 = d3.select("#metricSelection");
  // var inputElement4 = d3.select("#yearSelection");

  // Get the value property of the input element
  currentCountry = inputElement1.property("value");
  currentCategory = inputElement2.property("value");
  currentMetric = inputElement3.property("value");
  // currentYear = inputElement4.property("value");

  // Put in default values incase user clicks the filter button before making selections
  if (currentCountry == "" & currentCategory == "" & currentMetric == "") {
    currentCountry = "US";
    currentCategory = "Sports";
    currentMetric = "views";
  }
  console.log(currentCountry, currentCategory, currentMetric);
  // console.log(`finished input values`);

  // // // // ========= CALL FUNCTIONS TO BUILD THE PLOTS AND TABLES ======== // // // //
  barPlot(currentCountry, currentMetric);
  barPlot2(currentCountry, currentCategory, currentMetric);
  lineGraph(currentCountry, currentMetric);
  grabTableData(currentCountry, currentCategory, currentMetric);
})
// // // // ======================================== END ======================================== // // // //

// // // // ===================================================================================== // // // // 
// // // //                     FUNCTION FOR BAR GRAPH 1 (CATEGORIES VS LIKES)                    // // // // 
// // // // ===================================================================================== // // // //
function barPlot(inputcountry, inputmetric) {
  // console.log(`started barplot`)
  url = `/dataset1/${inputcountry}/${inputmetric}`
  d3.json(url).then(function (response) {
    // console.log(response)

    //Jinah: building the bar chart using Plotly

    var x_value = Object.keys(response);
    // x_value = x_value.map(function (entry) {
    //   if (entry == 29) {
    //     return "Nonprofits & Activism";
    //   } else {
    //     return entry;
    //   };
    // });
    // console.log(x_value);

    var y_value = Object.values(response);
    // console.log(y_value);

    var trace1 = {
      x: x_value,
      y: y_value,
      type: "bar",
      name: `${inputmetric} for Country: ${inputcountry}`
    }

    var data1 = [trace1];

    var layout1 = {
      title: `Average ${inputmetric} for each category for Country: ${inputcountry}`,
      font: {
        color: '#ffffff'
      },
      plot_bgcolor: "#343238",
      paper_bgcolor: "#343238",
      xaxis: {
        tickangle: 30,
        title: "Category Names"
      },
      yaxis: {
        title: `Average Counts of ${inputmetric} per video`
      }
    };
    var config = { responsive: true }

    Plotly.newPlot("bargraph1", data1, layout1);
  })
  // console.log(`finished barplot`)


};
// // // // ======================================== END ======================================== // // // //

// // // // ===================================================================================== // // // // 
// // // //                 FUNCTION FOR BAR GRAPH 2 (METRIC FOR SELECTED CATEGORY)               // // // // 
// // // // ===================================================================================== // // // //
function barPlot2(inputcountry, inputcategory, inputmetric) {
  // console.log(`started barplot2`)
  url = `/dataset2/${inputcountry}/${inputcategory}/${inputmetric}`
  d3.json(url).then(function (response) {
    console.log(response)
    //Jinah: building the bar chart using Plotly

    var x_value = Object.values(response.Metric_Values);
    // console.log(x_value);

    var y_value = Object.values(response.Max_Value);
    // console.log(y_value);

    var trace2 = {
      x: x_value,
      y: y_value,
      type: "bar",
      name: `Metrics for Category: ${inputcategory}`
    }

    var data2 = [trace2];

    var layout2 = {
      title: `Metrics for Category: ${inputcategory}`,
      font: {
        color: '#ffffff'
      },
      plot_bgcolor: "#343238",
      paper_bgcolor: "#343238",
      xaxis: {
        tickangle: 30,
        title: "Metrics"
      },
      yaxis: {
        title: `Maximum Counts for ${inputcategory} Category `
      }
    };
    var config = { responsive: true }

    Plotly.newPlot("bargraph2", data2, layout2);
  })
  // console.log(`finished barplot2`)
};
// // // // ======================================== END ======================================== // // // //

// // // // ===================================================================================== // // // // 
// // // //                    FUNCTION FOR LINE GRAPH (TOP CATEGORY OVER TIME)                   // // // // 
// // // // ===================================================================================== // // // //

function lineGraph(inputcountry, inputmetric) {
  url = `/dataset3/${inputcountry}/${inputmetric}`
  data = d3.json(url).then(function (response) {
    // console.log(response);
    dates = Object.keys(response).map(function (entry) {
      return new Date(entry * 1000);
    });

    var x_value = dates;
    //console.log(x_value);

    var y_value = Object.values(response);
    //console.log(y_value);

    var trace3 = {
      x: x_value,
      y: y_value,
      type: "line",
      name: `${inputmetric} for Country: ${inputcountry}`
    }
    var data3 = [trace3];

    var layout3 = {
      title: "Top Category Over Time",
      yaxis: {
        type: 'log',
        autorange: true,
        title: `Total Views of ${inputmetric}`
      },
      xaxis: {
        title: "Dates: Aug 2020 to Dec 2020"
      },
      font: {
        color: '#ffffff'
      },
      plot_bgcolor: "#343238",
      paper_bgcolor: "#343238"
    };
    Plotly.newPlot("linechart1", data3, layout3);
  })
}
// // // // ======================================== END ======================================== // // // //

// // // // ===================================================================================== // // // // 
// // // //                    FUNCTION TO GET DATA FOR A TABLE AND BUILD TABLE                   // // // // 
// // // // ===================================================================================== // // // //
function grabTableData(inputcountry, inputcategory, inputmetric) {
  // console.log(`started grabTableData`)
  url = `/dataset4/${inputcountry}/${inputcategory}/${inputmetric}`
  d3.json(url).then(function (response) {

    var top10TableData = response
    // console.log(top10TableData)
    buildTable(top10TableData, inputcountry, inputcategory, inputmetric)
  })
  // console.log(`finished grabTableData`)
}
// // // // ==================== FUNCTION TO BUILD TABLE ==================== // // // //
function buildTable(data, currentCountry, currentCategory, currentMetric) {
  // console.log(`started buildTable`)

  // To CAPITALIZE and get correct tense for current metric in the table header statement
  if (currentMetric == "views") { tableTitleMetric = "MOST VIEWED" }
  else if (currentMetric == "likes") { tableTitleMetric = "MOST LIKED" }
  else if (currentMetric == "dislikes") { tableTitleMetric = "MOST DISLIKED" }
  else if (currentMetric == "comments") { tableTitleMetric = "MOST COMMENTED ON" }

  tableTitleCategory = currentCategory.toUpperCase();

  // Table head
  var tableTitle = `TOP 10 ${tableTitleMetric} VIDEOS IN ${tableTitleCategory} CATERGORY FOR ${currentCountry}`
  teehead = d3.select("thead");
  teehead.html("");
  // // Append the 1st row of the header (Table title)
  var thRow = teehead.append("tr");
  thRow.append("th").text(tableTitle).attr('colspan', 10);
  // Append the 2nd row of the header (Table title)
  var thRow = teehead.append("tr");
  thRow.append("th").text("Country")
  thRow.append("th").text("CategoryId")
  thRow.append("th").text("Title")
  thRow.append("th").text("Channel")
  thRow.append("th").text("Views")
  thRow.append("th").text("Comments")
  thRow.append("th").text("Trending Date")
  thRow.append("th").text("Likes")
  thRow.append("th").text("Dislikes")
  thRow.append("th").text("Video Link")

  // Table body
  teebody = d3.select("tbody");
  teebody.html("");
  var table = d3.select("#summary-table");
  var tbody = table.select("tbody");
  var trow;

  for (var i = 0; i < data.length; i++) {
    // console.log(data[i].video_id)
    trow = teebody.append("tr");
    trow.append("td").text(data[i].country);
    trow.append("td").text(data[i].categoryId);
    trow.append("td").text(data[i].title);
    trow.append("td").text(data[i].channelTitle);
    trow.append("td").text(data[i].views);
    trow.append("td").text(data[i].comments);
    trow.append("td").text(data[i].trending_date);
    trow.append("td").text(data[i].likes);
    trow.append("td").text(data[i].dislikes);
    trow.append("td").append("a")
      .attr("href", `https://www.youtube.com/watch?v=${data[i].video_id}`)
      .attr("target", "_blank")
      .append("img")
      .attr("src", data[i].thumbnail_link);
  }
  // console.log(`finished buildTable`)
}
// // // // ======================================== END ======================================== // // // //