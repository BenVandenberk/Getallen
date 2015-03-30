var puntenSet;
var zoomX = 1, zoomY = 1;
var canvas;
var ctx;
var colors;
var currentColor;

$(function() {
	puntenSet = new Array();
	canvas = $("#canvas").get(0);
	ctx = canvas.getContext("2d");
	colors = ["#0C0C0D", "#F50C0C", "#0C14F5", "#F50CDA", "#0CF1F5", "#9FF527", "#FFF673", "#FFA812", "#A00AF7", "#167502", "#9DC6E3"];
	currentColor = 0;

	tekenAssen();
	updateZoomLabels();
	createInputFields("tr_inputFields", 1);
	$("#hdn_graad").val(1);
	$("#hdn_precizie").val(0.02);
	$("#hdn_pixelwidth").val(canvas.width);

	$("#btn_teken").click(
			function(e) {
				if ($("#frm_polynomen").valid()) {
					var data = $("#frm_polynomen").serialize();
					$.ajax({
						method : "GET",
						data : data,
						dataType : "json",
						url : "polynomen",
						success : function(punten, statusText, jqXHR) {
							puntenSet.push(punten.puntenJSON);
							$("#ul_vergelijkingen").append(
									$(
											"<li style='color:"
													+ colors[currentColor]
													+ "'></li>").html(
											punten.vergelijking));
							currentColor = (currentColor + 1) % colors.length;
							tekenPolynomen();
						}
					});
				}
			});

	$("#btn_wis").click(function(e) {
		puntenSet = new Array();
		currentColor = 0;
		$("#ul_vergelijkingen").empty();
		clear();
		tekenAssen();
	});

	$("#btn_zoomIn").click(function(e) {
		var xy = $("#sel_XY").find(":selected").val();
		zoom(true, xy);
	});

	$("#btn_zoomUit").click(function(e) {
		var xy = $("#sel_XY").find(":selected").val();
		zoom(false, xy);
	});

	$("#sel_graad").change(
			function(e) {
				createInputFields("tr_inputFields", $("#sel_graad").find(
						":selected").val());
				$("#hdn_graad").val($("#sel_graad").find(":selected").val());
			});
});

function tekenAssen() {
	ctx.beginPath();
	ctx.moveTo(0, canvas.height / 2);
	ctx.lineTo(canvas.width, canvas.height / 2);
	ctx.stroke();
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.stroke();
}

function tekenPolynomen() {
	var w = canvas.width;
	var h = canvas.height;
	var xOffset = canvas.width / 2;
	var yOffset = canvas.height / 2;
	var x;
	var y;
	var puntenArray;
	var lijnbezig = false;

	for (var j = 0; j < puntenSet.length; j++) {
		puntenArray = puntenSet[j];
		ctx.beginPath();
		for (var i = 0; i < puntenArray.length; i++) {
			x = puntenArray[i].x * zoomX + xOffset;
			y = yOffset - puntenArray[i].y * zoomY;
			if (x > 0 && x < w && y > 0 && y < h) {
				if (lijnbezig) {
					ctx.lineTo(x, y);
				} else {
					ctx.moveTo(x, y);
				}
				lijnbezig = true;
			} else {
				lijnbezig = false;
			}
		}
		ctx.strokeStyle = colors[j % colors.length];
		ctx.stroke();
	}

	ctx.strokeStyle = colors[0];
}

function zoom(zoomIn, xy) {
	if (zoomIn) {
		zoomX = xy === 'x' ? zoomX * 2 : zoomX;
		zoomY = xy === 'y' ? zoomY * 2 : zoomY;
	} else {
		zoomX = xy === 'x' ? zoomX / 2 : zoomX;
		zoomY = xy === 'y' ? zoomY / 2 : zoomY;
	}
	clear();
	tekenAssen();
	tekenPolynomen();
	updateZoomLabels();
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateZoomLabels() {
	$("#lbl_xZoom").html("x" + zoomX);
	$("#lbl_yZoom").html("x" + zoomY);
}

function createInputFields(parentId, graad) {
	$("#" + parentId).empty();

	for (var i = 0; i <= graad; i++) {
		var td = $("<td></td>").append(
				$("<input type='text' name=" + i
						+ " size='1' class='polyInput'></input>"));
		$("#" + parentId).append(td);

		var text;
		if (i == graad) {
			text = "";
		} else if (i == graad - 1) {
			text = "x + ";
		} else {
			text = "x\<sup>" + (graad - i) + "\</sup> + ";
		}
		var tdLabel = $("<td></td>").append($("<label></label>").html(text));
		$("#" + parentId).append(tdLabel);
	}

	$(".polyInput").each(function() {
		$(this).prop('defaultValue', '0');
	});

	$("#" + parentId).append(
			$("<td></td>").append($("<label></label>").append(" = y")));

	addValidation();
}

function addValidation() {
	$("#frm_polynomen")
			.validate(
					{
						showErrors : function(errorMap, errorList) {
							if (this.numberOfInvalids() > 0) {
								$("#poly_errors")
										.html("Ongeldig (" + this.numberOfInvalids() +
														") - Elke coëfficiënt moet een waarde hebben tussen -1000 en 1000");
							} else {
								$("#poly_errors").html("");
							}
						}
					});

	$(".polyInput").each(function() {
		$(this).rules("add", {
			range : [-1000, 1000]
		});
	});

}