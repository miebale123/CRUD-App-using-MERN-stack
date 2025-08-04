import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import "./index.css"; // Tailwind

export default function BubbleSortVisualizer() {
    const initialValues = [7, 3, 9, 2, 5];
    const [values, setValues] = useState(initialValues);
    const [comparing, setComparing] = useState([-1, -1]);
    const containerRef = useRef(null);
    const barRefs = useRef([]);

    // Animate position changes
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            barRefs.current.forEach((el) => {
                if (!el) return;
                const bounds = el.getBoundingClientRect();
                el.dataset.prevLeft = bounds.left;
            });
        }, containerRef);

        return () => ctx.revert();
    }, [values]);

    useLayoutEffect(() => {
        barRefs.current.forEach((el) => {
            if (!el) return;
            const prevLeft = parseFloat(el.dataset.prevLeft) || 0;
            const newLeft = el.getBoundingClientRect().left;
            const delta = prevLeft - newLeft;

            gsap.fromTo(
                el,
                { x: delta },
                { x: 0, duration: 5, ease: "power2.out" },
            );
        });
    }, [values]);

    async function bubbleSort() {
        const arr = [...values];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                setComparing([j, j + 1]);
                await delay(5000);

                if (arr[j] > arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setValues([...arr]);
                    await delay(5000);
                }
            }
        }
        setComparing([-1, -1]);
    }

    async function insertionSort() {
        const arr = [...values];
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;

            while (j >= 0 && arr[j] > key) {
                setComparing([j, j + 1]);
                await delay(1000);

                arr[j + 1] = arr[j];
                j--;
                setValues([...arr]);
                await delay(1000);
            }
            arr[j + 1] = key;
            setValues([...arr]);
            await delay(1000);
        }
        setComparing([-1, -1]);
    }

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    return (
        <div className="min-h-screen bg-gradient-to-tr from-sky-900 to-indigo-800 flex flex-col items-center justify-center px-4 py-8 text-white font-mono">
            <div className="flex gap-4 mt-6">
                <button
                    onClick={bubbleSort}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
                >
                    Bubble Sort
                </button>

                <button
                    onClick={insertionSort}
                    className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 transition"
                >
                    Insertion Sort
                </button>
            </div>

            <h1 className="text-3xl mb-6 font-bold tracking-wider">
                🔁 Bubble Sort Visualizer
            </h1>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg w-full max-w-xl">
                <div className="flex justify-between text-sm mb-4 text-gray-300">
                    <div>
                        Comparing:{" "}
                        {comparing[0] !== -1
                            ? `${comparing[0]} and ${comparing[1]}`
                            : "None"}
                    </div>
                    <div>Array: [{values.join(", ")}]</div>
                </div>

                {/* Bar Container */}
                <div
                    className="relative flex gap-4 justify-center h-64 items-end"
                    ref={containerRef}
                >
                    {values.map((val, i) => (
                        <div
                            key={val + "-" + i}
                            ref={(el) => (barRefs.current[i] = el)}
                            className={`absolute bottom-0 w-10 rounded-t-md flex justify-center items-end text-xs font-bold ${
                                comparing.includes(i)
                                    ? "bg-yellow-400"
                                    : "bg-teal-500"
                            }`}
                            style={{
                                height: `${val * 20}px`,
                                left: `${i * 56}px`, // 40 width + 16px gap
                            }}
                        >
                            {val}
                        </div>
                    ))}
                </div>

                <button
                    onClick={bubbleSort}
                    className="mt-6 w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold tracking-wide"
                >
                    Start Sorting
                </button>
            </div>

            <footer className="mt-6 text-sm text-gray-400">
                Made with 💚 React + GSAP + Tailwind
            </footer>
        </div>
    );
}
