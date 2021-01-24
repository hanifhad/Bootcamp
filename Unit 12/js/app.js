function getPlots(id) {
    //First read the samples.json file so that the information is loaded into the system. NOTE: The HTML has been altered so that the JSON is interpreted from the same folder.
        d3.json("samples.json").then (samplesfromdataset =>{
            console.log(samplesfromdataset)
            var ids = samplesfromdataset.samples[0].otu_ids;
            console.log(ids)
            var SValues =  samplesfromdataset.samples[0].sample_values.slice(0,10).reverse();
            console.log(SValues)
            var labels =  samplesfromdataset.samples[0].otu_labels.slice(0,10);
            console.log (labels)
    
        // Setup your top 10 OTU: 
            var Tot10OTU = (samplesfromdataset.samples[0].otu_ids.slice(0, 10)).reverse();
    
        // Setup OTU ID:
            var OTU_id = Tot10OTU.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
    
         // Visualize top 10 labels:
            var labels =  samplesfromdataset.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: SValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'black'},
                type:"bar",
                orientation: "h",
            };
    
            // Data Variable:
            var data = [trace];
    
            // Setup variables layout
            var layout = {
                title: "Highest 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    r: 100,
                    l: 200,
                    b: 50,
                    t: 100
                }
            };
    
            // Deploy bar plot
        Plotly.newPlot("bar", data, layout);
    
    
    
            // Design bubble chart
            var trace1 = {
                x: samplesfromdataset.samples[0].otu_ids,
                y: samplesfromdataset.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: samplesfromdataset.samples[0].sample_values,
                    color: samplesfromdataset.samples[0].otu_ids
                },
                text:  samplesfromdataset.samples[0].otu_labels
    
            };
    
            // Design layout for  bubble plot
            var layout_2 = {
                xaxis:{title: "The OTU ID"},
                height: 600,
                width: 1000
            };
    
    
    
    
            //  Do the DV design:
            var data1 = [trace1];
          Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    
    // Setup function for the metadata for the panel
    function getDemoInfo(id) {
    
        d3.json("samples.json").then((data)=> {
    
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // Setup filter:
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // Display demographic panel for the data
           var demographicInfo = d3.select("#sample-metadata");
            
         // Empty the demographic info panel 
           demographicInfo.html("");
        Object.entries(result).forEach((key) => {   
        demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }

    
    // initial function setup for dropdown
    function init() {
    
        var dropdown = d3.select("#selDataset");
    
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data:
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
        // Even function change
        function optionChanged(id) {
            getPlots(id);
            getDemoInfo(id);
        }

    init();