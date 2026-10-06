/* Student Placement Management Platform - front end.
   Classes mirror the Java project: User > Student / Recruiter / Admin, Opening, PlacementRecord, PlacementService. */

// ---- Custom exceptions (same names as the Java versions) ----
class DuplicateApplicationException extends Error {}
class InvalidEligibilityException extends Error {}

// ---- ABSTRACTION + ENCAPSULATION: User is abstract, password is private ----
class User {
  #password; inbox = []; seen = 0;
  constructor(id, name, email, password) {
    if (new.target === User) throw new Error('User is abstract');
    Object.assign(this, { id, name, email }); this.#password = password;
  }
  login(e, p) { return this.email.toLowerCase() === e.trim().toLowerCase() && this.#password === p; }
  getRole() { throw new Error('abstract'); }
  notify(msg) { this.inbox.unshift({ msg, time: new Date().toLocaleTimeString() }); } // Notifiable
}
// ---- INHERITANCE: Student extends User (implements Eligible, Notifiable) ----
class Student extends User {
  applied = []; file = null;
  constructor(id, name, email, pw, roll, resume, cgpa) { super(id, name, email, pw); Object.assign(this, { roll, resume, cgpa }); }
  getRole() { return 'Student'; }
  checkEligibility(min) { return this.cgpa >= min; } // Eligible
  label() { return `${this.name} (${this.roll})`; }
  applyToDrive(o) { // throws the two custom exceptions, like Student.java
    if (this.applied.includes(o.company)) throw new DuplicateApplicationException(`${this.label()} has already applied to ${o.company}`);
    if (!this.checkEligibility(o.minCgpa)) throw new InvalidEligibilityException(`${this.label()} does not meet the CGPA requirement for ${o.company}`);
    this.applied.push(o.company); o.applicants.push(this);
  }
}
class Opening {
  applicants = [];
  constructor(title, company, minCgpa) { Object.assign(this, { title, company, minCgpa }); }
}
class Recruiter extends User {
  openings = [];
  constructor(id, name, email, pw, companyName) { super(id, name, email, pw); this.companyName = companyName; }
  getRole() { return 'Recruiter'; }
  postOpening(title, min) { const o = new Opening(title, this.companyName, min); this.openings.push(o); return o; }
  // Ranked shortlist (TreeSet in Java): CGPA high to low, ties broken by roll number
  shortlist(o) { return [...o.applicants].sort((a, b) => b.cgpa - a.cgpa || a.roll.localeCompare(b.roll)); }
}
class Admin extends User {
  constructor(id, name, email, pw, employeeId) { super(id, name, email, pw); this.employeeId = employeeId; }
  getRole() { return 'Admin'; }
}
class PlacementRecord {
  constructor(studentId, company, status) { Object.assign(this, { studentId, company, status }); }
  updateStatus(s) { this.status = s; }
}
// ---- Business logic + collections (ArrayList / HashMap in Java) ----
class PlacementService {
  students = []; recruiters = new Map(); records = []; drives = [];
  constructor(admin) { this.admin = admin; }
  users() { return [this.admin, ...this.students, ...this.recruiters.values()]; }
  openings() { return [...this.recruiters.values()].flatMap(r => r.openings); }
  recordOf(s, o) { return this.records.find(r => r.studentId === s.roll && r.company === o.company); }
  applyToDrive(s, o) { // catches the custom exceptions, like PlacementService.java
    try {
      s.applyToDrive(o);
      this.records.push(new PlacementRecord(s.roll, o.company, 'Applied'));
      s.notify('Successfully applied to ' + o.company);
      this.recruiters.get(o.company).notify(`${s.name} applied for ${o.title}`);
      return [true, 'Application recorded.'];
    } catch (e) {
      if (e instanceof DuplicateApplicationException || e instanceof InvalidEligibilityException) return [false, e.message];
      throw e;
    }
  }
}

// ---- Seed data (same demo data and passwords as Main.java) ----
const svc = new PlacementService(new Admin('A1', 'Ms. Disha Saini', 'disha@niet.edu', 'admin123', 'EMP001'));
svc.students.push(new Student('S1', 'Asif Akhtar', 'asif@niet.edu', 'pass123', '2501331930020', 'resume_asif.pdf', 8.4),
                  new Student('S2', 'Arpit Choudhary', 'arpit@niet.edu', 'pass123', '2501331930016', 'resume_arpit.pdf', 7.2));
const tcs = new Recruiter('R1', 'TCS HR', 'hr@tcs.com', 'pass123', 'TCS');
svc.recruiters.set('TCS', tcs); tcs.postOpening('Software Engineer', 7.5);

// ---- UI ----
const STATUS = ['Applied', 'Shortlisted', 'Placed', 'Rejected'];
const DEMO = [['Student (Asif)', 'asif@niet.edu', 'pass123'], ['Student (Arpit)', 'arpit@niet.edu', 'pass123'], ['Recruiter (TCS)', 'hr@tcs.com', 'pass123'], ['Admin', 'disha@niet.edu', 'admin123']];
const state = { user: null, tab: 'login', page: 'home', sel: 0 };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const badge = s => `<span class="b b-${s}">${s}</span>`;
const table = (h, rows, empty) => rows.length ? `<table><tr>${h.map(x => `<th>${x}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>` : `<p class="empty">${empty}</p>`;
const inbox = (u, n = 99) => u.inbox.length ? u.inbox.slice(0, n).map(x => `<div class="note">${esc(x.msg)}<small>${x.time}</small></div>`).join('') : '<p class="empty">No notifications yet.</p>';
function toast(m, ok = true) { const t = document.getElementById('toast'); t.textContent = m; t.className = (ok ? 'ok' : 'err') + ' show'; clearTimeout(toast.t); toast.t = setTimeout(() => t.className = '', 3500); }
function fileErr(f) { if (!f || !f.size) return ''; if (f.type !== 'application/pdf') return 'Only PDF files are allowed.'; return f.size > 2 * 1024 * 1024 ? 'Resume must be under 2 MB.' : ''; }
const render = () => document.getElementById('root').innerHTML = state.user ? shell() : auth();

function auth() {
  const L = state.tab === 'login';
  return `<div class="auth"><div class="card ac"><div class="logo dk">🎓 NIET T&amp;P Cell<small>Student Placement Management Platform</small></div>
  <div class="tabs"><button data-act="tab" data-v="login" class="${L ? 'on' : ''}">Sign In</button><button data-act="tab" data-v="reg" class="${L ? '' : 'on'}">Register</button></div>
  ${L ? `<form data-form="login"><label>Email<input name="email" id="em"></label><label>Password<input name="password" type="password" id="pw"></label><button class="btn w">Sign In</button></form>
  <p class="demo"><small>Demo accounts (same as the Java app) - click to fill:</small><br>${DEMO.map(d => `<a href="#" data-act="fill" data-v="${d[1]}|${d[2]}">${d[0]}</a>`).join('')}</p>` :
  `<form data-form="reg"><label>Register as<select name="role"><option>Student</option><option>Recruiter</option></select></label><label>Name (Recruiter: company name)<input name="name"></label><label>Email<input name="email"></label>
  <div id="sf"><label>Roll No<input name="roll"></label><label>CGPA<input name="cgpa" placeholder="0 - 10"></label><label>Resume (PDF, max 2 MB)<input type="file" name="resume" accept="application/pdf"></label></div><button class="btn w">Register</button></form>`}</div></div>`;
}
function shell() {
  const u = state.user, n = u.inbox.length - u.seen, on = p => state.page === p ? 'on' : '';
  const view = state.page === 'notif' ? `<h1>Notifications</h1><div class="card">${inbox(u)}</div>` : { Student: studentView, Recruiter: recruiterView, Admin: adminView }[u.getRole()](u);
  return `<div class="app"><aside class="side"><div class="logo">🎓 NIET T&amp;P Cell<small>PLACEMENT PORTAL</small></div>
  <button data-act="nav" data-v="home" class="${on('home')}">Dashboard</button><button data-act="nav" data-v="notif" class="${on('notif')}">Notifications${n ? `<i>${n}</i>` : ''}</button>
  <div class="who">${esc(u.name)}<small>${u.getRole()}</small><button data-act="logout">Logout</button></div></aside><main class="main">${view}</main></div>`;
}
function studentView(s) {
  const ops = svc.openings(), mine = svc.records.filter(r => r.studentId === s.roll);
  return `<h1>Student Dashboard</h1><div class="grid2"><div class="card"><div class="prof"><span class="av">${esc(s.name[0])}</span><div><h3>${esc(s.name)}</h3><p>Roll No: ${s.roll}</p></div><div class="cg"><small>CGPA</small><b>${s.cgpa.toFixed(1)}</b></div></div>
  <div class="file"><span>📄 <b>${esc(s.resume)}</b></span><span><button class="btn light" data-act="resume" data-v="${s.roll}">View Resume</button> <label class="btn" for="rf" style="margin:0">Upload / Replace</label><input id="rf" type="file" accept="application/pdf" hidden></span></div><small>PDF only, max 2 MB</small></div>
  <div class="card"><h3>Notifications</h3>${inbox(s, 3)}</div></div>
  <div class="card"><h3>Campus Recruitment Drives</h3>${ops.length ? ops.map((o, i) => { const e = s.checkEligibility(o.minCgpa); return `<div class="row"><div><b>${esc(o.title)}</b> <span class="b ${e ? 'b-ok' : 'b-no'}">${e ? 'Eligible' : 'Not Eligible'}</span><br><small>${esc(o.company)} - Min CGPA ${o.minCgpa}</small></div><button class="btn" data-act="apply" data-i="${i}">Apply Now</button></div>`; }).join('') : '<p class="empty">No openings posted yet.</p>'}</div>
  <div class="card"><h3>My Applications</h3>${table(['Company', 'Status'], mine.map(r => [esc(r.company), badge(r.status)]), 'No applications submitted yet.')}</div>`;
}
function recruiterView(r) {
  const o = r.openings[state.sel] || r.openings[0], list = o ? r.shortlist(o) : [];
  return `<h1>Recruiter Dashboard - ${esc(r.companyName)}</h1><div class="grid2"><div class="card"><h3>Post Opening</h3><form data-form="post"><label>Job Title<input name="title" placeholder="e.g. Software Engineer"></label><label>Minimum CGPA<input name="min" placeholder="e.g. 7.5"></label><button class="btn">Post Opening</button></form></div>
  <div class="card"><h3>My Openings</h3>${table(['Title', 'Min CGPA', 'Applicants', ''], r.openings.map((x, i) => [esc(x.title), x.minCgpa, x.applicants.length, `<button class="btn light" data-act="sel" data-i="${i}">Shortlist</button>`]), 'No openings yet.')}</div></div>
  <div class="card"><h3>Ranked Shortlist${o ? ': ' + esc(o.title) : ''}</h3><small>Ranked by CGPA (highest first); ties broken by roll number.</small>
  ${table(['Rank', 'Name', 'Roll No', 'CGPA', 'Resume', 'Status', 'Action'], list.map((s, k) => { const rec = svc.recordOf(s, o), ix = svc.records.indexOf(rec); return [k + 1, esc(s.name), s.roll, s.cgpa.toFixed(1), `<button class="btn light" data-act="resume" data-v="${s.roll}">View</button>`, badge(rec.status), `<button class="btn" data-act="mark" data-v="Shortlisted" data-i="${ix}">Shortlist</button> <button class="btn red" data-act="mark" data-v="Rejected" data-i="${ix}">Reject</button>`]; }), 'No applications yet.')}</div>`;
}
function adminView() {
  const placed = svc.records.filter(r => r.status === 'Placed').length;
  const st = [['Total Students', svc.students.length], ['Total Recruiters', svc.recruiters.size], ['Total Openings', svc.openings().length], ['Total Placed', placed]];
  return `<h1>Admin Dashboard</h1><div class="stats">${st.map(x => `<div class="card stat"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
  <div class="grid2"><div class="card"><h3>Schedule Drive</h3><form data-form="drive"><label>Company<select name="company">${[...svc.recruiters.keys()].map(c => `<option>${esc(c)}</option>`).join('')}</select></label><label>Drive Date<input type="date" name="date"></label><button class="btn">Schedule Drive</button></form>${svc.drives.map(d => `<div class="note">📅 ${esc(d.company)} - ${d.date}</div>`).join('')}</div>
  <div class="card"><h3>Registered Students</h3>${table(['Roll No', 'Name', 'Email', 'CGPA', 'Resume'], svc.students.map(s => [s.roll, esc(s.name), esc(s.email), s.cgpa.toFixed(1), `<a href="#" data-act="resume" data-v="${s.roll}">${esc(s.resume)}</a>`]), 'No students.')}</div></div>
  <div class="card"><h3>Placement Summary Report</h3>${table(['Student Roll No', 'Company', 'Status'], svc.records.map((r, i) => [r.studentId, esc(r.company), `<select data-chg="status" data-i="${i}">${STATUS.map(x => `<option${x === r.status ? ' selected' : ''}>${x}</option>`).join('')}</select>`]), 'No placement records yet.')}<p><b>Total Placed: ${placed} / ${svc.records.length}</b></p></div>`;
}

// ---- Actions (button clicks) ----
const actions = {
  tab(v) { state.tab = v; render(); },
  fill(v) { const [e, p] = v.split('|'); document.getElementById('em').value = e; document.getElementById('pw').value = p; },
  nav(v) { state.page = v; if (v === 'notif') state.user.seen = state.user.inbox.length; render(); },
  logout() { state.user = null; state.page = 'home'; state.sel = 0; render(); },
  sel(_, i) { state.sel = +i; render(); },
  apply(_, i) { const [ok, m] = svc.applyToDrive(state.user, svc.openings()[i]); render(); toast(m, ok); },
  mark(v, i) { setStatus(+i, v); render(); toast('Status updated to ' + v); },
  resume(v) { const s = svc.students.find(x => x.roll === v); s.file ? open(URL.createObjectURL(s.file), '_blank') : toast(s.resume + ' is demo data - no file was uploaded in this session.'); }
};
function setStatus(i, status) { // PlacementRecord.updateStatus + notify the student
  const r = svc.records[i]; r.updateStatus(status);
  svc.students.find(s => s.roll === r.studentId).notify(`Application status updated: ${r.company} - ${status}`);
}
// ---- Forms (with validation) ----
const forms = {
  login(d) { const u = svc.users().find(x => x.login(d.email, d.password)); if (!u) return toast('Invalid email or password.', false); state.user = u; state.page = 'home'; render(); },
  reg(d) {
    const name = d.name.trim(), email = d.email.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid name and email.', false);
    if (svc.users().some(u => u.email.toLowerCase() === email.toLowerCase())) return toast('Email already registered.', false);
    if (d.role === 'Recruiter') {
      if (svc.recruiters.has(name)) return toast('Company already registered.', false);
      svc.recruiters.set(name, new Recruiter('R' + (svc.recruiters.size + 1), name + ' HR', email, 'pass123', name));
    } else {
      const cg = Number(d.cgpa), err = fileErr(d.resume);
      if (!d.roll.trim() || d.cgpa.trim() === '' || isNaN(cg) || cg < 0 || cg > 10) return toast('Roll No is required and CGPA must be between 0 and 10.', false);
      if (err) return toast(err, false);
      const s = new Student('S' + (svc.students.length + 1), name, email, 'pass123', d.roll.trim(), 'resume.pdf', cg);
      if (d.resume && d.resume.size) { s.resume = d.resume.name; s.file = d.resume; }
      svc.students.push(s);
    }
    state.tab = 'login'; render(); toast('Registered. Sign in with password: pass123');
  },
  post(d) {
    const min = Number(d.min);
    if (!d.title.trim() || d.min.trim() === '' || isNaN(min) || min < 0 || min > 10) return toast('Enter a job title and a CGPA between 0 and 10.', false);
    state.user.postOpening(d.title.trim(), min); render(); toast('Opening posted.');
  },
  drive(d) { // Admin.scheduleDrive
    if (!d.company || !d.date) return toast('Select a company and a date.', false);
    svc.drives.push(d); svc.students.forEach(s => s.notify(`Drive scheduled for ${d.company} on ${d.date}`)); render(); toast('Drive scheduled.');
  }
};
function uploadResume(f) {
  const s = state.user; if (!f) return;
  const err = fileErr(f); if (err) return toast(err, false);
  s.resume = f.name; s.file = f; s.notify('Resume uploaded successfully: ' + f.name); render(); toast('Resume uploaded successfully.');
}
document.addEventListener('click', e => { const b = e.target.closest('[data-act]'); if (!b) return; e.preventDefault(); actions[b.dataset.act](b.dataset.v, b.dataset.i); });
document.addEventListener('submit', e => { e.preventDefault(); forms[e.target.dataset.form](Object.fromEntries(new FormData(e.target))); });
document.addEventListener('change', e => {
  const t = e.target;
  if (t.id === 'rf') uploadResume(t.files[0]);
  else if (t.dataset.chg === 'status') { setStatus(+t.dataset.i, t.value); render(); toast('Status updated to ' + t.value); }
  else if (t.name === 'role') document.getElementById('sf').hidden = t.value === 'Recruiter';
});
render();
