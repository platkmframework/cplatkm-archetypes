CREATE SEQUENCE batch_alerts_alert_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



CREATE TABLE batch_alerts (
    alert_id integer DEFAULT nextval('batch_alerts_alert_id_seq'::regclass) NOT NULL,
    batch_id integer NOT NULL,
    alert_type character varying(100) NOT NULL,
    alert_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    alert_status character varying(50) DEFAULT 'pending'::character varying,
    notes text
);


CREATE SEQUENCE batch_entries_entry_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE batch_entries (
    entry_id bigint DEFAULT nextval('batch_entries_entry_id_seq'::regclass) NOT NULL,
    batch_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity double precision NOT NULL,
    entry_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    supplier_id integer,
    user_id integer
);

CREATE SEQUENCE batch_entries_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE batch_exits_exit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE batch_exits (
    exit_id integer DEFAULT nextval('batch_exits_exit_id_seq'::regclass) NOT NULL,
    batch_id integer,
    product_id integer NOT NULL,
    quantity numeric(10,2) NOT NULL,
    exit_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    reason text,
    client_id integer,
    user_id integer
);

CREATE SEQUENCE batch_movements_movement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE batch_movements (
    movement_id bigint DEFAULT nextval('batch_movements_movement_id_seq'::regclass) NOT NULL,
    batch_id integer,
    movement_type character varying(255) NOT NULL,
    quantity double precision NOT NULL,
    movement_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer,
    notes text
);


CREATE SEQUENCE batch_movements_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE batches_batch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE batches (
    batch_id integer DEFAULT nextval('batches_batch_id_seq'::regclass) NOT NULL,
    product_id integer NOT NULL,
    batch_number character varying(100) NOT NULL,
    manufacture_date date NOT NULL,
    expiry_date date NOT NULL,
    initial_quantity numeric(10,2) NOT NULL,
    available_quantity numeric(10,2) NOT NULL,
    status boolean DEFAULT true
);


