import { useEffect, useState } from "react";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/tasks")
            .then((res) => res.json())
            .then(setTasks);
    }, []);

    const addTask = async () => {
        const res = await fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });
        const newTask = await res.json();
        setTasks([...tasks, { _id: newTask.insertedId, title }]);
        setTitle("");
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
        setTasks(tasks.filter((t) => t._id !== id));
    };

    const startEdit = (task) => {
        setEditingId(task._id);
        setEditingText(task.title);
    };

    const updateTask = async () => {
        await fetch(`http://localhost:3001/tasks/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: editingText }),
        });
        setTasks(
            tasks.map((t) =>
                t._id === editingId ? { ...t, title: editingText } : t,
            ),
        );
        setEditingId(null);
        setEditingText("");
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Task Manager</h1>
            <div className="flex gap-2 mb-4">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border px-2 py-1 flex-1"
                    placeholder="New task"
                />
                <button
                    onClick={addTask}
                    className="bg-blue-500 text-white px-4 rounded"
                >
                    Add
                </button>
            </div>

            <ul>
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className="mb-2 flex justify-between items-center"
                    >
                        {editingId === task._id ? (
                            <div className="flex gap-2 w-full">
                                <input
                                    value={editingText}
                                    onChange={(e) =>
                                        setEditingText(e.target.value)
                                    }
                                    className="border px-2 py-1 flex-1"
                                />
                                <button
                                    onClick={updateTask}
                                    className="bg-green-500 text-white px-3 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="flex-1">{task.title}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEdit(task)}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="text-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
