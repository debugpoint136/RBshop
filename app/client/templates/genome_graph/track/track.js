Template.track.helpers({
    treatmentChart: function (){
        dataReceived = Template.instance().data;
        //console.log(dataReceived);
        displayData = {};

        dataReceived.value.forEach(function(item) {
            var type = Object.keys(item);
            displayData[type] = item[type];
        })


        Meteor.defer(function() {
            // Create standard Highcharts chart with options:
            Highcharts.chart(dataReceived.name, {
                series: [
                    {
                        type: 'area',
                        name: 'BWA',
                        data: displayData.bwa
                    },
                    {
                        type: 'area',
                        name: 'Iteres',
                        data: displayData.iteres
                    }
                ]
            });
        });
    }
});

Template.track.onRendered(function() {
/*    $('#insertchart').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Treatment 1'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        /!*   tooltip: {
         pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
         },*!/
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Iteres',
            /!*data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
             1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
             27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
             26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
             24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
             22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
             10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]*!/

            data: [0.000000,254.000000,584.000000,948.000000,1330.000000,1684.000000,1994.000000,2375.000000,2782.000000,3157.000000,3561.000000,3938.000000,4331.000000,4829.000000,5246.000000,5727.000000,6159.000000,6614.000000,7104.000000,7582.000000,8098.000000,8646.000000,9248.000000,9826.000000,10343.000000,10840.000000,11353.000000,11877.000000,12354.000000,12833.000000,13334.000000,13841.000000,14358.000000,14805.000000,15265.000000,15775.000000,16253.000000,16770.000000,17208.000000,17656.000000,18107.000000,18488.000000,18921.000000,19382.000000,19805.000000,20219.000000,20631.000000,21099.000000,21579.000000,22020.000000,22436.000000,22751.000000,23146.000000,23578.000000,23995.000000,24399.000000,24785.000000,25246.000000,25605.000000,25961.000000,26363.000000,26799.000000,27226.000000,27694.000000,28193.000000,28642.000000,29077.000000,29493.000000,29932.000000,30355.000000,30803.000000,31285.000000,31734.000000,32166.000000,32543.000000,32953.000000,33391.000000,33779.000000,34219.000000,34623.000000,35022.000000,35450.000000,35844.000000,36260.000000,36662.000000,37026.000000,37461.000000,37889.000000,38269.000000,38719.000000,39154.000000,39541.000000,39905.000000,40259.000000,40692.000000,41084.000000,41450.000000,41823.000000,42233.000000,42638.000000,43024.000000,43371.000000,43740.000000,44135.000000,44535.000000,44928.000000,45307.000000,45672.000000,46086.000000,46484.000000,46884.000000,47194.000000,47592.000000,47997.000000,48410.000000,48799.000000,49180.000000,49514.000000,49859.000000,50295.000000,50796.000000,51207.000000,51348.000000,51725.000000,52110.000000,52352.000000,52657.000000,52951.000000,53335.000000,53693.000000,54121.000000,54446.000000,54617.000000,54314.000000,54473.000000,54765.000000,54857.000000,55292.000000,55773.000000,56265.000000,56735.000000,57078.000000,57486.000000,57940.000000,58447.000000,58911.000000,59355.000000,59829.000000,60321.000000,60806.000000,61306.000000,61608.000000,61877.000000,62085.000000,62247.000000,62437.000000,62654.000000,62825.000000,62962.000000,63133.000000,63299.000000,63450.000000,63562.000000,63634.000000,63749.000000,63858.000000,63956.000000,64070.000000,64097.000000,64086.000000,64134.000000,64182.000000,64176.000000,64184.000000,64222.000000,64278.000000,64314.000000,64368.000000,64449.000000,64507.000000,64548.000000,64549.000000,64550.000000,64713.000000,64795.000000,64803.000000,64831.000000,64833.000000,64881.000000,64943.000000,65037.000000,65169.000000,65278.000000,65361.000000,65441.000000,65460.000000,65540.000000,65644.000000,65707.000000,65801.000000,65929.000000,66091.000000,66209.000000,66287.000000,66355.000000,66469.000000,66637.000000,66677.000000,66784.000000,66862.000000,66906.000000,66935.000000,66953.000000,66912.000000,66802.000000,66785.000000,66828.000000,66834.000000,66858.000000,66835.000000,66770.000000,66715.000000,66707.000000,66664.000000,66671.000000,66640.000000,66616.000000,66579.000000,66491.000000,66439.000000,66340.000000,66201.000000,66135.000000,66031.000000,65949.000000,65906.000000,65720.000000,65621.000000,65537.000000,65355.000000,65165.000000,65041.000000,64928.000000,64797.000000,64616.000000,64456.000000,64291.000000,64185.000000,64023.000000,63815.000000,63652.000000,63516.000000,63326.000000,63100.000000,62872.000000,62622.000000,62414.000000,62218.000000,61887.000000,61640.000000,61678.000000,61473.000000,61243.000000,61036.000000,60806.000000,60523.000000,60220.000000,59865.000000,59486.000000,59148.000000,8771.000000,8392.000000,7997.000000,7438.000000,7016.000000,6562.000000,6104.000000,5680.000000,5224.000000,788.000000,180.000000,91.000000,97.000000,10, 5, 0]
        }, {
            name: 'BWA',
            /!* data: [null, null, null, null, null, null, null, null, null, null,
             5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
             4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
             15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
             33952, 45804, 57431, 69197, 55000, 43000, 41000, 39000, 37000,
             35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 12000,
             11000, 3869, 13060, 2605, 2471, 332, 170, 16]*!/

            data: [0.000000,149.000000,345.000000,552.000000,768.000000,1011.000000,1213.000000,1445.000000,1693.000000,1958.000000,2170.000000,2415.000000,2651.000000,2969.000000,3199.000000,3508.000000,3766.000000,4051.000000,4312.000000,4605.000000,4858.000000,5157.000000,5489.000000,5764.000000,6059.000000,6340.000000,6629.000000,6948.000000,7218.000000,7495.000000,7781.000000,8066.000000,8351.000000,8613.000000,8896.000000,9174.000000,9461.000000,9744.000000,9982.000000,10216.000000,10488.000000,10730.000000,10993.000000,11230.000000,11502.000000,11743.000000,11996.000000,12269.000000,12526.000000,12794.000000,13024.000000,13270.000000,13526.000000,13810.000000,14085.000000,14364.000000,14632.000000,14920.000000,15140.000000,15374.000000,15649.000000,15923.000000,16143.000000,16407.000000,16671.000000,16910.000000,17129.000000,17362.000000,17628.000000,17858.000000,18112.000000,18363.000000,18629.000000,18925.000000,19179.000000,19421.000000,19680.000000,19938.000000,20209.000000,20426.000000,20665.000000,20908.000000,21159.000000,21405.000000,21642.000000,21890.000000,22130.000000,22384.000000,22632.000000,22873.000000,23122.000000,23392.000000,23677.000000,23928.000000,24176.000000,24453.000000,24709.000000,24969.000000,25236.000000,25491.000000,25697.000000,25947.000000,26206.000000,26474.000000,26707.000000,26944.000000,27204.000000,27431.000000,27691.000000,27934.000000,28172.000000,28403.000000,28647.000000,28890.000000,29101.000000,29324.000000,29536.000000,29729.000000,29908.000000,30153.000000,30364.000000,30593.000000,30789.000000,30985.000000,31178.000000,31276.000000,31424.000000,31603.000000,31796.000000,31987.000000,32277.000000,32445.000000,32576.000000,32380.000000,32484.000000,32587.000000,32657.000000,32813.000000,33103.000000,33347.000000,33622.000000,33827.000000,34067.000000,34281.000000,34559.000000,34820.000000,35076.000000,35340.000000,35623.000000,35933.000000,36256.000000,36446.000000,36583.000000,36679.000000,36776.000000,36861.000000,36976.000000,37092.000000,37187.000000,37253.000000,37356.000000,37404.000000,37518.000000,37583.000000,37676.000000,37726.000000,37814.000000,37859.000000,37926.000000,37970.000000,38038.000000,38110.000000,38151.000000,38207.000000,38254.000000,38275.000000,38274.000000,38263.000000,38277.000000,38300.000000,38317.000000,38357.000000,38403.000000,38446.000000,38482.000000,38548.000000,38579.000000,38627.000000,38716.000000,38850.000000,38915.000000,39037.000000,39103.000000,39181.000000,39220.000000,39284.000000,39403.000000,39461.000000,39510.000000,39530.000000,39590.000000,39647.000000,39728.000000,39748.000000,39769.000000,39828.000000,39847.000000,39852.000000,39936.000000,39991.000000,39997.000000,40033.000000,40087.000000,40101.000000,40112.000000,40152.000000,40229.000000,40252.000000,40271.000000,40280.000000,40299.000000,40312.000000,40284.000000,40250.000000,40257.000000,40247.000000,40249.000000,40211.000000,40147.000000,40150.000000,40134.000000,40096.000000,40059.000000,40022.000000,39990.000000,39929.000000,39890.000000,39837.000000,39761.000000,39698.000000,39625.000000,39509.000000,39412.000000,39331.000000,39274.000000,39168.000000,39083.000000,39008.000000,38891.000000,38768.000000,38692.000000,38595.000000,38456.000000,38305.000000,38144.000000,38011.000000,37872.000000,37730.000000,37551.000000,37405.000000,37277.000000,37088.000000,36945.000000,36815.000000,36674.000000,36532.000000,36372.000000,36165.000000,35992.000000,35804.000000,35654.000000,5460.000000,5277.000000,5020.000000,4778.000000,4551.000000,4356.000000,4111.000000,896.000000,618.000000,195.000000,55.000000,48.000000,10,5,0]
        }]
    });*/

});