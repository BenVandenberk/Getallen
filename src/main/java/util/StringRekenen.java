package util;

public class StringRekenen {

	/**
	 * Vermenigvuldigt twee getallen met elkaar mbv het 'cijferen-algoritme'
	 *
	 * @param Factor
	 *            1
	 * @param Factor
	 *            2
	 * @return een String met het product
	 */
	public static String vermenigvuldig(String factor1, String factor2) {
		int[] langsteFactor, kortsteFactor, product;
		if (factor1.length() >= factor2.length()) {
			langsteFactor = toArray(factor1);
			kortsteFactor = toArray(factor2);
		} else {
			langsteFactor = toArray(factor2);
			kortsteFactor = toArray(factor1);
		}

		product = new int[langsteFactor.length + kortsteFactor.length];
		int[][] termen = new int[kortsteFactor.length][];

		int termIndex;
		int overloop;
		int temp;

		for (int indexKort = kortsteFactor.length - 1, aantalNullen = 0; indexKort >= 0; indexKort--, aantalNullen++) {
			termen[indexKort] = new int[langsteFactor.length + 1 + aantalNullen];
			termIndex = termen[indexKort].length - 1;

			// nullen toevoegen
			for (int j = aantalNullen; j > 0; j--) {
				termIndex--;
			}

			overloop = 0;
			for (int indexLang = langsteFactor.length - 1; termIndex >= 0; indexLang--, termIndex--) {
				if (indexLang >= 0) {
					temp = langsteFactor[indexLang] * kortsteFactor[indexKort] + overloop;
					termen[indexKort][termIndex] = temp % 10;
					overloop = temp / 10;
				} else {
					termen[indexKort][termIndex] = overloop;
				}
			}
		}

		if (termen.length == 1) {
			return arrayToString(verwijderLeadingZeros(termen[0]));
		} else {
			product = telOp(termen[0], termen[1]);
			for (int i = 2; i < termen.length; i++) {
				product = telOp(product, termen[i]);
			}
			return arrayToString(verwijderLeadingZeros(product));
		}

	}

	/**
	 * Telt twee getallen in String vorm bij elkaar op mbv het 'cijferen-algortime'
	 *
	 * @param Term
	 *            1
	 * @param Term
	 *            2
	 * @return een String met de som
	 */
	public static String telOp(String term1, String term2) {
		int[] result = telOp(toArray(term1), toArray(term2));
		return arrayToString(result);
	}

	/**
	 * Telt twee getallen in int[] vorm bij elkaar op mbv het 'cijferen-algortime'
	 *
	 * @param Term
	 *            1
	 * @param Term
	 *            2
	 * @return een int[] met de som
	 */
	public static int[] telOp(int[] term1, int[] term2) {

		int[] langsteTerm, kortsteTerm, som;
		if (term1.length >= term2.length) {
			langsteTerm = term1;
			kortsteTerm = term2;
		} else {
			langsteTerm = term2;
			kortsteTerm = term1;
		}
		som = new int[langsteTerm.length + 1];

		int indexKort = kortsteTerm.length - 1;
		int indexLang = langsteTerm.length - 1;
		int temp;

		for (int indexSom = som.length - 1, overloop = 0; indexSom >= 0; indexSom--, indexKort--, indexLang--) {
			if (indexKort >= 0) {
				temp = kortsteTerm[indexKort] + langsteTerm[indexLang] + overloop;
				som[indexSom] = temp % 10;
				overloop = temp / 10;
			} else if (indexLang >= 0) {
				temp = langsteTerm[indexLang] + overloop;
				som[indexSom] = temp % 10;
				overloop = temp / 10;
			} else {
				som[indexSom] = overloop;
			}
		}

		return verwijderLeadingZeros(som);
	}

	private static int[] toArray(String getal) {
		int[] getalArray = new int[getal.length()];
		for (int i = 0; i < getal.length(); i++) {
			getalArray[i] = Integer.parseInt(getal.substring(i, i + 1));
		}
		return getalArray;
	}

	private static String arrayToString(int[] input) {
		String result = "";
		for (int i : input) {
			result += i;
		}
		return result;
	}

	private static int[] verwijderLeadingZeros(int[] input) {
		boolean isNul = true;
		int index = 0;
		for (; isNul && index < input.length; index++) {
			isNul = input[index] == 0;
		}
		index--;
		int[] result = new int[input.length - (index)];

		for (int i = 0; index < input.length; index++, i++) {
			result[i] = input[index];
		}
		return result;
	}
}
