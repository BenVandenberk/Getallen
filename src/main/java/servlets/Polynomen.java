package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import service.GetallenUtils;
import bean.Polynoom;

@WebServlet("/polynomen")
public class Polynomen extends HttpServlet {

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");

		int graad = Integer.parseInt(request.getParameter("graad"));
		double precizie = Double.parseDouble(request.getParameter("precizie"));
		double pixelWidth = Double.parseDouble(request.getParameter("pixelwidth"));
		double[] coef = new double[graad + 1];
		for (int i = 0; i <= graad; i++) {
			try {
				coef[i] = Double.parseDouble(request.getParameter(Integer.toString(i)));
			} catch (NumberFormatException nEx) {
				coef[i] = 0D;
			}
		}

		Polynoom p = new Polynoom(graad);
		p.setCoefficienten(coef);

		JSONObject resultJSON = new JSONObject();
		JSONArray puntenJSON = new JSONArray(GetallenUtils.getPunten(p, precizie, pixelWidth / 2));
		resultJSON.put("puntenJSON", puntenJSON);
		resultJSON.put("vergelijking", p.toStringHTML());

		response.setContentType("text/javascript");
		PrintWriter out = response.getWriter();
		out.println(resultJSON);
		out.close();
	}
}
