package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.GetallenUtils;

@WebServlet("/enkeleMacht")
public class EnkeleMacht extends HttpServlet {

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");

		long getal = Long.parseLong(request.getParameter("getal"));
		int macht = Integer.parseInt(request.getParameter("macht"));

		String result = GetallenUtils.getMacht(getal, macht);
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.println(result);
		out.close();
	}

}
