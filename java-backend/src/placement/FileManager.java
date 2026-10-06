package placement;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Handles saving/loading data to plain text files so records survive
 * after the program closes (the "File / DB handling" from the slides).
 */
public class FileManager {
    private static final String STUDENT_FILE = "students.txt";
    private static final String RECORD_FILE = "placement_records.txt";

    public static void saveStudents(List<Student> students) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(STUDENT_FILE))) {
            for (Student s : students) {
                bw.write(s.getId() + "," + s.getName() + "," + s.getEmail() + "," +
                          s.getRollNo() + "," + s.getCgpa());
                bw.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving students: " + e.getMessage());
        }
    }

    public static List<String[]> loadStudents() {
        return loadCsv(STUDENT_FILE);
    }

    public static void saveRecords(List<PlacementRecord> records) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(RECORD_FILE))) {
            for (PlacementRecord r : records) {
                bw.write(r.getStudentId() + "," + r.getCompanyName() + "," + r.getStatus());
                bw.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving records: " + e.getMessage());
        }
    }

    public static List<String[]> loadRecords() {
        return loadCsv(RECORD_FILE);
    }

    private static List<String[]> loadCsv(String fileName) {
        List<String[]> rows = new ArrayList<>();
        File file = new File(fileName);
        if (!file.exists()) return rows;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (!line.trim().isEmpty()) rows.add(line.split(","));
            }
        } catch (IOException e) {
            System.out.println("Error loading " + fileName + ": " + e.getMessage());
        }
        return rows;
    }
}
