```javascript
/* =====================================================
   EDUMANAGE SCHOOL MANAGEMENT SYSTEM
   Main JavaScript
===================================================== */

const defaultStudents = [
    {
        id: "ST001",
        firstName: "Brian",
        lastName: "Kamau",
        gender: "Male",
        className: "Grade 10",
        guardian: "John Kamau",
        phone: "0712345678",
        status: "Active"
    },
    {
        id: "ST002",
        firstName: "Amina",
        lastName: "Hassan",
        gender: "Female",
        className: "Grade 9",
        guardian: "Fatuma Hassan",
        phone: "0723456789",
        status: "Active"
    },
    {
        id: "ST003",
        firstName: "David",
        lastName: "Otieno",
        gender: "Male",
        className: "Grade 11",
        guardian: "Mary Otieno",
        phone: "0734567890",
        status: "Active"
    },
    {
        id: "ST004",
        firstName: "Grace",
        lastName: "Wanjiku",
        gender: "Female",
        className: "Grade 8",
        guardian: "Peter Wanjiku",
        phone: "0745678901",
        status: "Active"
    },
    {
        id: "ST005",
        firstName: "Kevin",
        lastName: "Mwangi",
        gender: "Male",
        className: "Grade 12",
        guardian: "Susan Mwangi",
        phone: "0756789012",
        status: "Active"
    }
];

const defaultTeachers = [
    {
        id: "T001",
        name: "Mr. James Kariuki",
        subject: "Mathematics",
        phone: "0711223344",
        email: "james@edumanage.com",
        status: "Active"
    },
    {
        id: "T002",
        name: "Ms. Sarah Wambui",
        subject: "English",
        phone: "0722334455",
        email: "sarah@edumanage.com",
        status: "Active"
    },
    {
        id: "T003",
        name: "Mr. Daniel Otieno",
        subject: "Science",
        phone: "0733445566",
        email: "daniel@edumanage.com",
        status: "Active"
    },
    {
        id: "T004",
        name: "Mrs. Lucy Achieng",
        subject: "History",
        phone: "0744556677",
        email: "lucy@edumanage.com",
        status: "Active"
    }
];

const defaultSubjects = [
    {
        name: "Mathematics",
        teacher: "Mr. James Kariuki",
        department: "Sciences",
        icon: "📐"
    },
    {
        name: "English",
        teacher: "Ms. Sarah Wambui",
        department: "Languages",
        icon: "📖"
    },
    {
        name: "Science",
        teacher: "Mr. Daniel Otieno",
        department: "Sciences",
        icon: "🔬"
    },
    {
        name: "History",
        teacher: "Mrs. Lucy Achieng",
        department: "Humanities",
        icon: "🏛️"
    },
    {
        name: "Geography",
        teacher: "Mr. Peter Maina",
        department: "Humanities",
        icon: "🌍"
    },
    {
        name: "Computer Studies",
        teacher: "Mr. Alex Kimani",
        department: "Technology",
        icon: "💻"
    }
];

const defaultAnnouncements = [
    {
        title: "Parent-Teacher Meeting",
        message: "Parents are reminded that the next parent-teacher meeting will take place on September 15th at 10:00 AM in the school hall.",
        date: "September 5, 2026"
    },
    {
        title: "Sports Day",
        message: "The annual school sports day will be held on September 20th. All students are encouraged to participate.",
        date: "September 3, 2026"
    },
    {
        title: "Mid-Term Examinations",
        message: "Mid-term examinations begin on September 27th. Students should prepare adequately.",
        date: "September 1, 2026"
    }
];

const defaultFees = [
    {
        student: "Brian Kamau",
        className: "Grade 10",
        total: 75000,
        paid: 75000
    },
    {
        student: "Amina Hassan",
        className: "Grade 9",
        total: 70000,
        paid: 55000
    },
    {
        student: "David Otieno",
        className: "Grade 11",
        total: 80000,
        paid: 80000
    },
    {
        student: "Grace Wanjiku",
        className: "Grade 8",
        total: 65000,
        paid: 40000
    },
    {
        student: "Kevin Mwangi",
        className: "Grade 12",
        total: 85000,
        paid: 85000
    }
];


/* =====================================================
   LOCAL STORAGE
===================================================== */

function getData(key, fallback) {
    const data = localStorage.getItem(key);

    if (!data) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
    }

    try {
        return JSON.parse(data);
    } catch {
        return fallback;
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

let students = getData("students", defaultStudents);
let teachers = getData("teachers", defaultTeachers);
let subjects = getData("subjects", defaultSubjects);
let announcements = getData("announcements", defaultAnnouncements);
let fees = getData("fees", defaultFees);

let collectedFees = Number(localStorage.getItem("collectedFees")) || 0;


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    setDate();

    setupNavigation();

    renderDashboard();
    renderStudents();
    renderTeachers();
    renderSubjects();
    renderAttendance();
    renderGrades();
    renderFees();
    renderAnnouncements();

    setupForms();
    setupSearch();

    document.getElementById("darkModeBtn")
        .addEventListener("click", toggleDarkMode);

    document.getElementById("menuToggle")
        .addEventListener("click", () => {
            document.getElementById("sidebar").classList.toggle("open");
        });

    document.getElementById("notificationBtn")
        .addEventListener("click", () => {
            showToast("You have 3 new notifications.");
        });

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
});


/* =====================================================
   DATE
===================================================== */

function setDate() {
    const dateElement = document.getElementById("dateText");

    const date = new Date();

    dateElement.textContent = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}


/* =====================================================
   NAVIGATION
===================================================== */

function setupNavigation() {
    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", event => {
            event.preventDefault();

            const page = link.dataset.page;

            showPage(page);

            document.querySelectorAll(".nav-link")
                .forEach(item => item.classList.remove("active"));

            link.classList.add("active");

            document.getElementById("sidebar")
                .classList.remove("open");
        });

    });
}

function showPage(page) {

    document.querySelectorAll(".page")
        .forEach(item => item.classList.remove("active-page"));

    const selectedPage = document.getElementById(page);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    const titles = {
        dashboard: "Dashboard",
        students: "Students",
        teachers: "Teachers",
        subjects: "Subjects",
        attendance: "Attendance",
        grades: "Grades & Results",
        fees: "School Fees",
        timetable: "Class Timetable",
        announcements: "Announcements"
    };

    document.getElementById("pageTitle").textContent =
        titles[page] || "Dashboard";
}


/* =====================================================
   DASHBOARD
===================================================== */

function renderDashboard() {

    document.getElementById("totalStudents").textContent =
        students.length;

    document.getElementById("totalTeachers").textContent =
        teachers.length;

    const totalCollected =
        fees.reduce((sum, fee) => sum + Number(fee.paid), 0)
        + collectedFees;

    document.getElementById("feesCollected").textContent =
        formatCurrency(totalCollected);

    document.getElementById("feeCollectedPage").textContent =
        formatCurrency(totalCollected);

    renderRecentStudents();

    const container =
        document.getElementById("dashboardAnnouncements");

    container.innerHTML = announcements
        .slice(0, 3)
        .map(item => `
            <div class="announcement">
                <h4>${escapeHTML(item.title)}</h4>
                <p>${escapeHTML(item.message)}</p>
                <small>${escapeHTML(item.date)}</small>
            </div>
        `)
        .join("");
}

function renderRecentStudents() {

    const container =
        document.getElementById("recentStudents");

    container.innerHTML = students
        .slice(-5)
        .reverse()
        .map(student => `
            <tr>
                <td>
                    <div class="student-cell">
                        <div class="student-avatar">
                            ${getInitials(student.firstName, student.lastName)}
                        </div>
                        <strong>
                            ${escapeHTML(student.firstName)}
                            ${escapeHTML(student.lastName)}
                        </strong>
                    </div>
                </td>

                <td>${escapeHTML(student.className)}</td>

                <td>${escapeHTML(student.gender)}</td>

                <td>
                    <span class="status active">
                        ${escapeHTML(student.status)}
                    </span>
                </td>
            </tr>
        `)
        .join("");
}


/* =====================================================
   STUDENTS
===================================================== */

function renderStudents(filter = "", classFilter = "all") {

    const table =
        document.getElementById("studentsTable");

    let filtered = students.filter(student => {

        const fullName =
            `${student.firstName} ${student.lastName}`.toLowerCase();

        const matchesSearch =
            fullName.includes(filter.toLowerCase()) ||
            student.id.toLowerCase().includes(filter.toLowerCase());

        const matchesClass =
            classFilter === "all" ||
            student.className === classFilter;

        return matchesSearch && matchesClass;
    });

    table.innerHTML = filtered.map(student => `
        <tr>

            <td>
                <strong>${escapeHTML(student.id)}</strong>
            </td>

            <td>
                <div class="student-cell">
                    <div class="student-avatar">
                        ${getInitials(student.firstName, student.lastName)}
                    </div>

                    <strong>
                        ${escapeHTML(student.firstName)}
                        ${escapeHTML(student.lastName)}
                    </strong>
                </div>
            </td>

            <td>${escapeHTML(student.gender)}</td>

            <td>${escapeHTML(student.className)}</td>

            <td>${escapeHTML(student.guardian)}</td>

            <td>${escapeHTML(student.phone)}</td>

            <td>
                <span class="status active">
                    ${escapeHTML(student.status)}
                </span>
            </td>

            <td>
                <button class="action-btn"
                    onclick="editStudent('${student.id}')">
                    ✏️
                </button>

                <button class="action-btn"
                    onclick="deleteStudent('${student.id}')">
                    🗑️
                </button>
            </td>

        </tr>
    `).join("");

    if (!filtered.length) {
        table.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;padding:30px;">
                    No students found.
                </td>
            </tr>
        `;
    }
}

