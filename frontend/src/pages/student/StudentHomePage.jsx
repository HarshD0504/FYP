import { useEffect, useState } from "react";
import supabase from "../../supabase";
import { Link } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

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
      <StudentSidebar/>

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

const styles = {
  appContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    paddingLeft: "220px", // Sidebar space
    paddingTop: "30px",
    paddingRight: "30px",
  },
  classGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    width: "100%",
    padding: "20px",
  },
  classCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    overflow: "hidden",
  },
  classCardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  classCardThumb: {
    height: "150px",
    backgroundColor: "#e0e0e0",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  classCardText: {
    padding: "20px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  classCardHeader: {
    marginBottom: "10px",
  },
  classTitle: {
    fontSize: "1.4rem",
    margin: 0,
    color: "#333",
  },
  classDescription: {
    flexGrow: 1,
    fontSize: "0.95rem",
    color: "#666",
    marginBottom: "15px",
  },
  classLink: {
    marginTop: "auto",
    alignSelf: "flex-start",
    color: "#4CAF50",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "0.95rem",
  },
};

export default StudentHomePage;
