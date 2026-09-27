import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
  const { data, error } = await supabase
    .from("Courses")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);
  console.log("NUMBER OF COURSES:", data?.length);

  setCourses(data || []);
}

  async function registerCourse(courseId) {
    const { error } = await supabase
      .from("Registrations")
      .insert([
        {
          student_name: "Eshaan",
          student_email: "student@example.com",
          course_id: courseId
        }
      ]);

    if (error) {
      console.error("Registration failed:", error);
      alert("Registration failed: " + error.message);
    } else {
      alert("Course registered successfully!");
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Student Course Registration
      </h1>

      <p style={styles.subtitle}>
        Available Courses
      </p>

      {courses.length === 0 ? (
        <p style={styles.message}>
          No courses available.
        </p>
      ) : (
        <div style={styles.courseContainer}>
          {courses.map((course) => (
            <div key={course.id} style={styles.card}>
              <h2>{course.course_name}</h2>

              <p>
                <strong>Course Code:</strong> {course.course_code}
              </p>

              <p>
                <strong>Instructor:</strong> {course.instructor}
              </p>

              <p>
                <strong>Credits:</strong> {course.credits}
              </p>

              <button
                style={styles.button}
                onClick={() => registerCourse(course.id)}
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh"
  },

  heading: {
    textAlign: "center",
    color: "#222"
  },

  subtitle: {
    textAlign: "center",
    fontSize: "20px",
    marginBottom: "30px"
  },

  message: {
    textAlign: "center"
  },

  courseContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center"
  },

  card: {
    backgroundColor: "white",
    padding: "20px",
    width: "280px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
  },

  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default App;