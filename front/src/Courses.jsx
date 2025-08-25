import { useEffect, useState } from "react";
import { style } from "./style";

export default function Products({ currentUser }) {
    const [allProducts, setAllProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [dashboard, setDashboard] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:5000/products");
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                setAllProducts(data);
                setVisibleProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
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

    async function handleToDashboard(productId) {
        const productToDashboard = allProducts.find(
            (product) => product._id === productId,
        );
        const alreadyInDashboard = dashboard.some(
            (product) => product.productId === productId,
        );
        if (alreadyInDashboard) return;

        try {
            const response = await fetch("http://localhost:5000/dashboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: productToDashboard._id,
                    productName: productToDashboard.name,
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
        const searchedProduct = allProducts.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase()),
        );
        setVisibleProducts(searchedProduct);
    }, [search, allProducts]);

    function handleRemoveDashboard(productId) {
        const filtered = dashboard.filter(
            (productInDashboard) => productInDashboard.productId !== productId,
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
                placeholder="Search products"
                className={style.search}
            />
            {visibleProducts.length !== 0 ? (
                <ul className="grid grid-cols-2 lg:grid-cols-5 gap-8">
                    {visibleProducts.map((product) => (
                        <li
                            key={product._id}
                            className="bg-gray-100 flex flex-col items-center"
                        >
                            <span className="text-lg font-medium">
                                <a
                                    href="#"
                                    className="inline-block w-48 truncate text-purple-600 hover:underline"
                                    title={Product.name}
                                >
                                    {product.name}
                                </a>
                            </span>
                            <span>{"product definition"}</span>
                            <button
                                onClick={() => handleToDashboard(product._id)}
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
                <p>No products found matching your search.</p>
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
                                        {item.productName}
                                    </span>
                                    <span className="text-md text-gray-600">
                                        product definition
                                    </span>
                                </div>
                                <button
                                    onClick={() =>
                                        handleRemoveDashboard(item.productId)
                                    }
                                    className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors duration-200 text-sm font-bold shadow-md"
                                    aria-label={`Remove ${item.productName} from dashboard`}
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
