import { useEffect, useState } from "react";
import supabase from "../../supabase";
import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";

function TeacherHomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classCode, setClassCode] = useState("");
  const [className, setClassName] = useState("");
  const [activeOptionsId, setActiveOptionsId] = useState(null);
  const [teacherRegId, setTeacherRegId] = useState(null);

  const fetchClasses = async (regId) => {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("reg_id", regId);
    if (error) console.error("Error fetching classes:", error);
    else setClasses(data);
  };

  useEffect(() => {
    const fetchTeacherData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }

      if (!user) {
        console.error("No user logged in.");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("reg_id")
        .eq("email", user.email)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
        return;
      }

      setTeacherRegId(profileData.reg_id);
      fetchClasses(profileData.reg_id);
    };

    fetchTeacherData();

    const subscription = supabase
      .channel("classes_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "classes" }, (payload) => {
        if (teacherRegId) {
          fetchClasses(teacherRegId);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [teacherRegId]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsModalOpen(false);
    }
  };

  const addClass = async () => {
    if (classCode.trim() && className.trim() && teacherRegId) {
      const { data, error } = await supabase
        .from("classes")
        .insert([{ name: className, description: classCode, reg_id: teacherRegId }])
        .select();

      if (error) {
        console.error("Insert error:", error);
        return;
      }

      setClasses((prev) => [...prev, ...data]);
      setClassCode("");
      setClassName("");
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (cls) => {
    const { error } = await supabase
      .from("classes")
      .delete()
      .eq("id", cls.id);

    if (error) {
      console.error("Delete error:", error);
    } else {
      setClasses(classes.filter((c) => c.id !== cls.id));
      setActiveOptionsId(null);
    }
  };

  return (
    <div className="app-container">
      <TeacherSidebar/>

      <div className="class-grid">
        {classes.map((cls) => (
          <div key={cls.id} className="class-card">
            <div className="class-card-content">
              <div className="class-card-thumb" />
              <div className="class-card-text">
                <div className="class-card-header">
                  <h2>{cls.name}</h2>
                  <div className="menu-wrapper">
                    <div
                      className="menu-icon"
                      onClick={() =>
                        setActiveOptionsId(activeOptionsId === cls.id ? null : cls.id)
                      }
                    >
                      ⋮
                    </div>
                    {activeOptionsId === cls.id && (
                      <div className="popup-modal">
                        <button
                          className="option-btn delete-btn"
                          onClick={() => handleDelete(cls)}
                        >
                          🗑️ Delete Class
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p>{cls.description}</p>
                <Link
                  to={`/teacher/classroom/class/${cls.id}`}
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal">
            <h2>Add Class</h2>
            <input
              type="text"
              placeholder="Class Code"
              className="modal-input"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Class Name"
              className="modal-input"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <button className="modal-button" onClick={addClass}>Add Class</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherHomePage;
