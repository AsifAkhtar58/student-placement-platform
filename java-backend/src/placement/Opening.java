package placement;

import java.util.ArrayList;
import java.util.List;

/** A job opening posted by a Recruiter. */
public class Opening {
    private String title;
    private String companyName;
    private double minCgpa;
    private List<Student> applicants = new ArrayList<>();

    public Opening(String title, String companyName, double minCgpa) {
        this.title = title;
        this.companyName = companyName;
        this.minCgpa = minCgpa;
    }

    public void addApplicant(Student s) {
        applicants.add(s);
    }

    public String getTitle() { return title; }
    public String getCompanyName() { return companyName; }
    public double getMinCgpa() { return minCgpa; }
    public List<Student> getApplicants() { return applicants; }

    @Override
    public String toString() {
        return title + " @ " + companyName + " (min CGPA: " + minCgpa + ")";
    }
}
