package bean;

import java.util.ArrayList;

/**
 * Klasse om een vergelijking van de vorm [ax^i + bx^i-1 + ... + cx + d] voor te stellen
 *
 */
public class Polynoom {
	private double[] coefficienten;
	private int graad;

	public Polynoom(int graad) {
		this.graad = graad;
		coefficienten = new double[graad + 1];
	}

	public void setCoefficienten(double[] coef) {
		if (coef.length != graad + 1) {
			throw new IllegalArgumentException(String.format("Aantal coëfficiënten (%d) niet gelijk aan vereist aantal (%d)",
					coef.length, graad + 1));
		}
		for (int i = 0; i < coef.length; i++) {
			this.coefficienten[i] = coef[i];
		}
	}

	public double[] getCoefficienten() {
		return coefficienten;
	}

	public int getGraad() {
		return graad;
	}

	public double getY(double x) {
		double y = 0D;
		for (int i = 0; i < this.coefficienten.length; i++) {
			y += (this.coefficienten[i] * Math.pow(x, graad - i));
		}
		return y;
	}

	@Override
	public String toString() {
		String polynoom = "";
		for (int i = graad, j = 0; i > 0 && j < this.coefficienten.length; i--, j++) {
			polynoom += this.coefficienten[j] + "x^" + i + " + ";
		}
		polynoom += this.coefficienten[graad] + " = y";
		return polynoom;
	}

	public String toStringHTML() {
		ArrayList<String> stringParts = new ArrayList<String>();
		String polynoom = "";
		for (int i = graad, j = 0; i >= 0 && j < this.coefficienten.length; i--, j++) {
			if (this.coefficienten[j] == 0) {
				continue;
			}

			if (i == 1) {
				stringParts.add(String.format("%sx", formatDouble(this.coefficienten[j])));
			} else if (i == 0) {
				stringParts.add(String.format("%s", formatDouble(this.coefficienten[j])));
			} else {
				stringParts.add(String.format("%sx<sup>%d</sup>", formatDouble(this.coefficienten[j]), i));
			}
		}

		for (int i = 0; i < stringParts.size(); i++) {
			if (i < stringParts.size() - 1) {
				polynoom += stringParts.get(i) + " + ";
			} else {
				polynoom += stringParts.get(i) + " = y";
			}
		}
		return polynoom;
	}

	private String formatDouble(double d) {
		int i = (int) d;
		return i == d ? Integer.toString(i) : String.format("%.2f", d);
	}
}
