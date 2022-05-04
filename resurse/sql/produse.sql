DROP TYPE IF EXISTS categ_instrument;
DROP TYPE IF EXISTS tipuri_produse;

CREATE TYPE categ_instrument AS ENUM('clasic', 'semnatura', 'editie limitata', 'b-stock');
CREATE TYPE tipuri_produse AS ENUM('chitare', 'basuri', 'tobe', 'clape', 'microfoane', 'studio');

CREATE TABLE IF NOT EXISTS produse (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   greutate INT NOT NULL CHECK (greutate >= 0),   
   tip_produs tipuri_produse,
   categorie categ_instrument DEFAULT 'clasic',
   caracteristici VARCHAR [], 
   culoare VARCHAR(50) NOT NULL,
   pentru_stangaci BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into produse (nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine) VALUES 

('Ibanez JEMJRSP-YE', '', 2490 , 3.5, 'chitare', 'clasic', '{"corzi: 6","doze: HSH","taste: 24","bridge: tremolo"}', 'Galben', False, 'aproximativ-savarina.jpg'),

('Ibanez GRG120QASPBGD', '', 1230 , 3.4, 'chitare', 'clasic', '{"corzi: 6","doze: HH","taste: 24","bridge: tremolo"}', 'Albastru', False, 'posibil-amandina.jpg'),

('ESP LTD EX-401', '', 4450 , 3.7, 'chitare', 'editie limitata', '{"corzi: 6","doze: HH","taste: 22","bridge: fixed"}', 'Alb', False,'tort-glazurat.jpg'),

('ESP LTD EX-Black Metal', '', 5860, 3.7, 'chitare', 'editie limitata', '{"corzi: 6","doze: HH","taste: 22","bridge: fixed"}', 'Negru', False,'dulcelind.jpg'),

('ESP LTD EC-401 LH', '', 4926, 3.6, 'chitare', 'b-stock', '{"corzi: 6","doze: HH","taste: 24","bridge: fixed"}', 'Alb', True, 'tarta-capsuni.jpg'),

('Fender Squier Affinity Series Telecaster MN BPG', '', 1080, 3.5, 'chitare', 'editie limitata', '{"corzi: 6","doze: SS","taste: 22","bridge: fixed"}', 'Galben', False, 'nimic.jpg'),

('EVH Frankie Striped MN', '', 6720, 3.6, 'chitare', 'semnatura', '{"corzi: 6","doze: HSS","taste: 22","bridge: floyd rose"}', 'Rosu', False, 'nimic.jpg'),

('ESP KH-3 Spider Kirk Hammett Black Spider Graphic', '', 27950, 3.8, 'chitare', 'semnatura', '{"corzi: 6","doze: HH","taste: 24","bridge: floyd rose"}', 'Negru', False, 'nimic.jpg'),

('Yamaha TRBX304 RW', '', 1970, 4.1, 'basuri', 'clasic', '{"corzi: 4","doze: HH","taste: 24"}', 'Alb', False, 'nimic.jpg'),

('Fender Squier Affinity Series Precision Bass PJ MN BPG', '', 1230, 3.9, 'basuri', 'clasic', '{"corzi: 4","doze: PJ","taste: 20"}', 'Alb', False, 'nimic.jpg'),

('ESP LTD TA-204 FRX', '', 3500, 4.0, 'basuri', 'editie limitata', '{"corzi: 4","doze: HH","taste: 24"}', 'Negru', False, 'nimic.jpg'),

('Fender Flea Jazz Bass RW', '', 7370, 4.2, 'basuri', 'semnatura', '{"corzi: 4","doze: SS","taste: 20"}', 'Roz', False, 'nimic.jpg'),

('Yamaha B2E PE', '', 26580, 203, 'clape', 'clasic', '{"clape: 88", "finisaj: lustruit", "placa de sunet: molid"}', 'Negru', False, 'nimic.jpg'),

('Yamaha PSR-E373', '', 1100, 4.6, 'clape', 'editie limitata', '{"clape: 61", "polifonie: 48", "putere: 5W"}', 'Negru', False, 'nimic.jpg'),

('Pearl RS505C-C91 Roadshow', '', 2670, 32, 'tobe', 'clasic', '{"material: plop"}', 'Rosu', False, 'nimic.jpg'),

('Yamaha Stage Custom Birch', '', 4760, 35, 'tobe', 'clasic', '{"material: mesteacan"}', 'Maro', False, 'nimic.jpg'),

('Yamaha SBP2F5-CR Stage Custom Birch', '', 4010, 34, 'tobe', 'editie limitata', '{"material: mesteacan"}', 'Visiniu', False, 'nimic.jpg'),

('Shure SM58-LCE', '', 500, 0.3, 'microfoane', 'clasic', '{"tip: dinamic", "impedanta: 300 Ohm"}', 'Gri', True, 'nimic.jpg'),

('Behringer U-Phoria UMC404HD', '', 740, 3, 'studio', 'clasic', '{"interfata: USB-B", "frecventa: 192 kHz"}', 'Negru', False, 'nimic.jpg'),

('Focusrite Scarlett 2i2 3rd Generation', '', 890, 4, 'studio', 'clasic', '{"interfata: USB-C", "frecventa: 192 kHz"}', 'Rosu', False, 'nimic.jpg');
