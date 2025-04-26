import { useEffect, useState } from "react";
import supabase from "../../supabase";
import "../../css/StudentHomePage.css";
import { Link } from "react-router-dom";

function StudentHomePage() {
  const [classes, setClasses] = useState([]);
  const [userBranch, setUserBranch] = useState(null);

  // Step 1: Fetch the logged-in student's branch
  const fetchUserBranch = async () => {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("branch")
      .eq("email", user?.user?.email)  // using email to match profile
      .single(); // because only one profile per user

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return;
    }

    setUserBranch(profile.branch);
  };

  // Step 2: Fetch classes for the user's branch
  const fetchClasses = async (branch) => {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("branch", branch); // only classes with matching branch

    if (error) console.error("Error fetching classes:", error);
    else setClasses(data);
  };

  useEffect(() => {
    const init = async () => {
      await fetchUserBranch();
    };
    init();
  }, []);

  useEffect(() => {
    if (userBranch) {
      fetchClasses(userBranch);

      const subscription = supabase
        .channel("classes_realtime")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "classes" },
          () => {
            fetchClasses(userBranch);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [userBranch]);

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
