package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import util.StringRekenen;
import bean.Polynoom;
import bean.Punt;

public class GetallenUtils {

	public static List<Long> getPriemfactoren(long getal) {
		ArrayList<Long> priemfactoren = new ArrayList<Long>();
		long origineelGetal = getal;
		for (int deler = 2; deler <= Math.sqrt(origineelGetal) && deler <= getal; deler++) {
			while (getal % deler == 0) {
				priemfactoren.add((long) deler);
				getal /= deler;
			}
		}
		if (getal > 1) {
			priemfactoren.add(getal);
		}
		return priemfactoren;
	}

	public static Map<Integer, String> getMachten(long getal, int totMacht) {
		HashMap<Integer, String> machten = new HashMap<Integer, String>();
		String baseGetal = Long.toString(getal);
		String huidigeMacht = baseGetal;
		for (int i = 2; i <= totMacht; i++) {
			huidigeMacht = StringRekenen.vermenigvuldig(baseGetal, huidigeMacht);
			machten.put(i, huidigeMacht);
		}
		return machten;
	}

	public static String getMacht(long base, int macht) {
		String baseGetal = Long.toString(base);
		String huidigeMacht = baseGetal;
		for (int i = 2; i <= macht; i++) {
			huidigeMacht = StringRekenen.vermenigvuldig(baseGetal, huidigeMacht);
		}
		return huidigeMacht;
	}

	public static List<Punt> getPunten(Polynoom polynoom, double precizie, double xMax) {
		List<Punt> punten = new ArrayList<Punt>();
		for (double x = -xMax; x <= xMax; x += precizie) {
			punten.add(new Punt(x, polynoom.getY(x)));
		}
		return punten;
	}
}
