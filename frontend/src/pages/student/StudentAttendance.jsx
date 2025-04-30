import React, { useEffect, useState } from "react";
import supabase from "../../supabase"; // Adjust if needed
import StudentSidebar from "./StudentSidebar";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const StudentAttendance = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Auth error:", authError?.message);
        return;
      }

      // Fetch student's branch and year from profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("branch, year")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        console.error("Error fetching profile:", profileError?.message);
        return;
      }

      const { branch, year } = profile;

      // Fetch classes where branch and year match
      const { data: classes, error: classesError } = await supabase
        .from("classes")
        .select("name, course_code")
        .eq("branch", branch)
        .eq("year", year);

      if (classesError) {
        console.error("Error fetching classes:", classesError.message);
        return;
      }

      // Assign dummy attendance data
      const subjectsWithAttendance = classes.map((cls, index) => ({
        id: index + 1,
        name: cls.name,
        code: cls.course_code,
        attendancePercent: 80 + (index % 5) * 5, // dummy
        classesAttended: 32 + (index % 3),        // dummy
        totalClasses: 40,                         // dummy
      }));

      setSubjects(subjectsWithAttendance);
    };

    fetchEnrolledClasses();
  }, []);

  return (
    <div style={styles.container}>
      <StudentSidebar />
      <div style={styles.content}>
        <h2 style={styles.heading}>SUBJECT-WISE ATTENDANCE</h2>
        <div style={styles.cardsContainer}>
          {subjects.map((subject) => (
            <div key={subject.id} style={styles.card}>
              <h4>
                {subject.name} ({subject.code})
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Attended",
                        value: subject.classesAttended,
                      },
                      {
                        name: "Missed",
                        value: subject.totalClasses - subject.classesAttended,
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    label
                  >
                    <Cell fill="#4CAF50" />
                    <Cell fill="#FF5722" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <p>{subject.attendancePercent}% Attendance</p>
              <p>
                {subject.classesAttended} out of {subject.totalClasses} classes
                attended
              </p>
              <button
                style={styles.button}
                onClick={() =>
                  (window.location.href = `/subject/${subject.code}/report`)
                }
              >
                Date-Wise Attendance Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    marginLeft: "200px",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    paddingBottom: "50px",
    textAlign: "center",
    maxWidth: "1100px",
  },
  heading: {
    marginBottom: "30px",
    color: "#333",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    paddingBottom: "20px",
    textAlign: "center",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default StudentAttendance;

