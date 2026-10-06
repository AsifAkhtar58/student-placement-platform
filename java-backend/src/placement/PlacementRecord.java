package placement;

/** Tracks one student's application status against one company. */
public class PlacementRecord {
    private String studentId;
    private String companyName;
    private String status; // Applied, Shortlisted, Placed, Rejected

    public PlacementRecord(String studentId, String companyName, String status) {
        this.studentId = studentId;
        this.companyName = companyName;
        this.status = status;
    }

    public void updateStatus(String newStatus) {
        this.status = newStatus;
    }

    public String getStudentId() { return studentId; }
    public String getCompanyName() { return companyName; }
    public String getStatus() { return status; }

    @Override
    public String toString() {
        return "Student: " + studentId + " | Company: " + companyName + " | Status: " + status;
    }
}
