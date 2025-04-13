
INSERT INTO categories (category_id, name, description) VALUES (24, 'Arinas', '');
INSERT INTO categories (category_id, name, description) VALUES (19, 'Aguas', '');
INSERT INTO categories (category_id, name, description) VALUES (20, 'Aceites', '');
INSERT INTO categories (category_id, name, description) VALUES (18, 'Granos', '');
INSERT INTO categories (category_id, name, description) VALUES (9, 'Embutidos', ''); 
INSERT INTO categories (category_id, name, description) VALUES (22, 'Cereales', '');

INSERT INTO clients (client_id, name, address, phone, email) VALUES (1, 'Pedro', '', '', '');

INSERT INTO valtab (valtab_id,   `values` , code, description, default_value) VALUES (3, 'g,oz,lb,kg,ton', 'WEIGHT', '', 'kg');
INSERT INTO valtab (valtab_id,   `values` , code, description, default_value) VALUES (4, 'a,ha', 'SURFACE', '', '');
INSERT INTO valtab (valtab_id,   `values` , code, description, default_value) VALUES (1, 'mm,cm,dm,meters,km2', 'DISTANCE', '', 'meters1');