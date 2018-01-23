package junkdrawer;

import java.math.BigDecimal;
import java.util.Random;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.State;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.RunnerException;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;

// initial version, copied from http://vanillajava.blogspot.com/2014/07/if-bigdecimal-is-answer-it-must-have.html
@State(Scope.Thread)
public class DecmialTest2 {
	static final int SIZE = 1024;
    final double[] ap = new double[SIZE];
    final double[] bp = new double[SIZE];
    final double[] mp = new double[SIZE];

    final BigDecimal[] ap2 = new BigDecimal[SIZE];
    final BigDecimal[] bp2 = new BigDecimal[SIZE];
    final BigDecimal[] mp2 = new BigDecimal[SIZE];

    public DecmialTest2() {
        Random rand = new Random(1);
        for (int i = 0; i < SIZE; i++) {
            int x = rand.nextInt(200000), y = rand.nextInt(10000);
            ap2[i] = BigDecimal.valueOf(ap[i] = x / 1e5);
            bp2[i] = BigDecimal.valueOf(bp[i] = (x + y) / 1e5);
        }
        doubleMidPrice();
        bigDecimalMidPrice();
        for (int i = 0; i < SIZE; i++) {
            if (mp[i] != mp2[i].doubleValue())
                throw new AssertionError(mp[i] + " " + mp2[i]);
        }
    }

    @Benchmark
    public void doubleMidPrice() {
        for (int i = 0; i < SIZE; i++)
            mp[i] = round6((ap[i] + bp[i]) / 2);
    }

    static double round6(double x) {
        final double factor = 1e6;
        return (long) (x * factor + 0.5) / factor;
    }

    @Benchmark
    public void bigDecimalMidPrice() {
        for (int i = 0; i < SIZE; i++)
            mp2[i] = ap2[i].add(bp2[i])
            .divide(BigDecimal.valueOf(2), 6, BigDecimal.ROUND_HALF_UP);
    }


    public static void main(String[] args) throws RunnerException {
        Options opt = new OptionsBuilder()
                .include(".*" + DecmialTest2.class.getSimpleName() + ".*")
                .forks(1)
                .build();

        new Runner(opt).run();
    }
}
