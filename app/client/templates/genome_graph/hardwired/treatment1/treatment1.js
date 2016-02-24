Template.Treatment1.helpers({
    treatment1Chart: function () {

        Meteor.defer(function() {
            // Create standard Highcharts chart with options:
            Highcharts.chart('treatment1', {
                series: [
                    {
                        type: 'area',
                        name: 'ITERES',
                        data: [0,24,45,79,112,130,158,191,224,256,292,323,351,388,408,436,476,514,537,584,615,656,693,725,758,790,836,878,909,950,974,1005,1032,1062,1097,1141,1177,1229,1262,1305,1342,1381,1423,1468,1502,1541,1577,1614,1659,1701,1730,1774,1816,1844,1891,1931,1968,2024,2064,2105,2158,2214,2261,2306,2334,2380,2428,2466,2510,2549,2584,2620,2683,2727,2767,2827,2874,2936,2984,3032,3087,3133,3190,3248,3306,3361,3415,3464,3533,3603,3665,3716,3772,3837,3883,3932,3980,4041,4087,4150,4200,4252,4314,4363,4422,4481,4543,4597,4646,4702,4757,4837,4906,4967,5031,5106,5190,5260,5330,5405,5464,5541,5601,5674,5738,5811,5858,5921,5973,6029,6089,6146,6212,6284,6353,6423,6491,6543,6609,6674,6749,6827,6898,6989,7057,7143,7205,7280,7354,7419,7495,7542,7592,7632,7676,7732,7792,7836,7878,7934,7969,8024,8071,8121,8167,8224,8264,8328,8391,8417,8470,8538,8592,8657,8696,8757,8794,8839,8903,8974,9044,9111,9172,9225,9307,9350,9405,9444,9506,9583,9629,9677,9741,9799,9886,9958,10019,10097,10168,10241,10317,10390,10458,10535,10602,10675,10733,10787,10875,10938,10999,11043,11110,11184,11267,11325,11404,11496,11552,11631,11685,11764,11808,11865,11938,11995,12052,12127,12195,12245,12302,12374,12447,12506,12572,12635,12704,12791,12849,12895,12967,13067,13128,13179,13271,13376,13452,13521,13608,13678,13766,13848,13923,13994,14075,14138,14225,14289,14351,14435,14507,14530,14582,14660,14735,14785,14833,14919,14971,15028,15103,15149,15228,15280,15335,15395,15459,15525,15581,15632,15707,15788,15862,15898,15954,16009,16044,16112,16168,16237,16278,16303,16343,16353,16387,16400,16437,16455,16480,16506,16534,16561,16606,16633,16660,16689,16699,16726,16735,16751,16773,16784,16832,16841,16849,16856,16867,16850,16852,16875,16881,16845,16843,16851,16873,16867,16875,16888,16876,16860,16847,16850,16849,16851,16830,16831,16830,16843,16849,16823,16818,16812,16793,16778,16749,16716,16702,16660,16626,16607,16601,16557,16530,16506,16467,16425,16424,16384,16329,16293,16268,16243,16190,16141,16085,16052,15985,15925,15908,15859,15850,15810,15763,15734,15675,15617,15581,15503,15450,15403,15354,15291,15226,15173,15109,15056,14958,14871,14814,14769,14705,14610,14548,14478,14384,14295,14232,14160,14091,14009,13945,13858,13760,13699,13614,13560,13467,13408,13349,13261,13193,13135,13060,12963,12867,12786,12723,12610,12527,12435,12335,12250,12156,12077,11995,11908,11845,11725,11668,11620,11526,11448,11350,11269,11184,11099,11024,10939,10853,10752,10665,10595,10511,10443,10377,10310,10250,10199,10131,10053,9953,9877,9737,9652,9573,9489,9420,9348,9291,9220,9149,9084,8993,8922,8864,8788,8724,8634,8560,8430,8295,8252,8185,8118,8059,7990,7933,7869,7820,7750,7691,7618,7567,7510,7446,7374,7307,7231,7160,7101,7048,6983,6927,6875,6802,6736,6673,6638,6577,6516,6439,6390,6327,6271,6164,6104,6026,5956,5895,5806,5657,5598,5542,5495,5438,5359,5323,5282,5226,5184,5135,5010,4975,4921,4890,4856,4817,4762,4739,4715,4680,4653,4612,4579,4544,4512,4465,4442,4393,4355,4307,4274,4233,4204,4178,4128,3909,3695,3590,3549,3500,3466,3431,3385,3349,3304,3268,3230,3206,3172,3133,3108,3079,3052,3027,3005,2958,2930,2906,2882,2856,2832,2802,2770,2737,2709,2656,2636,2603,2557,2536,2492,2478,2465,2439,2406,2387,2360,2335,2315,2297,2272,2257,2228,2202,2155,1980,1950,1933,1913,1894,1884,1867,1853,1834,1820,1798,1772,1747,1728,1718,1699,1679,1666,1643,1639,1623,1607,1590,1580,1570,1546,1526,1503,1483,1461,1423,1398,1379,1355,1333,1319,1212,1110,0]
                    },
                    {
                        type: 'area',
                        name: 'BWA',
                        data: [0,17,31,58,83,92,114,138,160,176,200,223,237,259,269,287,314,339,353,377,398,423,448,469,490,509,539,567,585,615,634,653,669,693,713,746,771,807,829,859,883,910,934,964,988,1011,1035,1064,1099,1128,1148,1180,1208,1225,1257,1284,1309,1344,1367,1388,1422,1459,1492,1525,1544,1573,1608,1634,1665,1686,1710,1735,1781,1809,1841,1882,1915,1952,1986,2010,2040,2068,2098,2133,2164,2197,2227,2253,2296,2333,2379,2410,2442,2477,2504,2528,2550,2587,2607,2647,2672,2704,2742,2768,2793,2827,2864,2886,2916,2944,2980,3030,3080,3119,3159,3209,3269,3319,3369,3415,3458,3509,3538,3580,3616,3660,3687,3733,3767,3791,3825,3851,3886,3929,3970,4005,4042,4072,4108,4148,4188,4238,4292,4343,4387,4434,4473,4521,4573,4615,4664,4695,4734,4762,4783,4829,4861,4894,4917,4963,4983,5021,5062,5102,5141,5182,5211,5260,5313,5346,5382,5426,5462,5504,5530,5579,5595,5622,5661,5699,5738,5779,5814,5841,5901,5929,5965,5979,6019,6062,6084,6114,6154,6194,6245,6308,6347,6383,6433,6484,6531,6584,6630,6683,6729,6769,6796,6831,6893,6937,6982,7008,7037,7064,7113,7151,7188,7234,7255,7307,7341,7383,7402,7439,7483,7514,7548,7600,7642,7676,7715,7761,7809,7850,7896,7942,7987,8046,8087,8126,8160,8227,8264,8305,8379,8444,8494,8527,8584,8618,8682,8731,8777,8827,8888,8926,8980,9036,9072,9123,9162,9176,9187,9232,9276,9308,9331,9367,9375,9412,9451,9477,9528,9553,9582,9624,9670,9706,9733,9785,9831,9884,9935,9964,9997,10044,10075,10123,10172,10221,10255,10272,10283,10295,10312,10331,10362,10372,10380,10386,10395,10406,10424,10426,10454,10463,10472,10483,10487,10495,10512,10516,10544,10553,10553,10565,10579,10567,10567,10579,10583,10567,10574,10581,10591,10586,10605,10623,10622,10628,10625,10637,10647,10648,10635,10633,10632,10659,10677,10670,10674,10673,10669,10665,10656,10629,10625,10613,10583,10568,10566,10530,10511,10489,10468,10453,10467,10443,10408,10391,10369,10364,10341,10324,10297,10273,10246,10225,10229,10198,10191,10169,10137,10121,10080,10051,10037,9990,9956,9930,9897,9857,9823,9785,9744,9707,9633,9578,9532,9503,9470,9405,9364,9317,9243,9198,9166,9127,9088,9043,8994,8942,8884,8844,8795,8763,8710,8668,8633,8586,8548,8517,8491,8434,8373,8321,8283,8227,8191,8140,8084,8038,7985,7950,7914,7856,7808,7723,7699,7670,7620,7589,7530,7481,7434,7382,7332,7280,7223,7156,7100,7064,7019,6983,6949,6903,6862,6829,6792,6764,6708,6667,6571,6520,6461,6421,6379,6330,6300,6256,6212,6173,6116,6062,6026,5969,5913,5845,5790,5690,5586,5553,5499,5454,5425,5378,5340,5296,5263,5206,5165,5114,5084,5055,5010,4964,4925,4871,4819,4778,4748,4701,4665,4630,4581,4538,4496,4472,4435,4399,4349,4320,4281,4256,4176,4132,4081,4037,3998,3939,3831,3794,3761,3737,3696,3657,3638,3611,3577,3555,3530,3457,3441,3408,3392,3370,3344,3308,3290,3279,3260,3243,3215,3201,3187,3174,3152,3146,3123,3103,3077,3066,3049,3041,3031,3002,2840,2656,2584,2564,2537,2518,2495,2467,2441,2418,2396,2373,2365,2348,2327,2309,2293,2277,2266,2252,2227,2210,2196,2181,2163,2144,2129,2108,2089,2076,2040,2029,2007,1973,1959,1923,1916,1907,1888,1864,1850,1830,1812,1799,1790,1768,1758,1735,1717,1678,1529,1515,1505,1489,1473,1465,1456,1449,1437,1427,1410,1396,1378,1364,1358,1344,1331,1323,1302,1301,1293,1284,1272,1267,1264,1247,1234,1220,1205,1188,1154,1133,1119,1101,1087,1075,986,893,0]
                    }
                ],
                chart: {
                    height: 200
                },
                xAxis: {
                     title: {
                         text: 'Consensus Length'
                     }
                },
                yAxis: {
                    title: {
                        text: 'Read Coverage'
                    }
                },
                title: {
                    text: ''
                }
            });
        });
    }
});