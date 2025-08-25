<div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
    <span className="text-2xl font-semibold text-gray-800 mb-4 block">
        Your Cart
    </span>
    {cart.length > 0 ? (
        <ul className="space-y-4">
            {cart.map((product) => (
                <li
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                        <span className="text-lg font-medium text-gray-900">
                            {product.name}
                        </span>
                        <span className="text-md text-gray-600">price</span>
                    </div>
                    <button
                        onClick={() => handleRemoveCart(product.id)}
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors duration-200 text-sm font-bold shadow-md"
                        aria-label={`Remove ${product.name} from cart`}
                    >
                        &times;
                    </button>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-center text-gray-500 text-lg py-8">
            Your cart is empty.
        </p>
    )}
</div>;

{
    /* <input
                    type="text"
                    placeholder="Search products..."
                    className={style.search}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                /> */
}
