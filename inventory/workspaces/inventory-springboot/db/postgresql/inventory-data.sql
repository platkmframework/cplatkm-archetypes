
INSERT INTO categories (category_id, name, description) VALUES (24, 'Arinas', '');
INSERT INTO categories (category_id, name, description) VALUES (19, 'Aguas', '');
INSERT INTO categories (category_id, name, description) VALUES (20, 'Aceites', '');
INSERT INTO categories (category_id, name, description) VALUES (18, 'Granos', '');
INSERT INTO categories (category_id, name, description) VALUES (9, 'Embutidos', '');
INSERT INTO categories (category_id, name, description) VALUES (16, 'Carne blanca', '');
INSERT INTO categories (category_id, name, description) VALUES (2, 'bbbbbbbbbbb', 'erererer');
INSERT INTO categories (category_id, name, description) VALUES (52, 'www', 'wwww');
INSERT INTO categories (category_id, name, description) VALUES (22, 'Cereales', '');


INSERT INTO clients (client_id, name, address, phone, email) VALUES (1, 'Pedro', '', '', '');


INSERT INTO valtab (valtab_id, "values", code, description, default_value) VALUES (3, 'g,oz,lb,kg,ton', 'WEIGHT', '', 'kg');
INSERT INTO valtab (valtab_id, "values", code, description, default_value) VALUES (4, 'a,ha', 'SURFACE', '', '');
INSERT INTO valtab (valtab_id, "values", code, description, default_value) VALUES (1, 'mm,cm,dm,meters,km2', 'DISTANCE', '', 'meters1');



SELECT pg_catalog.setval('batch_alerts_alert_id_seq', 1, false);
SELECT pg_catalog.setval('batch_entries_entry_id_seq', 1, false);
SELECT pg_catalog.setval('batch_entries_seq', 1, false);
SELECT pg_catalog.setval('batch_exits_exit_id_seq', 1, false);
SELECT pg_catalog.setval('batch_movements_movement_id_seq', 1, false);
SELECT pg_catalog.setval('batch_movements_seq', 1, false);
SELECT pg_catalog.setval('batches_batch_id_seq', 1, false);
SELECT pg_catalog.setval('categories_category_id_seq', 24, true);
SELECT pg_catalog.setval('categories_seq', 101, true);
SELECT pg_catalog.setval('clients_client_id_seq', 1, false);
SELECT pg_catalog.setval('clients_products_request_id_seq', 1, false);
SELECT pg_catalog.setval('clients_seq', 1, true);
SELECT pg_catalog.setval('inventory_inventory_id_seq', 1, false);
SELECT pg_catalog.setval('locations_location_id_seq', 1, false);
SELECT pg_catalog.setval('products_product_id_seq', 1, false);
SELECT pg_catalog.setval('products_seq', 1, false);
SELECT pg_catalog.setval('products_suppliers_id_seq', 1, false);
SELECT pg_catalog.setval('suppliers_supplier_id_seq', 1, false);
SELECT pg_catalog.setval('users_user_id_seq', 1, false);
SELECT pg_catalog.setval('valtab_id_seq', 6, true);
SELECT pg_catalog.setval('valtab_seq', 101, true);
SELECT pg_catalog.setval('warehouses_id_seq', 1, false);


