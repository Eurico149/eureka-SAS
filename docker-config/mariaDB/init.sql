CREATE TABLE user(
    user_id CHAR(36),
    username VARCHAR(35) NOT NULL UNIQUE,
    nickname VARCHAR(25),
    password VARCHAR(255) NOT NULL,
    birthday DATE,
    email VARCHAR(256),
    phone VARCHAR(16),
    address VARCHAR(160),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rf_token(
    token_id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    token VARCHAR() NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expired_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    CHECK (expired_at > created_at)
);

CREATE UNIQUE INDEX idx_token_value ON rf_token(token);

