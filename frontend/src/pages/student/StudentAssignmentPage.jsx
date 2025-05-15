import { useLocation, useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import supabase from "../../supabase";
import "../../css/StudentHomePage.css";
import "../../css/StudentAssignmentPage.css";

function StudentAssignmentPage() {
  const { id } = useParams(); // Assignment ID
  const location = useLocation();
  const navigate = useNavigate(); // Added useNavigate

  const { classId, content, fileUrl, due_date, course_code } = location.state || {};

  const [classInfo, setClassInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false); // Track if file is uploaded
  const [regId, setRegId] = useState(null); // reg_id state to store the student's reg_id
  const [optionsVisible, setOptionsVisible] = useState(false);

  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };

  // Fetch class info
  useEffect(() => {
    const fetchClassInfo = async () => {
      if (!classId) return;

      const { data, error } = await supabase
        .from("classes")
        .select("name, course_code")
        .eq("id", classId)
        .single();

      if (!error) {
        setClassInfo(data);
      } else {
        console.error("Error fetching class info:", error.message);
      }
    };

    fetchClassInfo();
  }, [classId]);

  useEffect(() => {
    const fetchProfile = async () => {
      // Get the logged-in user from supabase
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("User not logged in or error fetching user");
        return;
      }

      const user = data.user;

      // Fetch reg_id from the "profiles" table based on the logged-in user
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("reg_id")
        .eq("id", user.id) // Assuming user.id matches the profiles table "id"
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
        return;
      }

      if (profileData) {
        setRegId(profileData.reg_id); // Set reg_id here
      } else {
        console.error("No reg_id found in profile data.");
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  /*const handleFileUpload = async () => {
    if (!selectedFile) return;
  
    setUploading(true);
  
    const fileName = `${regId}-${selectedFile.name}`;
    const filePath = `${classId}/${fileName}`;
  
    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from("assignments")
      .upload(filePath, selectedFile);
  
    if (error) {
      console.error("Error uploading file:", error.message);
      setUploading(false);
      return;
    }
  
    console.log("File uploaded successfully:", data);
  
    // After successful upload, set fileUploaded to true
    setFileUploaded(true);
  
    // Update the file URL in the "assignments" table or wherever necessary
    const { error: updateError } = await supabase
      .from("assignments")
      .update({ file_url: data.path })
      .eq("id", id);
  
    if (updateError) {
      console.error("Error updating file URL in assignments table:", updateError.message);
      setUploading(false);
      return;
    }
  
    // Now update the assignments_submissions table
    const { error: submissionError } = await supabase
  .from("assignment_submissions")
  .upsert({
    assignment_id: id,        // Use the assignment ID
    reg_id: regId,            // Student's reg_id
    file_url: data.path,      // URL of the uploaded file
    course_code: course_code, // Include course_code if required
    class_id: classId,        // Include class_id if required
    created_at: new Date().toISOString(), // Set the timestamp for the submission
  });

if (submissionError) {
  console.error("Error updating assignment_submissions table:", submissionError.message);
} else {
  console.log("Assignment submission updated successfully.");
}
    if (submissionError) {
      console.error("Error updating assignment_submissions table:", submissionError.message);
    } else {
      console.log("Assignments submission record updated successfully.");
    }
  
    setUploading(false);
  };*/

  const handleFileUpload = async () => {
    if (!selectedFile) return;
  
    setUploading(true);
  
    const fileName = `${regId}-${selectedFile.name}`;
    const filePath = `${classId}/${fileName}`;
  
    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from("assignments")
      .upload(filePath, selectedFile);
  
    if (error) {
      console.error("Error uploading file:", error.message);
      setUploading(false);
      return;
    }
  
    console.log("File uploaded successfully:", data);
  
    // Generate public URL for the uploaded file
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("assignments")
      .getPublicUrl(data.path);
  
    if (urlError) {
      console.error("Error generating public URL:", urlError.message);
      setUploading(false);
      return;
    }
  
    const fullFileUrl = publicUrlData.publicUrl;
  
    // After successful upload, set fileUploaded to true
    setFileUploaded(true);
  
    // Update the file URL in the "assignments" table or wherever necessary
    const { error: updateError } = await supabase
      .from("assignments")
      .update({ file_url: fullFileUrl })  // Use full URL here
      .eq("id", id);
  
    if (updateError) {
      console.error("Error updating file URL in assignments table:", updateError.message);
      setUploading(false);
      return;
    }
  
    // Now update the assignments_submissions table with full URL
    const { error: submissionError } = await supabase
      .from("assignment_submissions")
      .upsert({
        assignment_id: id,
        reg_id: regId,
        file_url: fullFileUrl,     // Use full URL here too
        course_code: course_code,
        class_id: classId,
        created_at: new Date().toISOString(),
      });
  
    if (submissionError) {
      console.error("Error updating assignment_submissions table:", submissionError.message);
    } else {
      console.log("Assignment submission updated successfully.");
    }
  
    setUploading(false);
  };
  
  
  const renderFilePreview = (url) => {
    if (!url) return null;

    const fileExtension = url.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
      return (
        <div className="file-preview-container">
          <img src={url} alt="Assignment Preview" className="preview-image" />
        </div>
      );
    }

    if (fileExtension === 'pdf') {
      return (
        <div className="file-preview-container">
          <embed src={url} width="100%" height="400px" />
        </div>
      );
    }

    return null; // For unsupported file types
  };
    
  return (
    <div className="class-app-container">
      <nav className="dashboard">
        <h1 className="dashboard-title">
          {classInfo.name
            ? `${classInfo.name} - ${classInfo.course_code}`
            : `Class ${classId}`}
        </h1>
        <button className="dots-button" onClick={toggleOptions}>
          <BsThreeDotsVertical className="three-dots-icon" />
        </button>
      </nav>

      <div className="assignment-card">
        <p><strong>Content:</strong> {content}</p>

        {renderFilePreview(fileUrl)}

        <p>
          <strong>File:</strong>{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View Full File
          </a>
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {due_date ? new Date(due_date).toLocaleString() : "Not specified"}
        </p>

        <hr />

        <div className="assignment-upload">
          <label><strong>Upload Your Assignment:</strong></label>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload} disabled={uploading}>
            {fileUploaded
              ? uploading
                ? "Updating..."
                : "Update Submission"
              : uploading
              ? "Uploading..."
              : "Submit Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentAssignmentPage;
