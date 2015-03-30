package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import service.GetallenUtils;

@WebServlet("/priemfactoren")
public class Priemfactoren extends HttpServlet {

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");

		long getal = 0L;
		String message = "";
		try {
			getal = Long.parseLong(request.getParameter("getal"));
		} catch (NumberFormatException nEx) {
			message += "Fout bij het parsen van " + request.getParameter("getal");
		}
		if (message.equals("")) {
			response.setContentType("text/javascript");
			JSONArray priemfactoren = new JSONArray(GetallenUtils.getPriemfactoren(getal));
			PrintWriter out = response.getWriter();
			out.println(priemfactoren);
			out.close();
		} else {
			response.setContentType("text/plain");
			response.setStatus(521);
			PrintWriter out = response.getWriter();
			out.println(message);
			out.close();
		}

	}

}
