package junkdrawer;

public class IntDoubleConvertTest {

	public static void main(String[] args) {
        System.out.println("starting loop" );
        double d;
        int j;
        for (int i = -1000000; i < 1000001; i++) {
            d = i;
            j = (int) d;
            if (i != j) {
                System.out.println("did not convert properly, i and j and d: " + (i) + "  " + (j) + "  " + (d)  );
            }
            j = (int) (d + (0.5 * Math.signum(d)));
            if (i != j) {
                System.out.println("did not convert properly with rounding, i and j and d: " + (i) + "  " + (j) + "  " + (d)  );
            }
        }
        System.out.println("ending loop" );
	}
}
