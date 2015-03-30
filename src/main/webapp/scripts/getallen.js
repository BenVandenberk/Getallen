$(function() {
	$("#btn_priemfactoren").click(function(e) {
		if ($("#frm_priemfactoren").valid()) {
			var data = $("#frm_priemfactoren").serialize();
			$.ajax({
				method : "GET",
				url : "priemfactoren",
				dataType : "json",
				data : data,
				success : toonPriemfactoren,
				error: toonError
			});
		}
	});
	
	$("#btn_machten").click(function(e) {
		if ($("#frm_machten").valid()) {
		var data = $("#frm_machten").serialize();
		$.ajax({
			method: "GET",
			data: data,
			url: "machten",
			dataType: "json",
			success: toonMachten
		});
		}
	});
	
	$("#btn_enkeleMacht").click(function(e) {
		if ($("#frm_enkeleMacht").valid()) {
			var data = $("#frm_enkeleMacht").serialize();
			$.ajax({
				method: "GET",
				data: data,
				url: "enkeleMacht",
				dataType: "html",
				success: toonEnkeleMacht
			});
			}
	});
	
	$("#frm_priemfactoren")
			.validate(
					{
						rules : {
							getal : {
								required : true,
								range : [2, 9223372036854775807]
							}
						},
						messages : {
							getal : {
								required : "Geef een getal in",
								range : "Het getal moet een waarde hebben tussen 2 en 9223372036854775807"
							}
						},
						errorElement : 'div',
						errorLabelContainer : '#priem_error'
					});
	
	$("#frm_machten")
	.validate(
			{
				rules : {
					getal : {
						required : true,
						range : [2, 9223372036854775807]
					},
					macht: {
						required: true,
						range : [2, 200]
					}
				},
				messages : {
					getal : {
						required : "Geef een getal in",
						range : "Het getal moet een waarde hebben tussen 2 en 9223372036854775807"
					},
					macht: {
						required : "Geef aan tot welke macht je wilt gaan",
						range : "De macht moet liggen tussen 2 en 200"
					}
				},
				errorElement : 'div',
				errorLabelContainer : '#macht_error'
			});
	
	$("#frm_enkeleMacht")
	.validate(
			{
				rules : {
					getal : {
						required : true,
						range : [2, 9223372036854775807]
					},
					macht: {
						required: true,
						range : [2, 500]
					}
				},
				messages : {
					getal : {
						required : "Geef een waarde voor x in",
						range : "x moet een waarde hebben tussen 2 en 9223372036854775807"
					},
					macht: {
						required : "Geef een waarde voor y in",
						range : "y moet liggen tussen 2 en 500"
					}
				},
				errorElement : 'div',
				errorLabelContainer : '#enkeleMacht_error'
			});
	
});

function toonEnkeleMacht(data, statusText, jqXHR) {
	$("#enkeleMacht").html(groepeerPerXKarakters(jqXHR.responseText, 125));
}

function toonMachten(data, statusText, jqXHR) {
	var headings = ["Macht", "Waarde"];
	var machten = new Array();
	var i = 0;
	for (var macht in data) {
		machten[i] = [macht, data[macht]];
		i++;
	}
	var table = getTable(headings, machten);
	$("#machten").html(table);
}

function toonPriemfactoren(data, statusText, jqXHR) {
	var antwoord = $("#txt_getal").val();
	if (data.length === 1) {
		antwoord += " is een priemgetal";
	} else {
		antwoord += " = ";
		for (var i = 0; i < data.length; i++) {
			if (i === data.length - 1) {
				antwoord += data[i];
			} else {
				antwoord += data[i] + " x ";
			}
		}
	}
	$("#priemfactoren").html(antwoord);
}

function toonError(jqXHR, textStatus, errorThrown) {
	$("#priemfactoren").html(jqXHR.responseText);
}