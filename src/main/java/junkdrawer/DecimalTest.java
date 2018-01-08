package junkdrawer;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.concurrent.TimeUnit;

public class DecimalTest {

    private static final long ITERS = 1_000_000_000l;
    // money, expressed in pennies
    private static final long[] LONG_ARRAY = {
            49020l,
            15001l,
            34522l,
            5640l,
            10000l,
            4523l,
            4534217l
            };
    
    private static final BigDecimal[] BIG_D_ARRAY = new BigDecimal[7];
    // money, expressed in dollars including decimal
    static {
        BIG_D_ARRAY[0] = new BigDecimal( "490.2" );
        BIG_D_ARRAY[1] = new BigDecimal( "150.01" );
        BIG_D_ARRAY[2] = new BigDecimal( "345.22" );
        BIG_D_ARRAY[3] = new BigDecimal( "56.4" );
        BIG_D_ARRAY[4] = new BigDecimal( "100" );
        BIG_D_ARRAY[5] = new BigDecimal( "45.23" );
        BIG_D_ARRAY[6] = new BigDecimal( "45342.17" );
    }
    private static final BigDecimal BIG_D_MULT = new BigDecimal( "0.015" ); //1.5%
    private static final long LONG_MULT = 15l; // 1.5% expressed as a whole number which must be scaled by 1000
    private static final long LONG_DIVISOR = 1000l; // the divisor to scale the 1.5%
    private static final double DOUBLE_DIVISOR = LONG_DIVISOR;
    
    public static void main(String[] args) {
        System.out.println("Warming up...");
        testBigD(BIG_D_ARRAY.length);
        testLong(LONG_ARRAY.length);
        testDoubleout(LONG_ARRAY.length);
        System.out.println("Starting tests...");
        long nano1 = java.lang.System.nanoTime();
        testBigD(ITERS);
        long nano2 = java.lang.System.nanoTime();
        testLong(ITERS);
        long nano3 = java.lang.System.nanoTime();
        long testBigNano = (nano2-nano1);
        long testLongNano =  (nano3-nano2);
        System.out.println("results for iterations " + ITERS);
        System.out.println("testBigNanos=" + testBigNano + ", testLongNanos=" + testLongNano);
        System.out.println("testBigMillis=" + TimeUnit.MILLISECONDS.convert(testBigNano, TimeUnit.NANOSECONDS) 
            + ", testLongMillis=" + TimeUnit.MILLISECONDS.convert(testLongNano, TimeUnit.NANOSECONDS) );
        /* System.out.println("testBigSeconds=" + TimeUnit.SECONDS.convert(testBigNano, TimeUnit.NANOSECONDS) 
            + ", testLongSeconds=" + TimeUnit.SECONDS.convert(testLongNano, TimeUnit.NANOSECONDS) ); */
        long savings = testBigNano - testLongNano;
        BigDecimal savingsDecimal = new BigDecimal(savings);
        BigDecimal itersDecimal = new BigDecimal(ITERS);
        BigDecimal savingsPerDecimal = savingsDecimal.divide(itersDecimal, MathContext.DECIMAL128);
        System.out.println("Savings, millis= " + TimeUnit.MILLISECONDS.convert(savings, TimeUnit.NANOSECONDS) 
            + ", nanos=" + savings + ", savingsNanosPerCalcDecimal=" + savingsPerDecimal);
    }
    
    
    private static void testLong(long iters) {
        boolean printout = iters == LONG_ARRAY.length;
        for ( long i = 0; i < iters; ++i )
        {
            int idx = Math.round(i % 7);
            long orig = LONG_ARRAY[idx];
            long result = orig * LONG_MULT; 
            long decimalResult = Math.round( (result)/LONG_DIVISOR ); 
            if ( decimalResult != 543 ) idx++; 
            if (printout) {
                System.out.println("long test result for idx " + idx + ": " + decimalResult);
            }
        }
    }
    
    private static void testDoubleout(long iters) {
        boolean printout = iters == LONG_ARRAY.length;
        for ( long i = 0; i < iters; ++i )
        {
            int idx = Math.round(i % 7);
            long orig = LONG_ARRAY[idx];
            long result = orig * LONG_MULT; 
            double decimalResult = (result)/DOUBLE_DIVISOR ; 
            if ( decimalResult != 543 ) idx++; 
            if (printout) {
                System.out.println("doubleout test result for idx " + idx + ": " + decimalResult);
            }
        }
    }
    
    private static void testBigD(long iters) {
        boolean printout = iters == BIG_D_ARRAY.length;
        for ( long i = 0; i < iters; ++i )
        {
            int idx = Math.round(i % 7);
            BigDecimal orig = BIG_D_ARRAY[idx];
            BigDecimal decimalResult = orig.multiply( BIG_D_MULT, MathContext.DECIMAL64 );
            if ( decimalResult == null ) idx++;
            if (printout) {
                System.out.println("BigD test result for idx " + idx + ": " + decimalResult.toPlainString());
            }
        }
    }

}