steps = [
    [
        """
        CREATE TABLE watchlists (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            title VARCHAR(1000) NOT NULL,
            date VARCHAR(1000) NOT NULL,
            img_url VARCHAR(1000) NOT NULL
        );
        """,
        """
        DROP TABLE watchlists;
        """
    ]
]
