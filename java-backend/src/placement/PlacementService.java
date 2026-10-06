package placement;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

/**
 * Central business-logic class. Holds all the Java Collections mentioned
 * in the slides: ArrayList (students, records), HashMap (recruiters by
 * company name). TreeSet ranking happens inside Recruiter.shortlist().
 */
public class PlacementService {
    private ArrayList<Student> students = new ArrayList<>();
    private HashMap<String, Recruiter> recruiters = new HashMap<>();
    private List<PlacementRecord> records = new ArrayList<>();
    private Admin admin;

    public PlacementService(Admin admin) {
        this.admin = admin;
    }

    public void registerStudent(Student s) {
        students.add(s);
        System.out.println("Registered student: " + s.getName());
    }

    public void registerRecruiter(Recruiter r) {
        recruiters.put(r.getCompanyName(), r);
        System.out.println("Registered recruiter: " + r.getCompanyName());
    }

    public Recruiter getRecruiter(String companyName) {
        return recruiters.get(companyName);
    }

    public void applyToDrive(Student s, Opening o) {
        try {
            s.applyToDrive(o);
            records.add(new PlacementRecord(s.getRollNo(), o.getCompanyName(), "Applied"));
            s.notify("Successfully applied to " + o.getCompanyName());
            System.out.println("Application recorded.");
        } catch (DuplicateApplicationException | InvalidEligibilityException e) {
            System.out.println("Application failed: " + e.getMessage());
        }
    }

    public void generateAllReports() {
        for (Recruiter r : recruiters.values()) {
            System.out.println(r.generateReport());
        }
        System.out.println(admin.generateReport(records));
    }

    public List<Student> getStudents() { return students; }
    public Collection<Recruiter> getRecruiters() { return recruiters.values(); }
    public List<PlacementRecord> getRecords() { return records; }

    public void persist() {
        FileManager.saveStudents(students);
        FileManager.saveRecords(records);
    }
}
