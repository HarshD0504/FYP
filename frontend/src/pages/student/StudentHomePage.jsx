import { useEffect, useState } from "react";
import supabase from "../../supabase";
import "../../css/StudentHomePage.css";
import { Link } from "react-router-dom";

function StudentHomePage() {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    const { data, error } = await supabase.from("classes").select("*");
    if (error) console.error("Error fetching classes:", error);
    else setClasses(data);
  };

  useEffect(() => {
    fetchClasses();
    const subscription = supabase
      .channel("classes_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "classes" }, () => {
        fetchClasses();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="app-container">
      <nav className="dashboard">
        <h1 className="dashboard-title">Student Classroom</h1>
      </nav>

      <div className="class-grid">
        {classes.map((cls) => (
          <div key={cls.id} className="class-card">
            <div className="class-card-content">
              <div className="class-card-thumb" />
              <div className="class-card-text">
                <div className="class-card-header">
                  <h2>{cls.name}</h2>
                </div>
                <p>{cls.description}</p>
                <Link
                  to={`/student/classroom/class/${cls.id}`}
                  state={{ name: cls.name, description: cls.description }}
                  className="class-link"
                >
                  View Class →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentHomePage;