function editStudent(id) {

    const student =
        students.find(item => item.id === id);

    if (!student) return;

    document.getElementById("firstName").value =
        student.firstName;

    document.getElementById("lastName").value =
        student.lastName;

    document.getElementById("gender").value =
        student.gender;

    document.getElementById("studentClass").value =
        student.className;

    document.getElementById("guardian").value =
        student.guardian;

    document.getElementById("phone").value =
        student.phone;

    const form =
        document.getElementById("studentForm");

    form.dataset.editing = id;

    document.querySelector("#studentModal .modal-header h2")
        .textContent = "Edit Student";

    document.querySelector("#studentForm .primary-btn")
        .textContent = "Update Student";

    openModal("studentModal");
}

function deleteStudent(id) {

    const student =
        students.find(item => item.id === id);

    if (!student) return;

    if (!confirm(`Delete ${student.firstName} ${student.lastName}?`)) {
        return;
    }

    students =
        students.filter(item => item.id !== id);

    saveData("students", students);

    renderStudents();
    renderDashboard();
    updateStudentDropdowns();

    showToast("Student deleted successfully.");
}


/* =====================================================
   TEACHERS
===================================================== */

function renderTeachers(filter = "") {

    const table =
        document.getElementById("teachersTable");

    const filtered =
        teachers.filter(teacher =>
            teacher.name.toLowerCase().includes(filter.toLowerCase()) ||
            teacher.subject.toLowerCase().includes(filter.toLowerCase())
        );

    table.innerHTML = filtered.map(teacher => `
        <tr>

            <td>${escapeHTML(teacher.id)}</td>

            <td>
                <div class="student-cell">
                    <div class="student-avatar">
                        ${getInitialsFromName(teacher.name)}
                    </div>

                    <strong>${escapeHTML(teacher.name)}</strong>
                </div>
            </td>

            <td>${escapeHTML(teacher.subject)}</td>

            <td>${escapeHTML(teacher.phone)}</td>

            <td>${escapeHTML(teacher.email)}</td>

            <td>
                <span class="status active">
                    ${escapeHTML(teacher.status)}
                </span>
            </td>

            <td>
                <button class="action-btn"
                    onclick="deleteTeacher('${teacher.id}')">
                    🗑️
                </button>
            </td>

        </tr>
    `).join("");
}

