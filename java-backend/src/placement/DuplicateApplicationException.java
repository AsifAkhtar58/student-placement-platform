package placement;

/** Thrown when a student tries to apply to the same company twice. */
public class DuplicateApplicationException extends Exception {
    public DuplicateApplicationException(String message) {
        super(message);
    }
}
