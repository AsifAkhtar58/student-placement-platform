package placement;

/** Thrown when a student applies to a drive without meeting the CGPA cutoff. */
public class InvalidEligibilityException extends Exception {
    public InvalidEligibilityException(String message) {
        super(message);
    }
}
