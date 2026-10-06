package placement;

import java.util.ArrayList;
import java.util.List;

/**
 * Student extends User (INHERITANCE), implements Eligible and Notifiable,
 * and implements Comparable so students can be ranked by CGPA in a TreeSet.
 */
public class Student extends User implements Eligible, Notifiable, Comparable<Student> {
    private String rollNo;
    private String resume;
    private double cgpa;
    private List<String> appliedCompanies = new ArrayList<>();

    public Student(String id, String name, String email, String password,
                   String rollNo, String resume, double cgpa) {
        super(id, name, email, password);
        this.rollNo = rollNo;
        this.resume = resume;
        this.cgpa = cgpa;
    }

    @Override
    public String getRole() {
        return "Student";
    }

    @Override
    public boolean checkEligibility(double minCgpa) {
        return this.cgpa >= minCgpa;
    }

    // ---- Overloaded methods (POLYMORPHISM - compile-time) ----

    /** Apply using an Opening object directly. */
    public void applyToDrive(Opening opening) throws DuplicateApplicationException, InvalidEligibilityException {
        applyToDrive(opening.getCompanyName(), opening);
    }

    /** Apply while explicitly stating the company name (overload). */
    public void applyToDrive(String companyName, Opening opening)
            throws DuplicateApplicationException, InvalidEligibilityException {
        if (appliedCompanies.contains(companyName)) {
            throw new DuplicateApplicationException(label() + " has already applied to " + companyName);
        }
        if (!checkEligibility(opening.getMinCgpa())) {
            throw new InvalidEligibilityException(label() + " does not meet the CGPA requirement for " + companyName);
        }
        appliedCompanies.add(companyName);
        opening.addApplicant(this);
    }

    private String label() {
        return getName() + " (" + rollNo + ")";
    }

    @Override
    public void notify(String message) {
        System.out.println("[Notification to " + getName() + "]: " + message);
    }

    // Rank students by CGPA, highest first, so TreeSet<Student> gives a ranked shortlist
    @Override
    public int compareTo(Student other) {
        int cmp = Double.compare(other.cgpa, this.cgpa);
        if (cmp != 0) return cmp;
        return this.rollNo.compareTo(other.rollNo); // tie-break so equal CGPA students aren't dropped
    }

    public String getRollNo() { return rollNo; }
    public String getResume() { return resume; }
    public double getCgpa() { return cgpa; }
    public List<String> getAppliedCompanies() { return appliedCompanies; }

    @Override
    public String toString() {
        return rollNo + " | " + getName() + " | CGPA: " + cgpa;
    }
}