CREATE SEQUENCE categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE categories (
    category_id bigint DEFAULT nextval('categories_category_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


CREATE SEQUENCE categories_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE SEQUENCE clients_client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE clients (
    client_id bigint DEFAULT nextval('clients_client_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    address text,
    phone character varying(255),
    email character varying(255)
);


CREATE SEQUENCE clients_products_request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE clients_products_request (
    id integer DEFAULT nextval('clients_products_request_id_seq'::regclass) NOT NULL,
    clients_id integer,
    products_id integer,
    request_count double precision,
    status character varying(100)
);


CREATE SEQUENCE clients_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE inventory_inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE inventory (
    inventory_id integer DEFAULT nextval('inventory_inventory_id_seq'::regclass) NOT NULL,
    product_id integer NOT NULL,
    current_quantity numeric(10,2) NOT NULL,
    location_id integer
);


CREATE SEQUENCE locations_location_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE locations (
    location_id integer DEFAULT nextval('locations_location_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    address text,
    capacity numeric(10,2)
);

CREATE SEQUENCE products_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE products (
    product_id bigint DEFAULT nextval('products_product_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    category_id integer,
    purchase_price double precision NOT NULL,
    sale_price double precision NOT NULL,
    unit character varying(255) NOT NULL,
    min_quantity double precision DEFAULT 0,
    batch_managed boolean DEFAULT false,
    perishable boolean DEFAULT false,
    updated_date date,
    status boolean
);


CREATE SEQUENCE products_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE products_suppliers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE products_suppliers (
    id integer DEFAULT nextval('products_suppliers_id_seq'::regclass) NOT NULL,
    products_id integer,
    suppliers_id integer
);


CREATE SEQUENCE suppliers_supplier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE suppliers (
    supplier_id integer DEFAULT nextval('suppliers_supplier_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    contact character varying(255),
    address text,
    phone character varying(20),
    email character varying(100)
);


CREATE SEQUENCE users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE users (
    user_id integer DEFAULT nextval('users_user_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    role character varying(50) NOT NULL,
    registration_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE valtab_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE valtab (
    valtab_id bigint DEFAULT nextval('valtab_id_seq'::regclass) NOT NULL,
    "values" character varying(255) NOT NULL,
    code character varying(255) NOT NULL,
    description text,
    default_value character varying(255)
);


CREATE SEQUENCE valtab_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE SEQUENCE warehouses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE warehouses (
    warehouses_id integer DEFAULT nextval('warehouses_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    address text,
    capacity numeric(10,2),
    company_id_fk integer
);

ALTER TABLE ONLY batch_alerts
    ADD CONSTRAINT batch_alerts_pkey PRIMARY KEY (alert_id);


ALTER TABLE ONLY batch_entries
    ADD CONSTRAINT batch_entries_pkey PRIMARY KEY (entry_id);


ALTER TABLE ONLY batch_exits
    ADD CONSTRAINT batch_exits_pkey PRIMARY KEY (exit_id);

ALTER TABLE ONLY batch_movements
    ADD CONSTRAINT batch_movements_pkey PRIMARY KEY (movement_id);



ALTER TABLE ONLY batches
    ADD CONSTRAINT batches_pkey PRIMARY KEY (batch_id);


ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);



ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);



ALTER TABLE ONLY clients_products_request
    ADD CONSTRAINT clients_products_request_pkey PRIMARY KEY (id);



ALTER TABLE ONLY inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (inventory_id);


ALTER TABLE ONLY locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (location_id);


ALTER TABLE ONLY products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);



ALTER TABLE ONLY products_suppliers
    ADD CONSTRAINT products_suppliers_pkey PRIMARY KEY (id);



ALTER TABLE ONLY suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (supplier_id);



ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


ALTER TABLE ONLY valtab
    ADD CONSTRAINT valtab_pkey PRIMARY KEY (valtab_id);



ALTER TABLE ONLY warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (warehouses_id);



ALTER TABLE ONLY batch_alerts
    ADD CONSTRAINT batch_alerts_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(batch_id);



ALTER TABLE ONLY batch_entries
    ADD CONSTRAINT batch_entries_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(batch_id);



ALTER TABLE ONLY batch_entries
    ADD CONSTRAINT batch_entries_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);



ALTER TABLE ONLY batch_entries
    ADD CONSTRAINT batch_entries_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id);



ALTER TABLE ONLY batch_entries
    ADD CONSTRAINT batch_entries_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);



ALTER TABLE ONLY batch_exits
    ADD CONSTRAINT batch_exits_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(batch_id);



ALTER TABLE ONLY batch_exits
    ADD CONSTRAINT batch_exits_client_id_fkey FOREIGN KEY (client_id) REFERENCES clients(client_id);



ALTER TABLE ONLY batch_exits
    ADD CONSTRAINT batch_exits_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);



ALTER TABLE ONLY batch_exits
    ADD CONSTRAINT batch_exits_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);



ALTER TABLE ONLY batch_movements
    ADD CONSTRAINT batch_movements_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(batch_id);



ALTER TABLE ONLY batch_movements
    ADD CONSTRAINT batch_movements_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);



ALTER TABLE ONLY batches
    ADD CONSTRAINT batches_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);



ALTER TABLE ONLY products_suppliers
    ADD CONSTRAINT fk_products_suppliers_products_id FOREIGN KEY (products_id) REFERENCES products(product_id);



ALTER TABLE ONLY products_suppliers
    ADD CONSTRAINT fk_products_suppliers_suppliers_id FOREIGN KEY (suppliers_id) REFERENCES suppliers(supplier_id);



ALTER TABLE ONLY inventory
    ADD CONSTRAINT inventory_location_id_fkey FOREIGN KEY (location_id) REFERENCES locations(location_id);



ALTER TABLE ONLY inventory
    ADD CONSTRAINT inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);


ALTER TABLE ONLY products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(category_id);