function deleteTeacher(id) {

    if (!confirm("Delete this teacher?")) return;

    teachers =
        teachers.filter(teacher => teacher.id !== id);

    saveData("teachers", teachers);

    renderTeachers();
    renderDashboard();

    showToast("Teacher deleted.");
}


/* =====================================================
   SUBJECTS
===================================================== */

function renderSubjects() {

    const container =
        document.getElementById("subjectsGrid");

    container.innerHTML = subjects.map(subject => `
        <div class="subject-card">

            <div class="subject-icon">
                ${subject.icon}
            </div>

            <h3>${escapeHTML(subject.name)}</h3>

            <p>
                Teacher: ${escapeHTML(subject.teacher)}
            </p>

            <span>
                ${escapeHTML(subject.department)}
            </span>

            <br><br>

            <button class="action-btn"
                onclick="deleteSubject('${escapeHTML(subject.name)}')">
                🗑️
            </button>

        </div>
    `).join("");
}

function deleteSubject(name) {

    if (!confirm("Delete this subject?")) return;

    subjects =
        subjects.filter(subject => subject.name !== name);

    saveData("subjects", subjects);

    renderSubjects();

    showToast("Subject deleted.");
}


/* =====================================================
   ATTENDANCE
===================================================== */

function renderAttendance() {

    const table =
        document.getElementById("attendanceTable");

    table.innerHTML = students.map(student => `
        <tr>

            <td>
                <div class="student-cell">
                    <div class="student-avatar">
                        ${getInitials(student.firstName, student.lastName)}
                    </div>

                    <strong>
                        ${escapeHTML(student.firstName)}
                        ${escapeHTML(student.lastName)}
                    </strong>
                </div>
            </td>

            <td>${escapeHTML(student.className)}</td>

            <td>

                <label>
                    <input type="radio"
                        name="attendance-${student.id}"
                        value="Present"
                        checked>
                    Present
                </label>

                &nbsp;&nbsp;

                <label>
                    <input type="radio"
                        name="attendance-${student.id}"
                        value="Absent">
                    Absent
                </label>

                &nbsp;&nbsp;

                <label>
                    <input type="radio"
                        name="attendance-${student.id}"
                        value="Late">
                    Late
                </label>

            </td>

        </tr>
    `).join("");
}

