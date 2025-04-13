CREATE TABLE batch_alerts (
    alert_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    batch_id BIGINT NOT NULL,
    alert_type VARCHAR(100) NOT NULL,
    alert_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    alert_status VARCHAR(50) DEFAULT 'pending',
    notes TEXT
);

CREATE TABLE batch_entries (
    entry_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    batch_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity DOUBLE NOT NULL,
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    supplier_id BIGINT,
    user_id BIGINT
);

CREATE TABLE batch_exits (
    exit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    batch_id BIGINT,
    product_id BIGINT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    exit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason TEXT,
    client_id BIGINT,
    user_id BIGINT
);

CREATE TABLE batch_movements (
    movement_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    batch_id BIGINT,
    movement_type VARCHAR(255) NOT NULL,
    quantity DOUBLE NOT NULL,
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT,
    notes TEXT
);

CREATE TABLE batches (
    batch_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    batch_number VARCHAR(100) NOT NULL,
    manufacture_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    initial_quantity DECIMAL(10,2) NOT NULL,
    available_quantity DECIMAL(10,2) NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

CREATE TABLE categories (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE clients (
    client_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE clients_products_request (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    clients_id BIGINT,
    products_id BIGINT,
    request_count DOUBLE,
    status VARCHAR(100)
);

CREATE TABLE inventory (
    inventory_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    current_quantity DECIMAL(10,2) NOT NULL,
    location_id BIGINT
);

CREATE TABLE locations (
    location_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    capacity DECIMAL(10,2)
);

CREATE TABLE products (
    product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id BIGINT,
    purchase_price DOUBLE NOT NULL,
    sale_price DOUBLE NOT NULL,
    unit VARCHAR(255) NOT NULL,
    min_quantity DOUBLE DEFAULT 0,
    batch_managed BOOLEAN DEFAULT FALSE,
    perishable BOOLEAN DEFAULT FALSE,
    updated_date DATE,
    status BOOLEAN
);

CREATE TABLE products_suppliers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    products_id BIGINT,
    suppliers_id BIGINT
);

CREATE TABLE suppliers (
    supplier_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE valtab (
    valtab_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    `values` VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    description TEXT,
    default_value VARCHAR(255)
);

-- En MariaDB no existen SEQUENCES como en PostgreSQL, por lo que se usa AUTO_INCREMENT en su lugar

CREATE TABLE warehouses (
    warehouses_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    capacity DECIMAL(10,2),
    company_id_fk BIGINT,
    PRIMARY KEY (warehouses_id)
);
 

-- Restricción UNIQUE
ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);

-- Claves foráneas
ALTER TABLE batch_alerts ADD CONSTRAINT batch_alerts_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(batch_id);
ALTER TABLE batch_entries ADD CONSTRAINT batch_entries_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(batch_id);
ALTER TABLE batch_entries ADD CONSTRAINT batch_entries_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE batch_entries ADD CONSTRAINT batch_entries_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id);
ALTER TABLE batch_entries ADD CONSTRAINT batch_entries_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE batch_exits ADD CONSTRAINT batch_exits_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(batch_id);
ALTER TABLE batch_exits ADD CONSTRAINT batch_exits_client_id_fkey FOREIGN KEY (client_id) REFERENCES clients(client_id);
ALTER TABLE batch_exits ADD CONSTRAINT batch_exits_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE batch_exits ADD CONSTRAINT batch_exits_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE batch_movements ADD CONSTRAINT batch_movements_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(batch_id);
ALTER TABLE batch_movements ADD CONSTRAINT batch_movements_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE batches ADD CONSTRAINT batches_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE products_suppliers ADD CONSTRAINT fk_products_suppliers_products_id FOREIGN KEY (products_id) REFERENCES products(product_id);
ALTER TABLE products_suppliers ADD CONSTRAINT fk_products_suppliers_suppliers_id FOREIGN KEY (suppliers_id) REFERENCES suppliers(supplier_id);
ALTER TABLE inventory ADD CONSTRAINT inventory_location_id_fkey FOREIGN KEY (location_id) REFERENCES locations(location_id);
ALTER TABLE inventory ADD CONSTRAINT inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE products ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(category_id);

