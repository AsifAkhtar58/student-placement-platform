# Student Placement Management Platform — Java Source Code

This is the "project code" your teacher asked for: the actual working Java
program that implements the design from your presentation.

## What "project code" means
Your PPT describes the *design* (class diagram, OOP concepts, modules).
"Project code" is the real `.java` files that make that design run — the
thing you compile and execute to show it actually works.

## Files (in `src/placement/`)
| File | What it is |
|---|---|
| `User.java` | Abstract base class (id, name, email, password, login/logout) |
| `Student.java` | Extends `User`; CGPA, resume, applies to drives |
| `Recruiter.java` | Extends `User`; posts openings, shortlists candidates |
| `Admin.java` | Extends `User`; schedules drives, generates reports |
| `PlacementRecord.java` | One student's application status for one company |
| `Opening.java` | A job opening posted by a recruiter |
| `Eligible.java`, `Notifiable.java`, `Reportable.java` | Interfaces |
| `InvalidEligibilityException.java`, `DuplicateApplicationException.java` | Custom exceptions |
| `FileManager.java` | Saves/loads data to `.txt` files (File I/O) |
| `PlacementService.java` | Business logic; holds the `ArrayList`/`HashMap` collections |
| `Main.java` | Console menu — **run this one** |

## How each OOP pillar shows up (for when Ms. Saini asks)
- **Encapsulation**: every field in `User`, `Student`, etc. is `private`, accessed only via getters/setters.
- **Inheritance**: `Student`, `Recruiter`, `Admin` all extend `User`.
- **Polymorphism**:
  - *Overriding* — `generateReport()` behaves differently in `Recruiter` vs `Admin`.
  - *Overloading* — `Student.applyToDrive(Opening)` and `applyToDrive(String, Opening)`; `Admin.generateReport()` and `generateReport(List<PlacementRecord>)`.
- **Abstraction**: `User` is `abstract` — you can never instantiate it directly; `Eligible`, `Notifiable`, `Reportable` are interfaces.
- **Collections**: `ArrayList<Student>`, `HashMap<String, Recruiter>`, `TreeSet<Student>` (auto-ranked shortlist by CGPA).
- **Exceptions**: custom `InvalidEligibilityException` and `DuplicateApplicationException`, both actually thrown and caught.
- **File I/O**: `FileManager` writes/reads `students.txt` and `placement_records.txt`.

## How to compile and run
You need Java installed (JDK 8+). Check with:
```
java -version
```

From the project's root folder (the one containing `src/`):
```
mkdir -p out
javac -d out src/placement/*.java
java -cp out placement.Main
```

That's it — a text menu will appear. Try:
1. Option `5` to see the two demo students already loaded.
2. Option `4` to apply a student to TCS (roll no `2501331930020`, company `TCS`).
3. Option `4` again with the same roll no/company — you'll see the custom
   `DuplicateApplicationException` message.
4. Option `7` to generate the reports.
5. Option `8` to save everything to text files and exit.

## If you're using an IDE (Eclipse / IntelliJ / VS Code) instead
1. Create a new Java project.
2. Copy the `placement` folder (with all its `.java` files) into your project's `src` folder.
3. Run `Main.java`.

## Already compiled and tested
This code was compiled and run in a real Java 21 environment before being
handed to you — it works without changes. If your teacher checks it
tomorrow, just show `Main.java` running and be ready to point at one file
per OOP concept from the table above.
