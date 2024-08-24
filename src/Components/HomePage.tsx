import { useState, useEffect } from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";
import CourseCard from "./CourseCard";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Typography } from "@mui/material";
import defaultCourse from "../assets/defaultCourse.png";

// Define a type for a single course
interface Course {
  image: string;
  courseCode: string;
  courseName: string;
}

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]); // Specify the type as Course[]

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set isLoggedIn to true if user is logged in, false otherwise
    });

    // Simulating fetching courses from database
    // Replace this with your actual fetching logic
    const fetchedCourses: Course[] = [
      {
        image: defaultCourse,
        courseCode: "BCSE101L",
        courseName: "Introduction to Computer Science",
      },
      {
        image: defaultCourse,
        courseCode: "BMAT101L",
        courseName: "Introduction to Mathematics",
      },
      // Add more courses as needed
    ];

    setCourses(fetchedCourses);

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Redirect to login page after logout
        window.location.reload(); // Reloading the page to ensure a fresh start
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <>
      <div
        style={{
          marginTop: "6%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: "6%" }}>
          My Courses
        </Typography>
        <NavBar
          setCurrentPage={isLoggedIn ? handleLogout : () => {}}
          navItems={[]}
          isLoggedIn={true}
        ></NavBar>
        <div>
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              image={course.image}
              courseCode={course.courseCode}
              courseName={course.courseName}
              onClick={() => {
                // Handle click event if needed
              }}
            />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
