module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    minWidth: {
      48: "12rem",
      20: "5rem",
    },
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        8: "repeat(8, minmax(0, 1fr))",
        maxWidth: {
          15: "15rem",
        },
        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
      },
    },
  },
  plugins: [require("daisyui")],
};