function saveAttendance() {

    const attendance = {};

    students.forEach(student => {

        const selected =
            document.querySelector(
                `input[name="attendance-${student.id}"]:checked`
            );

        if (selected) {
            attendance[student.id] = selected.value;
        }
    });

    saveData("attendance", attendance);

    showToast("Attendance saved successfully.");
}


/* =====================================================
   GRADES
===================================================== */

function renderGrades() {

    const table =
        document.getElementById("gradesTable");

    table.innerHTML = students.map((student, index) => {

        const math = [82, 76, 91, 68, 88][index % 5];
        const english = [79, 85, 87, 72, 90][index % 5];
        const science = [88, 81, 93, 75, 86][index % 5];

        const average =
            Math.round((math + english + science) / 3);

        return `
            <tr>

                <td>
                    <div class="student-cell">
                        <div class="student-avatar">
                            ${getInitials(student.firstName, student.lastName)}
                        </div>

                        <strong>
                            ${escapeHTML(student.firstName)}
                            ${escapeHTML(student.lastName)}
                        </strong>
                    </div>
                </td>

                <td>${math}%</td>
                <td>${english}%</td>
                <td>${science}%</td>
                <td><strong>${average}%</strong></td>

                <td>
                    <span class="status ${average >= 80 ? "active" : "pending"}">
                        ${getGrade(average)}
                    </span>
                </td>

            </tr>
        `;
    }).join("");
}

function getGrade(score) {

    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";

    return "E";
}


/* =====================================================
   FEES
===================================================== */

