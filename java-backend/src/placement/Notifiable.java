package placement;

/** Contract for anything that can receive a notification message. */
public interface Notifiable {
    void notify(String message);
}
