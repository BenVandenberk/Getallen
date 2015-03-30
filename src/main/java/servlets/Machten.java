package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import service.GetallenUtils;

@WebServlet("/machten")
public class Machten extends HttpServlet {

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");

		long getal = Long.parseLong(request.getParameter("getal"));
		int totMacht = Integer.parseInt(request.getParameter("macht"));
		Map<Integer, String> machten = GetallenUtils.getMachten(getal, totMacht);
		JSONObject machtenJSON = new JSONObject(machten);

		response.setContentType("text/javascript");
		PrintWriter out = response.getWriter();
		out.println(machtenJSON);
	}

}
