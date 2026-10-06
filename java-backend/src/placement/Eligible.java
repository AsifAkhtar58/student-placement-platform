package placement;

/** Contract for anything whose placement eligibility can be checked. */
public interface Eligible {
    boolean checkEligibility(double minCgpa);
}
