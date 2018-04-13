var papersLoaded = false;
var isNotFirst = true;
var paperList;
loadPapers();

function init() {
  if (isNotFirst) {
    if (!papersLoaded) {
      setTimeout(init, 10);
    } else {
      isNotFirst = false;
      initialGen()
    }
  }
}

function initialGen() {
	for (i = 0; i < paperList.length; i++) {
		genPaperEntry(i);
	}
}

function search() {
  var key = document.getElementById("search-input").value;
  var hits = [];
  key=key.toLowerCase().replace(/\s\s+/g," ");
  for (i = 0; i < paperList.length; i++) {
    if (paperList[i].title.toLowerCase().replace(/\s\s+/g," ").indexOf(key) >= 0) {
      hits.push(i);
    } else if (paperList[i].authors.toLowerCase().replace(/\s\s+/g," ").indexOf(key) >= 0) {
      hits.push(i);
    }
  }
  add(hits)
}

function add(hits) {
	var ld = document.getElementById("list-div");
	ld.innerHTML="";
	var test = ld.offsetHeight;
	for (j = 0; j < hits.length; j++) {
		var i = hits[j];
		genPaperEntry(i);
	}
}

function genPaperEntry(i) {
  var p = document.createElement("p");
	p.id = paperList[i].id;
  var url = "https://eprint.iacr.org/" + p.id;
	// Link
	var a = document.createElement("a");
	a.appendChild(document.createTextNode(paperList[i].id));
	a.href = url;
	p.appendChild(a);
  p.appendChild(document.createTextNode("  ("));
  var a2 = document.createElement("a");
	a2.appendChild(document.createTextNode("pdf"));
	a2.href = url + ".pdf";
	p.appendChild(a2);
  p.appendChild(document.createTextNode(", "));
  var a3 = document.createElement("a");
	a3.appendChild(document.createTextNode("bib"));
	a3.href = "https://eprint.iacr.org/eprint-bin/cite.pl?entry=" + paperList[i].id;
	p.appendChild(a3);
  p.appendChild(document.createTextNode(", "));
  var a4 = document.createElement("a");
  a4.appendChild(document.createTextNode("dblp"));
	a4.href = "http://dblp.uni-trier.de/search/publ?q=" + encodeURI(paperList[i].title);
	p.appendChild(a4);
  p.appendChild(document.createTextNode(")"));
	p.appendChild(document.createElement("br"));
	// Title
	var s = document.createElement("strong");
	s.appendChild(document.createTextNode(paperList[i].title));
	p.appendChild(s);
	p.appendChild(document.createElement("br"));
	// Authors       
	var e = document.createElement("em");
	e.appendChild(document.createTextNode(paperList[i].authors));
	p.appendChild(e);
	document.getElementById("list-div").appendChild(p);
}

function loadPapers() {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'scripts/papers.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      paperList = JSON.parse(xobj.responseText);
      papersLoaded = true;
    }
  };
  xobj.send(null);
}
