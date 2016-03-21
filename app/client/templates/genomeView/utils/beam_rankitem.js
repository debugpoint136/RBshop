beam_rankitem = function(bevData)
{
    /* called by pressing <span>, executes once for each rank view
     */
    // var butt=event.target;
    // var v=apps.gg.view[butt.key];

    // var n=parseInt(v.colorscale.numAboveThreshold.innerHTML);
    var extent = Session.get('selectedbySlider');
    var n = fetchRepeatsSelection();
    var subfamName = Session.get('coordinate')[1];
    
// console.dir(sortedRepByAssayVal);

//     if(!butt.sukngsv) {
//         // print coord of all items
//         var d=window.open().document;
//         for(var i=0; i<n; i++) {
//             var t = v.rank.rarr[i];
//             var j=v.bev.data[t[0]][t[1]];
//             d.write(t[0]+':'+j[0]+'-'+j[1]+'<br>');
//         }
//         return;
//     }

//     var gi=id2geo[v.geoid];
//     var si=id2subfam[v.subfamid];
//     var subfamfile=si.cls+si.fam+si.name;

        var gi = Session.get('ssnCreateWURBlink');
        var subfamfile = Session.get('subfamfile'); 

//     butt.removeEventListener('click',beam_rankitem,false);
//     butt.className='';
//     butt.innerHTML='processing...';

var url_genomebedgraph = "http://epigenomegateway.wustl.edu/browser/repeat/_d/genome_bedgraph/";
var qtc_treat_u = {"pr":234,"pg":145,"pb":23,"thtype":0,"height":50,"uselog":false};
var qtc_input_u = {"pr":77,"pg":129,"pb":73,"thtype":0,"height":50,"uselog":false};
var url_subfambed = "http://epigenomegateway.wustl.edu/browser/repeat/_d/subfam_bed/";

    var jlst = [];
    var wlst = [];
    for( i = 0; i < gi.treatment.length; i++ ) {
        var fn = gi.treatment[i];
        jlst.push( { type : 'bedgraph',
            name : ( gi.input == null ? 'track ' + ( i+1 ) : 'treatment ' + ( i+1 ) ),
            url : url_genomebedgraph + fn + '.gz',
            qtc : qtc_treat_u,
            mode : 'show'});
    }
    if( gi.input != null ) {
        for( i = 0; i < gi.input.length; i++ ) {
            var fn = gi.input[i];
            jlst.push( { type : 'bedgraph',
                name : 'input ' + ( i+1 ),
                url : url_genomebedgraph + fn + '.gz',
                qtc : qtc_input_u,
                mode : 'show' });
        }
    }

    jlst.push( { type :'bed',
                name : subfamName,
                url : url_subfambed + subfamfile + '.gz',
                mode : 'full'
            });
    jlst.push({ type : 'native_track',
                list : [ { name : 'refGene',
                            mode : 'full'
                         }
                        ]
            });


    var lastTEid=Math.min(299, n-1);
//var flankbp=parseInt(v.rank.flankSelect.options[v.rank.flankSelect.selectedIndex].value);
    var flankbp=5000;
    var itemlst=[];
    for( var i = 0; i <= lastTEid; i++ ) {
        var t = sortedRepByAssayVal[i];
        var j = bevData[t[0]][t[1]];
        itemlst.push({ c : t[0],
                       a : j[0], a1 : j[0],
                       b : j[1], b1 : j[1],
                       isgene : false,
                       name : t[0] + ':' + j[0] + '-' + j[1],
                      strand:j[2],
        });
    }
    var gsobj = { lst : itemlst,
                    gss_down : flankbp,
                    gss_up : flankbp,
                    gss_opt : 'custom',
                    gss_origin : 'genebody'
                };
    console.dir(itemlst);
    console.dir(gsobj);
    gsm_setcoord_gss(gsobj);
    // var _t = itemlst[10];
    var _t = itemlst[n -1];

    jlst.push({ type : 'run_genesetview', 
                list : gsobj.lst,
                viewrange : [itemlst[0].name,
                            itemlst[0].a, 
                            _t.name, 
                            _t.b]
            });
    var url_base = "http://epigenomegateway.wustl.edu/browser/";
    // var browser.genome.name = 'hg19';

    var data2POST = 'json\n'+JSON.stringify(jlst);
    console.log(data2POST);
    ajaxPost('json\n'+JSON.stringify(jlst),function(key){
        var linkDiv = document.getElementById('wurbLaunch');
        linkDiv.innerHTML='<a href='+url_base+'?genome=hg19&datahub_jsonfile='+url_base+'t/'+key+' target=_blank>Click to view ranked list &#8599;</a>';    
    });
}