package placement;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

/** Recruiter extends User, implements Reportable and Notifiable. */
public class Recruiter extends User implements Reportable, Notifiable {
    private String companyName;
    private List<Opening> openings = new ArrayList<>();

    public Recruiter(String id, String name, String email, String password, String companyName) {
        super(id, name, email, password);
        this.companyName = companyName;
    }

    @Override
    public String getRole() {
        return "Recruiter";
    }

    public Opening postOpening(String title, double minCgpa) {
        Opening opening = new Opening(title, companyName, minCgpa);
        openings.add(opening);
        return opening;
    }

    /** Ranked shortlist: a TreeSet automatically sorts applicants by CGPA (see Student.compareTo). */
    public TreeSet<Student> shortlist(Opening opening) {
        return new TreeSet<>(opening.getApplicants());
    }

    // Overrides Reportable differently from Admin (POLYMORPHISM - runtime/overriding)
    @Override
    public String generateReport() {
        StringBuilder sb = new StringBuilder();
        sb.append("Recruiter Report - ").append(companyName).append("\n");
        for (Opening o : openings) {
            sb.append("  - ").append(o).append(" | Applicants: ").append(o.getApplicants().size()).append("\n");
        }
        return sb.toString();
    }

    @Override
    public void notify(String message) {
        System.out.println("[Notification to " + companyName + "]: " + message);
    }

    public String getCompanyName() { return companyName; }
    public List<Opening> getOpenings() { return openings; }
}
