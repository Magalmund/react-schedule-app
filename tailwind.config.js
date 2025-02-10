module.exports = {
    purge: {
        content: ['./src/**/*.html', './src/**/*.js'],
        safelist: [
            'bg-blue-200',
            'bg-red-200',
            'bg-green-200',
            'bg-yellow-200',
            'bg-indigo-200',
            'bg-purple-200',
            'bg-pink-200',
        ],
        theme: {
            extend: {
                fontFamily: {
                    sans: ["Open Sans"],
                },
                gridTemplateColumns: {
                    "1/5": "1fr 5fr",
                },
            },
        },
    },
}
