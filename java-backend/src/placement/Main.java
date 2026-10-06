package placement;

import java.util.Scanner;

/** Console UI entry point — run this class to use the application. */
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Admin admin = new Admin("A1", "Ms. Disha Saini", "disha@niet.edu", "admin123", "EMP001");
        PlacementService service = new PlacementService(admin);

        // ---- Seed a bit of demo data so the menu isn't empty on first run ----
        Student s1 = new Student("S1", "Asif Akhtar", "asif@niet.edu", "pass123",
                "2501331930020", "resume_asif.pdf", 8.4);
        Student s2 = new Student("S2", "Arpit Choudhary", "arpit@niet.edu", "pass123",
                "2501331930016", "resume_arpit.pdf", 7.2);
        service.registerStudent(s1);
        service.registerStudent(s2);

        Recruiter tcs = new Recruiter("R1", "TCS HR", "hr@tcs.com", "pass123", "TCS");
        service.registerRecruiter(tcs);
        tcs.postOpening("Software Engineer", 7.5);

        boolean running = true;
        while (running) {
            System.out.println("\n===== Student Placement Management Platform =====");
            System.out.println("1. Register Student");
            System.out.println("2. Register Recruiter");
            System.out.println("3. Post Opening");
            System.out.println("4. Apply to Drive");
            System.out.println("5. View All Students");
            System.out.println("6. View All Openings");
            System.out.println("7. Generate Reports");
            System.out.println("8. Save & Exit");
            System.out.print("Choose an option: ");

            int choice;
            try {
                choice = Integer.parseInt(sc.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
                continue;
            }

            switch (choice) {
                case 1: {
                    System.out.print("Name: ");
                    String name = sc.nextLine();
                    System.out.print("Email: ");
                    String email = sc.nextLine();
                    System.out.print("Roll No: ");
                    String roll = sc.nextLine();
                    System.out.print("CGPA: ");
                    double cgpa = Double.parseDouble(sc.nextLine());
                    Student s = new Student("S" + (service.getStudents().size() + 1),
                            name, email, "pass123", roll, "resume.pdf", cgpa);
                    service.registerStudent(s);
                    break;
                }
                case 2: {
                    System.out.print("Company Name: ");
                    String company = sc.nextLine();
                    System.out.print("HR Email: ");
                    String email = sc.nextLine();
                    Recruiter r = new Recruiter("R" + (service.getRecruiters().size() + 1),
                            company + " HR", email, "pass123", company);
                    service.registerRecruiter(r);
                    break;
                }
                case 3: {
                    System.out.print("Company Name: ");
                    String company = sc.nextLine();
                    Recruiter r = service.getRecruiter(company);
                    if (r == null) {
                        System.out.println("Company not found. Register the recruiter first.");
                        break;
                    }
                    System.out.print("Job Title: ");
                    String title = sc.nextLine();
                    System.out.print("Minimum CGPA: ");
                    double minCgpa = Double.parseDouble(sc.nextLine());
                    r.postOpening(title, minCgpa);
                    System.out.println("Opening posted.");
                    break;
                }
                case 4: {
                    System.out.print("Student Roll No: ");
                    String roll = sc.nextLine();
                    Student student = null;
                    for (Student s : service.getStudents()) {
                        if (s.getRollNo().equals(roll)) {
                            student = s;
                            break;
                        }
                    }
                    if (student == null) {
                        System.out.println("Student not found.");
                        break;
                    }
                    System.out.print("Company Name: ");
                    String company = sc.nextLine();
                    Recruiter r = service.getRecruiter(company);
                    if (r == null || r.getOpenings().isEmpty()) {
                        System.out.println("No openings for this company.");
                        break;
                    }
                    Opening o = r.getOpenings().get(0);
                    service.applyToDrive(student, o);
                    break;
                }
                case 5:
                    for (Student s : service.getStudents()) System.out.println(s);
                    break;
                case 6:
                    for (Recruiter r : service.getRecruiters()) {
                        for (Opening o : r.getOpenings()) System.out.println(o);
                    }
                    break;
                case 7:
                    service.generateAllReports();
                    break;
                case 8:
                    service.persist();
                    System.out.println("Data saved to students.txt / placement_records.txt. Goodbye!");
                    running = false;
                    break;
                default:
                    System.out.println("Invalid option.");
            }
        }
        sc.close();
    }
}
