            var colMetaData = svg.append("g")
                .selectAll(".colMetadatag")
                .data(colLabel)
                .enter()
                .append("rect")
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return hccol.indexOf(i) * cellSize;
                })
                .style("text-anchor", "left")
                .attr("transform", "translate(" + cellSize / 1.25 + ",-80) rotate (-90)")
                .attr("width", cellSize)
                .attr("height", cellSize)
                .style("fill", function (d) {
                    return '#'+Math.floor(Math.random()*16777215).toString(16);
                })
                .on("click", function (d, i) {
                    colSortOrder = !colSortOrder;
                    sortbylabel("c", i, colSortOrder);
                    d3.select("#order").property("selectedIndex", 4).node().focus();
                }) // move this to On click - Subfamily
              ;

            // SUBFAMILY METADATA LABEL 
            var subFamilyMetadataLabel = svg.append("g")
                //.selectAll(".subMetadataLabelg")
                .append("text")
                .text('Subfamily')
                .attr("x", 0)
                .attr("y", 0)
                .style("text-anchor", "end")
                .attr("transform", "translate(-6, -80)")
                .attr("class", "mono")
                .on("click", function (d, i) {
                    rowSortOrder = !rowSortOrder;
                    sortbylabel("r", i, rowSortOrder);
                    d3.select("#order").property("selectedIndex", 3).node().focus();  // this selects the order drop-down to "by contrast name"
                    ;
                })
                ;
