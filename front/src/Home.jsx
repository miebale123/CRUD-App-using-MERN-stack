import { useEffect, useState } from "react";

export default function Home({ token }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // const logToken = () => console.log(token);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("http://localhost:5000/", {
                method: "GET",
            });
            const data = await res.json();
            setProducts(data.products);
        };

        fetchProducts();
    }, []);

    const addToCart = async (e, productId) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/addToCart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: productId,
                token: token,
            }),
        });
        const data = await res.json();
        setCart(data.cart);
    };

    return (
        <div className="flex">
            <button onClick={logToken}>loggin from home</button>
            <div className="w-3/4">
                <div className="bg-amber-300 flex justify-center items-center ">
                    <input type="text" className="p-2 border" />
                </div>

                <div className=" p-4 flex items-center gap-16 justify-center">
                    {products.map((p) => (
                        <div key={p._id}>
                            <img src="./src/assets/books.jpg" alt="" />
                            {p.name}
                            <button onClick={(e) => addToCart(e, p._id)}>
                                add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center border w-1/4 ">
                <span>your cart</span>

                <div>
                    {cart.map((c) => (
                        <div key={c._id}>{c.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
