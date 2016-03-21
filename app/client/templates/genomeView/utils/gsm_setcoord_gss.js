gsm_setcoord_gss = function(obj) {
/* arg: ele in bbj.genome.geneset.lst
call after gss option is set, from .a/.b of each item, compute .a1 .b1 (modified start/stop)
*/
var scaffoldLen = {"chr1":249250621,"chr2":243199373,"chr3":198022430,"chr4":191154276,"chr5":180915260,"chr6":171115067,"chr7":159138663,"chrX":155270560,"chr8":146364022,"chr9":141213431,"chr10":135534747,"chr11":135006516,"chr12":133851895,"chr13":115169878,"chr14":107349540,"chr15":102531392,"chr16":90354753,"chr17":81195210,"chr18":78077248,"chr20":63025520,"chrY":59373566,"chr19":59128983,"chr22":51304566,"chr21":48129895,"chr6_ssto_hap7":4928567,"chr6_mcf_hap5":4833398,"chr6_cox_hap2":4795371,"chr6_mann_hap4":4683263,"chr6_apd_hap1":4622290,"chr6_qbl_hap6":4611984,"chr6_dbb_hap3":4610396,"chr17_ctg5_hap1":1680828,"chr4_ctg9_hap1":590426,"chr1_gl000192_random":547496,"chrUn_gl000225":211173,"chr4_gl000194_random":191469,"chr4_gl000193_random":189789,"chr9_gl000200_random":187035,"chrUn_gl000222":186861,"chrUn_gl000212":186858,"chr7_gl000195_random":182896,"chrUn_gl000223":180455,"chrUn_gl000224":179693,"chrUn_gl000219":179198,"chr17_gl000205_random":174588,"chrUn_gl000215":172545,"chrUn_gl000216":172294,"chrUn_gl000217":172149,"chr9_gl000199_random":169874,"chrUn_gl000211":166566,"chrUn_gl000213":164239,"chrUn_gl000220":161802,"chrUn_gl000218":161147,"chr19_gl000209_random":159169,"chrUn_gl000221":155397,"chrUn_gl000214":137718,"chrUn_gl000228":129120,"chrUn_gl000227":128374,"chr1_gl000191_random":106433,"chr19_gl000208_random":92689,"chr9_gl000198_random":90085,"chr17_gl000204_random":81310,"chrUn_gl000233":45941,"chrUn_gl000237":45867,"chrUn_gl000230":43691,"chrUn_gl000242":43523,"chrUn_gl000243":43341,"chrUn_gl000241":42152,"chrUn_gl000236":41934,"chrUn_gl000240":41933,"chr17_gl000206_random":41001,"chrUn_gl000232":40652,"chrUn_gl000234":40531,"chr11_gl000202_random":40103,"chrUn_gl000238":39939,"chrUn_gl000244":39929,"chrUn_gl000248":39786,"chr8_gl000196_random":38914,"chrUn_gl000249":38502,"chrUn_gl000246":38154,"chr17_gl000203_random":37498,"chr8_gl000197_random":37175,"chrUn_gl000245":36651,"chrUn_gl000247":36422,"chr9_gl000201_random":36148,"chrUn_gl000235":34474,"chrUn_gl000239":33824,"chr21_gl000210_random":27682,"chrUn_gl000231":27386,"chrUn_gl000229":19913,"chrM":16571,"chrUn_gl000226":15008,"chr18_gl000207_random":4262};
// error check
if(obj.gss_opt=='custom') {
	if(obj.gss_up+obj.gss_down<=0) {
		print2console('Flanking region must not be 0 length',2);
		// refuse to update according to gss
		for(var i=0; i<obj.lst.length; i++) {
			var e=obj.lst[i];
			e.a1=e.a;
			e.b1=e.b;
			e.f5a=e.f5b=e.f3a=e.f3b=-1;
		}
		return;
	}
}
for(var i=0; i<obj.lst.length; i++) {
	var e=obj.lst[i];
	// preset: genebody or entire region, no flanking
	e.a1=e.a;
	e.b1=e.b;
	e.f5a=e.f5b=e.f3a=e.f3b=-1;
	var forward=e.strand=='+'||e.strand=='>';
	if(e.isgene) {
		if(obj.gss_opt=='genebody') {
			continue;
		}
		if(obj.gss_opt=='genebodypromoter') {
			if(forward) {
				e.a1=Math.max(0,e.a-3000);
				e.b1=e.b;
				e.f5a=e.a1;
				e.f5b=e.a;
			} else {
				e.a1=e.a;
				e.b1=Math.min(scaffoldLen[e.c],e.b+3000);
				e.f5a=e.b;
				e.f5b=e.b1;
			}
		} else if(obj.gss_opt=='promoter') {
			if(forward) {
				e.a1=Math.max(0,e.a-3000);
				e.b1=e.a;
			} else {
				e.a1=e.b;
				e.b1=Math.min(scaffoldLen[e.c],e.b+3000);
			}
		} else if(obj.gss_opt=='custom') {
			if(obj.gss_origin=='txstart') {
				if(forward) {
					e.a1=Math.max(0,e.a-obj.gss_up);
					e.b1=Math.min(scaffoldLen[e.c],e.a+obj.gss_down);
					e.f5a=e.a1;
					e.f5b=e.f3a=e.a;
					e.f3b=e.b1;
				} else {
					e.a1=Math.max(0,e.b-obj.gss_down);
					e.b1=Math.min(scaffoldLen[e.c],e.b+obj.gss_up);
					e.f5a=e.f3b=e.b;
					e.f3a=e.a1;
					e.f5b=e.b1;
				}
			} else if(obj.gss_origin=='txstop') {
				if(forward) {
					e.a1=Math.max(0,e.b-obj.gss_up);
					e.b1=Math.min(scaffoldLen[e.c],e.b+obj.gss_down);
					e.f5a=e.a1;
					e.f5b=e.f3a=e.b;
					e.f3b=e.b1;
				} else {
					e.a1=Math.max(0,e.a-obj.gss_down);
					e.b1=Math.min(scaffoldLen[e.c],e.a+obj.gss_up);
					e.f5a=e.f3b=e.a;
					e.f3a=e.a1;
					e.f5b=e.b1;
				}
			} else if(obj.gss_origin=='genebody') {
				if(forward) {
					e.a1=Math.max(0,e.a-obj.gss_up);
					e.b1=Math.min(scaffoldLen[e.c],e.b+obj.gss_down);
					e.f5a=e.a1;
					e.f5b=e.a;
					e.f3a=e.b;
					e.f3b=e.b1;
				} else {
					e.a1=Math.max(0,e.a-obj.gss_down);
					e.b1=Math.min(scaffoldLen[e.c],e.b+obj.gss_up);
					e.f5a=e.b;
					e.f5b=e.b1;
					e.f3a=e.a1;
					e.f3b=e.a;
				}
			} else {
				fatalError('unknown gss_origin: '+obj.gss_origin);
			}
		} else {
			fatalError('unknown gss_opt: '+obj.gss_opt);
		}
	} else {
		// coord
		if(obj.gss_opt=='custom') {
			// gss_origin is not relevant
			if(forward) {
				e.a1=Math.max(0,e.a-obj.gss_up);
				e.b1=Math.min(scaffoldLen[e.c],e.b+obj.gss_down);
				e.f5a=e.a1;
				e.f5b=e.a;
				e.f3a=e.b;
				e.f3b=e.b1;
			} else {
				e.a1=Math.max(0,e.a-obj.gss_down);
				e.b1=Math.min(scaffoldLen[e.c],e.b+obj.gss_up);
				e.f5a=e.b;
				e.f5b=e.b1;
				e.f3a=e.a1;
				e.f3b=e.a;
			}
		}
	}
}
}