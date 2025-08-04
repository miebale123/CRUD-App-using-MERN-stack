import React, { useEffect, useState } from "react";
import { style } from "./style";

export default function App({ currentUser }) {
    const [allCourses, setAllCourses] = useState([]);
    const [visibleCourses, setVisibleCourses] = useState([]);
    const [dashboard, setDashboard] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch("http://localhost:5000/courses");
                if (!response.ok) throw new Error("Failed to fetch courses");
                const data = await response.json();
                setAllCourses(data);
                setVisibleCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }
        fetchCourses();
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        async function fetchDashboard() {
            try {
                const response = await fetch("http://localhost:5000/dashboard");
                if (!response.ok) throw new Error("Failed to load dashboard");
                const data = await response.json();
                setDashboard(data);
            } catch (err) {
                console.error("Failed to load dashboard:", err);
            }
        }
        fetchDashboard();
    }, [currentUser]);

    async function handleToDashboard(courseId) {
        const courseToDashboard = allCourses.find(
            (course) => course._id === courseId,
        );
        const alreadyInDashboard = dashboard.some(
            (course) => course.courseId === courseId,
        );
        if (alreadyInDashboard) return;

        try {
            const response = await fetch("http://localhost:5000/dashboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseId: courseToDashboard._id,
                    courseName: courseToDashboard.name,
                }),
            });
            if (!response.ok) {
                const error = await response.json();
                console.error("Failed to add:", error.message);
                return;
            }
            const newItem = await response.json();
            setDashboard((prev) => [...prev, newItem]);
        } catch (error) {
            console.error("Error adding to dashboard:", error);
        }
    }

    useEffect(() => {
        const searchedCourse = allCourses.filter((course) =>
            course.name.toLowerCase().includes(search.toLowerCase()),
        );
        setVisibleCourses(searchedCourse);
    }, [search, allCourses]);

    function handleRemoveDashboard(courseId) {
        const filtered = dashboard.filter(
            (courseInDashboard) => courseInDashboard.courseId !== courseId,
        );
        setDashboard(filtered);
    }

    return (
        <div className="min-h-screen bg-gray-300 p-16 m-16 flex flex-col">
            <span className={style.habeshaText}>
                Birhan Academy! Welcome, {currentUser}
            </span>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses"
                className={style.search}
            />
            {visibleCourses.length !== 0 ? (
                <ul className="grid grid-cols-2 lg:grid-cols-5 gap-8">
                    {visibleCourses.map((course) => (
                        <li
                            key={course._id}
                            className="bg-gray-100 flex flex-col items-center"
                        >
                            <span className="text-lg font-medium">
                                <a
                                    href="#"
                                    className="inline-block w-48 truncate text-purple-600 hover:underline"
                                    title={course.name}
                                >
                                    {course.name}
                                </a>
                            </span>
                            <span>{"course definition"}</span>
                            <button
                                onClick={() => handleToDashboard(course._id)}
                            >
                                <span className="block sm:hidden md:hidden">
                                    to dashboard
                                </span>
                                <span className="hidden sm:block">
                                    add to dashboard
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No courses found matching your search.</p>
            )}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-12">
                <span className="text-2xl font-semibold text-gray-800 mb-4 block">
                    Your Dashboard
                </span>
                {dashboard.length > 0 ? (
                    <ul className="space-y-4">
                        {dashboard.map((item) => (
                            <li
                                key={item._id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                    <span className="text-lg font-medium text-gray-900">
                                        {item.courseName}
                                    </span>
                                    <span className="text-md text-gray-600">
                                        course definition
                                    </span>
                                </div>
                                <button
                                    onClick={() =>
                                        handleRemoveDashboard(item.courseId)
                                    }
                                    className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors duration-200 text-sm font-bold shadow-md"
                                    aria-label={`Remove ${item.courseName} from dashboard`}
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 text-lg py-8">
                        Your dashboard is empty.
                    </p>
                )}
            </div>
        </div>
    );
}
