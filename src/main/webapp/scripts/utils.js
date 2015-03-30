// Takes as input an array (of strings) for headings 
// (to go into th elements) and an array-of-arrays 
// (of strings) for rows (to go into td elements).
// Builds an xhtml table from the data.

function getTable(headings, rows) {
  var table = "<table border='1' class='ajaxTable'>\n" +
              getTableHeadings(headings) +
              getTableBody(rows) +
              "</table>";
  return(table);
}

function getTableHeadings(headings) {
  var firstRow = "  <tr>";
  for(var i=0; i<headings.length; i++) {
    firstRow += "<th>" + headings[i] + "</th>";
  }
  firstRow += "</tr>\n";
  return(firstRow);
}

function getTableBody(rows) {
  var body = "";
  for(var i=0; i<rows.length; i++) {
    body += "  <tr>";
    var row = rows[i];
    for(var j=0; j<row.length; j++) {
      body += "<td>" + row[j] + "</td>";
    }
    body += "</tr>\n";
  }
  return(body);
}

// Takes an array of strings and produces a <ul>
// list with the strings inside the <li> elements.

function getBulletedList(listItems) {
  var list = "<ul>\n";
  for(var i=0; i<listItems.length; i++) {
    list = list + "  <li>" + listItems[i] + "</li>\n";
  }
  list = list + "</ul>"
  return(list);
}

function groepeerPerXKarakters(tekst, karakters) {
	var html = "";
	var totIndex;
	for(var i = 0; i < tekst.length; i += karakters) {
		totIndex = i + karakters > tekst.length ? tekst.length : i + karakters;
		html += tekst.substring(i, totIndex) + "<br />";
	}
	return html;
}

// The JSON.stringify method comes from json2.js (from json.org).
// It builds a JSON-inside-a-String version of a JavaScript object.
// This method just calls escape on that result so that it can
// be sent in an HTTP request.

function makeJsonString(object) {
  return(escape(JSON.stringify(object)));
}