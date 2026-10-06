package placement;

/**
 * Abstract base class for every person in the system.
 * Demonstrates ABSTRACTION (you can never create a plain "User" object,
 * only a Student, Recruiter or Admin) and ENCAPSULATION (all fields are
 * private, accessed only through getters/setters or methods).
 */
public abstract class User {
    private String id;
    private String name;
    private String email;
    private String password;

    public User(String id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public boolean login(String emailAttempt, String passwordAttempt) {
        return this.email.equalsIgnoreCase(emailAttempt) && this.password.equals(passwordAttempt);
    }

    public void logout() {
        System.out.println(name + " has logged out.");
    }

    // Every subclass must say what role it plays (used for reports/menus)
    public abstract String getRole();

    // ---- Encapsulated access ----
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    protected String getPassword() { return password; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
}
