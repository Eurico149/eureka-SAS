CREATE TABLE admin(
    admin_id CHAR(36) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(256) UNIQUE NOT NULL,
    phone VARCHAR(16) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user(
    user_id CHAR(36),
    admin_id CHAR(36),
    username VARCHAR(100) NOT NULL UNIQUE,
    nickname VARCHAR(25),
    password VARCHAR(255) NOT NULL,
    birthday DATE,
    email VARCHAR(256),
    phone VARCHAR(16),
    address VARCHAR(160),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, admin_id)
);

CREATE TABLE user_rf_token(
    user_token_id CHAR(36),
    user_id CHAR(36),
    admin_id CHAR(36) NOT NULL,
    token VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expired_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id, admin_id) REFERENCES user(user_id, admin_id) ON DELETE CASCADE,
    PRIMARY KEY (token_id, user_id),
    CHECK (expired_at > created_at)
);

CREATE TABLE admin_token(
    admin_token_id CHAR(36),
    admin_id CHAR(36),
    token VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expired_at TIMESTAMP NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE,
    PRIMARY KEY (token_id, admin_id),
    CHECK (expired_at > created_at)
);

CREATE UNIQUE INDEX idx_user_token_value ON user_rf_token(token);

CREATE UNIQUE INDEX idx_admin_token_value ON admin_token(token);

