export default {
    theme: {
        extend: {
            animation: {
                fadeIn: "fadeIn 0.5s ease-out forwards",
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
            },
        },
    },
};