function renderFees() {

    const table =
        document.getElementById("feesTable");

    table.innerHTML = fees.map(fee => {

        const balance =
            fee.total - fee.paid;

        let status = "Pending";

        if (balance === 0) {
            status = "Paid";
        }

        return `
            <tr>

                <td>
                    <strong>${escapeHTML(fee.student)}</strong>
                </td>

                <td>${escapeHTML(fee.className)}</td>

                <td>${formatCurrency(fee.total)}</td>

                <td>${formatCurrency(fee.paid)}</td>

                <td>${formatCurrency(balance)}</td>

                <td>
                    <span class="status ${
                        status === "Paid"
                            ? "paid"
                            : "pending"
                    }">
                        ${status}
                    </span>
                </td>

            </tr>
        `;
    }).join("");
}


/* =====================================================
   ANNOUNCEMENTS
===================================================== */

function renderAnnouncements() {

    const container =
        document.getElementById("announcementList");

    container.innerHTML =
        announcements.map((item, index) => `
            <div class="announcement">

                <h3>${escapeHTML(item.title)}</h3>

                <p>
                    ${escapeHTML(item.message)}
                </p>

                <small>
                    📅 ${escapeHTML(item.date)}
                </small>

                <br>

                <button class="action-btn"
                    onclick="deleteAnnouncement(${index})">
                    🗑️
                </button>

            </div>
        `).join("");
}

function deleteAnnouncement(index) {

    if (!confirm("Delete this announcement?")) return;

    announcements.splice(index, 1);

    saveData("announcements", announcements);

    renderAnnouncements();
    renderDashboard();

    showToast("Announcement deleted.");
}


/* =====================================================
   FORMS
===================================================== */

function setupForms() {

    document.getElementById("studentForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const form = event.target;

            const editingId = form.dataset.editing;

            const studentData = {
                firstName:
                    document.getElementById("firstName").value.trim(),

                lastName:
                    document.getElementById("lastName").value.trim(),

                gender:
                    document.getElementById("gender").value,

                className:
                    document.getElementById("studentClass").value,

                guardian:
                    document.getElementById("guardian").value.trim(),

                phone:
                    document.getElementById("phone").value.trim(),

                status: "Active"
            };

            if (editingId) {

                const index =
                    students.findIndex(
                        student => student.id === editingId
                    );

                if (index !== -1) {

                    students[index] = {
                        ...students[index],
                        ...studentData
                    };
                }

                delete form.dataset.editing;

                document.querySelector(
                    "#studentModal .modal-header h2"
                ).textContent = "Add Student";

                document.querySelector(
                    "#studentForm .primary-btn"
                ).textContent = "Add Student";

                showToast("Student updated successfully.");

            } else {

                studentData.id =
                    generateStudentID();

                students.push(studentData);

                showToast("Student added successfully.");
            }

            saveData("students", students);

            form.reset();

            closeModal("studentModal");

            renderStudents();
            renderDashboard();
            renderAttendance();
            renderGrades();

            updateStudentDropdowns();
        });


    document.getElementById("teacherForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const teacher = {
                id: generateTeacherID(),

                name:
                    document.getElementById("teacherName")
                        .value.trim(),

                subject:
                    document.getElementById("teacherSubject")
                        .value.trim(),

                phone:
                    document.getElementById("teacherPhone")
                        .value.trim(),

                email:
                    document.getElementById("teacherEmail")
                        .value.trim(),

                status: "Active"
            };

            teachers.push(teacher);

            saveData("teachers", teachers);

            event.target.reset();

            closeModal("teacherModal");

            renderTeachers();
            renderDashboard();

            showToast("Teacher added successfully.");
        });


    document.getElementById("subjectForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const subject = {

                name:
                    document.getElementById("subjectName")
                        .value.trim(),

                teacher:
                    document.getElementById("subjectTeacher")
                        .value.trim(),

                department:
                    document.getElementById("subjectDepartment")
                        .value.trim(),

                icon: "📚"
            };

            subjects.push(subject);

            saveData("subjects", subjects);

            event.target.reset();

            closeModal("subjectModal");

            renderSubjects();

            showToast("Subject added successfully.");
        });


    document.getElementById("announcementForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const announcement = {

                title:
                    document.getElementById("announcementTitle")
                        .value.trim(),

                message:
                    document.getElementById("announcementMessage")
                        .value.trim(),

                date:
                    new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })
            };

            announcements.unshift(announcement);

            saveData("announcements", announcements);

            event.target.reset();

            closeModal("announcementModal");

            renderAnnouncements();
            renderDashboard();

            showToast("Announcement published.");
        });


    document.getElementById("paymentForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const studentName =
                document.getElementById("paymentStudent")
                    .value;

            const amount =
                Number(
                    document.getElementById("paymentAmount")
                        .value
                );

            if (!studentName || amount <= 0) {
                showToast("Enter valid payment details.");
                return;
            }

            const existing =
                fees.find(fee => fee.student === studentName);

            if (existing) {

                existing.paid += amount;

            } else {

                const student =
                    students.find(s =>
                        `${s.firstName} ${s.lastName}` === studentName
                    );

                fees.push({
                    student: studentName,
                    className: student
                        ? student.className
                        : "Unknown",
                    total: amount,
                    paid: amount
                });
            }

            collectedFees += amount;

            localStorage.setItem(
                "collectedFees",
                collectedFees
            );

            saveData("fees", fees);

            event.target.reset();

            closeModal("paymentModal");

            renderFees();
            renderDashboard();

            showToast(
                `${formatCurrency(amount)} payment recorded.`
            );
        });


    document.getElementById("gradeForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            closeModal("gradeModal");

            showToast("Grade saved successfully.");
        });
}


