--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-05-10 17:45:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 823 (class 1247 OID 16510)
-- Name: categ_instrument; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.categ_instrument AS ENUM (
    'clasic',
    'semnatura',
    'editie limitata',
    'b-stock'
);


ALTER TYPE public.categ_instrument OWNER TO postgres;

--
-- TOC entry 826 (class 1247 OID 16520)
-- Name: tipuri_produse; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipuri_produse AS ENUM (
    'chitare',
    'basuri',
    'tobe',
    'clape',
    'microfoane',
    'studio'
);


ALTER TYPE public.tipuri_produse OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16534)
-- Name: produse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produse (
    id integer NOT NULL,
    nume character varying(50) NOT NULL,
    descriere text,
    pret numeric(8,2) NOT NULL,
    greutate integer NOT NULL,
    tip_produs public.tipuri_produse,
    categorie public.categ_instrument DEFAULT 'clasic'::public.categ_instrument,
    caracteristici character varying[],
    culoare character varying(50) NOT NULL,
    pentru_stangaci boolean DEFAULT false NOT NULL,
    imagine character varying(300),
    data_adaugare timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT produse_greutate_check CHECK ((greutate >= 0))
);


ALTER TABLE public.produse OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16533)
-- Name: produse_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produse_id_seq OWNER TO postgres;

--
-- TOC entry 3326 (class 0 OID 0)
-- Dependencies: 209
-- Name: produse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produse_id_seq OWNED BY public.produse.id;


--
-- TOC entry 3170 (class 2604 OID 16537)
-- Name: produse id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produse ALTER COLUMN id SET DEFAULT nextval('public.produse_id_seq'::regclass);


--
-- TOC entry 3319 (class 0 OID 16534)
-- Dependencies: 210
-- Data for Name: produse; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (1, 'Ibanez JEMJRSP-YE', '', 2490.00, 4, 'chitare', 'clasic', '{"corzi: 6","doze: HSH","taste: 24","bridge: tremolo"}', 'Galben', false, '1.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (2, 'Ibanez GRG120QASPBGD', '', 1230.00, 3, 'chitare', 'clasic', '{"corzi: 6","doze: HH","taste: 24","bridge: tremolo"}', 'Albastru', false, '2.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (3, 'ESP LTD EX-401', '', 4450.00, 4, 'chitare', 'editie limitata', '{"corzi: 6","doze: HH","taste: 22","bridge: fixed"}', 'Alb', false, '3.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (4, 'ESP LTD EX-Black Metal', '', 5860.00, 4, 'chitare', 'editie limitata', '{"corzi: 6","doze: HH","taste: 22","bridge: fixed"}', 'Negru', false, '4.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (5, 'ESP LTD EC-401 LH', '', 4926.00, 4, 'chitare', 'b-stock', '{"corzi: 6","doze: HH","taste: 24","bridge: fixed"}', 'Alb', true, '5.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (6, 'Fender Squier Affinity Telecaster', '', 1080.00, 4, 'chitare', 'editie limitata', '{"corzi: 6","doze: SS","taste: 22","bridge: fixed"}', 'Galben', false, '6.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (7, 'EVH Frankie Striped MN', '', 6720.00, 4, 'chitare', 'semnatura', '{"corzi: 6","doze: HSS","taste: 22","bridge: floyd rose"}', 'Rosu', false, '7.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (8, 'ESP KH-3 Spider Kirk Hammett', '', 27950.00, 4, 'chitare', 'semnatura', '{"corzi: 6","doze: HH","taste: 24","bridge: floyd rose"}', 'Negru', false, '8.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (9, 'Yamaha TRBX304 RW', '', 1970.00, 4, 'basuri', 'clasic', '{"corzi: 4","doze: HH","taste: 24"}', 'Alb', false, '9.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (10, 'Fender Squier Affinity Precision Bass', '', 1230.00, 4, 'basuri', 'clasic', '{"corzi: 4","doze: PJ","taste: 20"}', 'Alb', false, '10.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (11, 'ESP LTD TA-204 FRX', '', 3500.00, 4, 'basuri', 'editie limitata', '{"corzi: 4","doze: HH","taste: 24"}', 'Negru', false, '11.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (12, 'Fender Flea Jazz Bass RW', '', 7370.00, 4, 'basuri', 'semnatura', '{"corzi: 4","doze: SS","taste: 20"}', 'Roz', false, '12.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (13, 'Yamaha B2E PE', '', 26580.00, 203, 'clape', 'clasic', '{"clape: 88","finisaj: lustruit","placa de sunet: molid"}', 'Negru', false, '13.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (14, 'Yamaha PSR-E373', '', 1100.00, 5, 'clape', 'editie limitata', '{"clape: 61","polifonie: 48","putere: 5W"}', 'Negru', false, '14.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (15, 'Pearl RS505C-C91 Roadshow', '', 2670.00, 32, 'tobe', 'clasic', '{"material: plop"}', 'Rosu', false, '15.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (16, 'Yamaha Stage Custom Birch', '', 4760.00, 35, 'tobe', 'clasic', '{"material: mesteacan"}', 'Maro', false, '16.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (17, 'Yamaha SBP2F5-CR Stage Custom Birch', '', 4010.00, 34, 'tobe', 'editie limitata', '{"material: mesteacan"}', 'Visiniu', false, '17.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (18, 'Shure SM58-LCE', '', 500.00, 0, 'microfoane', 'clasic', '{"tip: dinamic","impedanta: 300 Ohm"}', 'Gri', true, '18.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (19, 'Behringer U-Phoria UMC404HD', '', 740.00, 3, 'studio', 'clasic', '{"interfata: USB-B","frecventa: 192 kHz"}', 'Negru', false, '19.jpg', '2022-05-03 11:58:39.630271');
INSERT INTO public.produse (id, nume, descriere, pret, greutate, tip_produs, categorie, caracteristici, culoare, pentru_stangaci, imagine, data_adaugare) VALUES (20, 'Focusrite Scarlett 2i2 3rd Generation', '', 890.00, 4, 'studio', 'clasic', '{"interfata: USB-C","frecventa: 192 kHz"}', 'Rosu', false, '20.jpg', '2022-05-03 11:58:39.630271');


--
-- TOC entry 3328 (class 0 OID 0)
-- Dependencies: 209
-- Name: produse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produse_id_seq', 20, true);


--
-- TOC entry 3176 (class 2606 OID 16547)
-- Name: produse produse_nume_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produse
    ADD CONSTRAINT produse_nume_key UNIQUE (nume);


--
-- TOC entry 3178 (class 2606 OID 16545)
-- Name: produse produse_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produse
    ADD CONSTRAINT produse_pkey PRIMARY KEY (id);


--
-- TOC entry 3325 (class 0 OID 0)
-- Dependencies: 210
-- Name: TABLE produse; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.produse TO user1;


--
-- TOC entry 3327 (class 0 OID 0)
-- Dependencies: 209
-- Name: SEQUENCE produse_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.produse_id_seq TO user1;


-- Completed on 2022-05-10 17:45:11

--
-- PostgreSQL database dump complete
--

