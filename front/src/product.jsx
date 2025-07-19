import { style } from "./style.ts";
import React, { useEffect, useState } from "react";

const ALL_PRODUCTS = [
    { id: 1, name: "product one" },
    { id: 2, name: "product two" },
    { id: 3, name: "product three" },
    { id: 4, name: "product four" },
    { id: 5, name: "product five" },
    { id: 6, name: "product six" },
    { id: 7, name: "product seven" },
    { id: 8, name: "product eight" },
    { id: 9, name: "product nine" },
    { id: 10, name: "product ten" },
    { id: 11, name: "product eleven" },
    { id: 12, name: "product twelve" },
];

export default function App() {
    // State to hold products visible based on search filter
    const [visibleProducts, setVisibleProducts] = useState(ALL_PRODUCTS);
    // State for the shopping cart, initialized from localStorage
    const [cart, setCart] = useState(() => {
        const getCart = localStorage.getItem("cart");
        return getCart ? JSON.parse(getCart) : [];
    });
    // State for the search input
    const [search, setSearch] = useState("");

    // Effect to persist cart data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]); // Dependency array ensures this runs only when 'cart' changes

    // Function to add a product to the cart

    function handleToCart(productId) {
        const productToCart = ALL_PRODUCTS.find(
            (product) => product.id === productId,
        );

        setCart((prevCart) => {
            // Check if the product is already in the cart to prevent duplicates
            const isInCart = prevCart.some(
                (product) => product.id === productId,
            );

            if (isInCart) {
                return prevCart; // If already in cart, return previous state
            }

            // Add the new product to the cart
            const updatedCart = [...prevCart, productToCart];
            return updatedCart;
        });
    }

    // Effect to filter products based on search input
    useEffect(() => {
        const searchedProduct = ALL_PRODUCTS.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase()),
        );
        setVisibleProducts(searchedProduct);
    }, [search]); // Dependency array ensures this runs when 'search' changes

    // Function to remove a product from the cart
    function handleRemoveCart(productId) {
        const filtered = cart.filter(
            (productInCart) => productInCart.id !== productId,
        );
        setCart(filtered);
    }

    return (
        <div className="min-h-screen bg-gray-300 p-16 m-16 ">
            {/* Our Products Section */}
            {visibleProducts.length !== 0 ? (
                <ul className="grid grid-cols-2 lg:grid-cols-5  gap-8">
                    {visibleProducts.map((product) => (
                        <li
                            key={product.id}
                            className="bg-gray-100 flex flex-col items-center"
                        >
                            <img src="/image copy.png" alt="" />
                            <span className="text-lg font-medium">
                                <a
                                    href="https://www.example.com/another/long/url"
                                    className="inline-block w-48 truncate text-purple-600 hover:underline"
                                    title="Another long URL example"
                                >
                                    This link is forced to be exactly 48
                                    Tailwind units wide before truncating.
                                </a>
                            </span>
                            <span>price</span>

                            <button
                                onClick={() => {
                                    handleToCart(product.id);
                                }}
                            >
                                <span className="block sm:hidden md:hidden">
                                    to cart
                                </span>
                                <span className="hidden sm:block">
                                    add to cart
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found matching your search.</p>
            )}
        </div>
    );
}