/* =====================================================
   SEARCH
===================================================== */

function setupSearch() {

    document.getElementById("studentSearch")
        .addEventListener("input", event => {

            const classFilter =
                document.getElementById("classFilter").value;

            renderStudents(
                event.target.value,
                classFilter
            );
        });


    document.getElementById("classFilter")
        .addEventListener("change", event => {

            const search =
                document.getElementById("studentSearch").value;

            renderStudents(
                search,
                event.target.value
            );
        });


    document.getElementById("teacherSearch")
        .addEventListener("input", event => {

            renderTeachers(event.target.value);
        });
}


/* =====================================================
   DROPDOWNS
===================================================== */

function updateStudentDropdowns() {

    const gradeDropdown =
        document.getElementById("gradeStudent");

    const paymentDropdown =
        document.getElementById("paymentStudent");

    const options = students.map(student => {

        const name =
            `${student.firstName} ${student.lastName}`;

        return `
            <option value="${escapeHTML(name)}">
                ${escapeHTML(name)}
            </option>
        `;
    }).join("");

    gradeDropdown.innerHTML = options;

    paymentDropdown.innerHTML = options;
}


/* =====================================================
   MODALS
===================================================== */

function openModal(id) {

    updateStudentDropdowns();

    document.getElementById(id)
        .classList.add("show");
}

function closeModal(id) {

    document.getElementById(id)
        .classList.remove("show");
}

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

});


/* =====================================================
   DARK MODE
===================================================== */

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "theme",
        dark ? "dark" : "light"
    );

    showToast(
        dark
            ? "Dark mode enabled."
            : "Light mode enabled."
    );
}


/* =====================================================
   UTILITIES
===================================================== */

function generateStudentID() {

    const number =
        students.length + 1;

    return `ST${String(number).padStart(3, "0")}`;
}

function generateTeacherID() {

    const number =
        teachers.length + 1;

    return `T${String(number).padStart(3, "0")}`;
}

function getInitials(firstName, lastName) {

    return (
        firstName.charAt(0) +
        lastName.charAt(0)
    ).toUpperCase();
}

function getInitialsFromName(name) {

    return name
        .split(" ")
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();
}

function formatCurrency(amount) {

    return "KES " +
        Number(amount).toLocaleString("en-KE");
}

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showToast(message) {

    const toast =
        document.getElementById("toast");

    document.getElementById("toastMessage")
        .textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


/* =====================================================
   INITIAL DROPDOWNS
===================================================== */

setTimeout(() => {
    updateStudentDropdowns();
}, 100);
```
