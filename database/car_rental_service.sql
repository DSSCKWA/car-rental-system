--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-26 22:41:48

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
-- TOC entry 3530 (class 1262 OID 18301)
-- Name: car_rental_service2; Type: DATABASE; Schema: -; Owner: User1
--



ALTER DATABASE car_rental_service2 OWNER TO "User1";

\connect car_rental_service2

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
-- TOC entry 896 (class 1247 OID 18420)
-- Name: account_status; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.account_status AS ENUM (
    'active',
    'inactive',
    'deleted'
);


ALTER TYPE public.account_status OWNER TO "User1";

--
-- TOC entry 872 (class 1247 OID 18348)
-- Name: body_type; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.body_type AS ENUM (
    'SUV',
    'coupe',
    'sedan',
    'hatchback',
    'combi',
    'convertible',
    'MUV',
    'pickup_truck',
    'sports_car'
);


ALTER TYPE public.body_type OWNER TO "User1";

--
-- TOC entry 890 (class 1247 OID 18404)
-- Name: complaint_status; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.complaint_status AS ENUM (
    'in_progress',
    'processed'
);


ALTER TYPE public.complaint_status OWNER TO "User1";

--
-- TOC entry 881 (class 1247 OID 18384)
-- Name: discount_status; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.discount_status AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.discount_status OWNER TO "User1";

--
-- TOC entry 878 (class 1247 OID 18378)
-- Name: discount_type; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.discount_type AS ENUM (
    'user_specific',
    'public'
);


ALTER TYPE public.discount_type OWNER TO "User1";

--
-- TOC entry 866 (class 1247 OID 18324)
-- Name: drive_type; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.drive_type AS ENUM (
    'AWD',
    'FWD',
    'RWD',
    '4WD'
);


ALTER TYPE public.drive_type OWNER TO "User1";

--
-- TOC entry 902 (class 1247 OID 18436)
-- Name: fuel_level; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.fuel_level AS ENUM (
    'empty',
    'full',
    'depleted'
);


ALTER TYPE public.fuel_level OWNER TO "User1";

--
-- TOC entry 869 (class 1247 OID 18334)
-- Name: fuel_type; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.fuel_type AS ENUM (
    'petrol',
    'diesel',
    'bio-diesel',
    'LPG',
    'CNG',
    'electric'
);


ALTER TYPE public.fuel_type OWNER TO "User1";

--
-- TOC entry 887 (class 1247 OID 18398)
-- Name: issue_status; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.issue_status AS ENUM (
    'in_progress',
    'processed'
);


ALTER TYPE public.issue_status OWNER TO "User1";

--
-- TOC entry 884 (class 1247 OID 18390)
-- Name: issue_type; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.issue_type AS ENUM (
    'vehicle_damage',
    'car_crash',
    'vehicle_malfunction'
);


ALTER TYPE public.issue_type OWNER TO "User1";

--
-- TOC entry 908 (class 1247 OID 18452)
-- Name: item_status; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.item_status AS ENUM (
    'avaliable',
    'rented',
    'out_of_comission',
    'in_service'
);


ALTER TYPE public.item_status OWNER TO "User1";

--
-- TOC entry 905 (class 1247 OID 18444)
-- Name: other_mechanical_damage; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.other_mechanical_damage AS ENUM (
    'none',
    'major',
    'minor'
);


ALTER TYPE public.other_mechanical_damage OWNER TO "User1";

--
-- TOC entry 893 (class 1247 OID 18410)
-- Name: permissions; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.permissions AS ENUM (
    'client',
    'worker',
    'manager',
    'admin'
);


ALTER TYPE public.permissions OWNER TO "User1";

--
-- TOC entry 911 (class 1247 OID 18462)
-- Name: policy_type; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.policy_type AS ENUM (
    'third_party_liability',
    'collision_damage_waiver',
    'additional_equipment_protection',
    'extended_rental_insurance'
);


ALTER TYPE public.policy_type OWNER TO "User1";

--
-- TOC entry 899 (class 1247 OID 18428)
-- Name: task_status; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.task_status AS ENUM (
    'active',
    'in_progress',
    'completed'
);


ALTER TYPE public.task_status OWNER TO "User1";

--
-- TOC entry 863 (class 1247 OID 18303)
-- Name: vehicle_class; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.vehicle_class AS ENUM (
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'S',
    'H',
    'J',
    'M'
);


ALTER TYPE public.vehicle_class OWNER TO "User1";

--
-- TOC entry 875 (class 1247 OID 18368)
-- Name: vehicle_status; Type: TYPE; Schema: public; Owner: User1
--

CREATE TYPE public.vehicle_status AS ENUM (
    'avaliable',
    'rented',
    'out_of_comission',
    'in_service'
);


ALTER TYPE public.vehicle_status OWNER TO "User1";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 229 (class 1259 OID 18533)
-- Name: complaint; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.complaint (
    complaint_id integer NOT NULL,
    title character varying(255) NOT NULL,
    client_id integer NOT NULL,
    staff_id integer NOT NULL,
    complaint_status public.complaint_status NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.complaint OWNER TO "User1";

--
-- TOC entry 228 (class 1259 OID 18532)
-- Name: complaint_complaint_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.complaint_complaint_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.complaint_complaint_id_seq OWNER TO "User1";

--
-- TOC entry 3531 (class 0 OID 0)
-- Dependencies: 228
-- Name: complaint_complaint_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.complaint_complaint_id_seq OWNED BY public.complaint.complaint_id;


--
-- TOC entry 239 (class 1259 OID 18579)
-- Name: cost_distribution; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.cost_distribution (
    rental_id integer NOT NULL,
    vehicle_cost double precision NOT NULL,
    item_cost double precision,
    insurance_cost double precision,
    penalty_charges double precision,
    total double precision NOT NULL
);


ALTER TABLE public.cost_distribution OWNER TO "User1";

--
-- TOC entry 227 (class 1259 OID 18524)
-- Name: discount_code; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.discount_code (
    discount_code_id integer NOT NULL,
    code character varying(30) NOT NULL,
    discount_type public.discount_type NOT NULL,
    discount_status public.discount_status NOT NULL,
    user_id integer
);


ALTER TABLE public.discount_code OWNER TO "User1";

--
-- TOC entry 226 (class 1259 OID 18523)
-- Name: discount_code_discount_code_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.discount_code_discount_code_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_code_discount_code_id_seq OWNER TO "User1";

--
-- TOC entry 3532 (class 0 OID 0)
-- Dependencies: 226
-- Name: discount_code_discount_code_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.discount_code_discount_code_id_seq OWNED BY public.discount_code.discount_code_id;


--
-- TOC entry 215 (class 1259 OID 18472)
-- Name: feedback; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.feedback (
    feedback_id integer NOT NULL,
    vehicle_rating integer NOT NULL CHECK (vehicle_rating >= 1 AND vehicle_rating <= 5),
    comment character varying(255),
    client_id integer NOT NULL,
    service_rating integer NOT NULL CHECK (service_rating >= 1 AND service_rating <= 5),
    rental_id integer NOT NULL
);


ALTER TABLE public.feedback OWNER TO "User1";

--
-- TOC entry 214 (class 1259 OID 18471)
-- Name: feedback_feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.feedback_feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_feedback_id_seq OWNER TO "User1";

--
-- TOC entry 3533 (class 0 OID 0)
-- Dependencies: 214
-- Name: feedback_feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.feedback_feedback_id_seq OWNED BY public.feedback.feedback_id;


--
-- TOC entry 223 (class 1259 OID 18506)
-- Name: insurance; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.insurance (
    policy_number integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(3000) NOT NULL,
    policy_type public.policy_type NOT NULL
);


ALTER TABLE public.insurance OWNER TO "User1";

--
-- TOC entry 222 (class 1259 OID 18505)
-- Name: insurance_policy_number_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.insurance_policy_number_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.insurance_policy_number_seq OWNER TO "User1";

--
-- TOC entry 3534 (class 0 OID 0)
-- Dependencies: 222
-- Name: insurance_policy_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.insurance_policy_number_seq OWNED BY public.insurance.policy_number;


--
-- TOC entry 225 (class 1259 OID 18515)
-- Name: issue_report; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.issue_report (
    issue_report_id integer NOT NULL,
    rental_id integer NOT NULL,
    issue_type public.issue_type NOT NULL,
    title character varying(255) NOT NULL,
    issue_status public.issue_status NOT NULL,
    description text
);


ALTER TABLE public.issue_report OWNER TO "User1";

--
-- TOC entry 224 (class 1259 OID 18514)
-- Name: issue_report_issue_report_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.issue_report_issue_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.issue_report_issue_report_id_seq OWNER TO "User1";

--
-- TOC entry 3535 (class 0 OID 0)
-- Dependencies: 224
-- Name: issue_report_issue_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.issue_report_issue_report_id_seq OWNED BY public.issue_report.issue_report_id;


--
-- TOC entry 231 (class 1259 OID 18542)
-- Name: item; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.item (
    item_id integer NOT NULL,
    price double precision NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(3000),
    item_status public.item_status NOT NULL
);


ALTER TABLE public.item OWNER TO "User1";

--
-- TOC entry 230 (class 1259 OID 18541)
-- Name: item_item_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.item_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_item_id_seq OWNER TO "User1";

--
-- TOC entry 3536 (class 0 OID 0)
-- Dependencies: 230
-- Name: item_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.item_item_id_seq OWNED BY public.item.item_id;


--
-- TOC entry 238 (class 1259 OID 18574)
-- Name: item_rental; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.item_rental (
    item_id integer NOT NULL,
    rental_id integer NOT NULL
);


ALTER TABLE public.item_rental OWNER TO "User1";

--
-- TOC entry 235 (class 1259 OID 18560)
-- Name: login_history; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.login_history (
    log_id integer NOT NULL,
    user_id integer NOT NULL,
    "timestamp" timestamp without time zone NOT NULL
);


ALTER TABLE public.login_history OWNER TO "User1";

--
-- TOC entry 234 (class 1259 OID 18559)
-- Name: login_history_log_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.login_history_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.login_history_log_id_seq OWNER TO "User1";

--
-- TOC entry 3537 (class 0 OID 0)
-- Dependencies: 234
-- Name: login_history_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.login_history_log_id_seq OWNED BY public.login_history.log_id;


--
-- TOC entry 240 (class 1259 OID 18582)
-- Name: policy_price_list; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.policy_price_list (
    policy_type public.policy_type NOT NULL,
    price double precision NOT NULL
);


ALTER TABLE public.policy_price_list OWNER TO "User1";

--
-- TOC entry 236 (class 1259 OID 18566)
-- Name: price_list; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.price_list (
    vehicle_class public.vehicle_class NOT NULL,
    price double precision NOT NULL,
    interior_cleanness_penalty double precision NOT NULL,
    exterior_cleanness_penalty double precision NOT NULL,
    fuel_level_minor_penalty double precision NOT NULL,
    fuel_level_major_penalty double precision NOT NULL,
    vehicle_body_condition_penalty double precision NOT NULL,
    other_mechanical_damage_minor_penalty double precision NOT NULL,
    other_mechanical_damage_major_penalty double precision NOT NULL
);


ALTER TABLE public.price_list OWNER TO "User1";

--
-- TOC entry 221 (class 1259 OID 18499)
-- Name: rental; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.rental (
    rental_id integer NOT NULL,
    vehicle_id integer NOT NULL,
    item_list_id integer,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    discount_code_id integer,
    client_id integer NOT NULL,
    policy_number integer
);


ALTER TABLE public.rental OWNER TO "User1";

--
-- TOC entry 220 (class 1259 OID 18498)
-- Name: rental_rental_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.rental_rental_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rental_rental_id_seq OWNER TO "User1";

--
-- TOC entry 3538 (class 0 OID 0)
-- Dependencies: 220
-- Name: rental_rental_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.rental_rental_id_seq OWNED BY public.rental.rental_id;


--
-- TOC entry 233 (class 1259 OID 18551)
-- Name: task; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.task (
    task_id integer NOT NULL,
    description character varying(3000) NOT NULL,
    name character varying(300) NOT NULL,
    rental_id integer NOT NULL,
    task_status public.task_status NOT NULL,
    staff_id integer NOT NULL
);


ALTER TABLE public.task OWNER TO "User1";

--
-- TOC entry 232 (class 1259 OID 18550)
-- Name: task_task_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.task_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_task_id_seq OWNER TO "User1";

--
-- TOC entry 3539 (class 0 OID 0)
-- Dependencies: 232
-- Name: task_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.task_task_id_seq OWNED BY public.task.task_id;


--
-- TOC entry 217 (class 1259 OID 18479)
-- Name: user; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    user_email_address character varying(255) NOT NULL,
    name character varying(30) NOT NULL,
    surname character varying(100) NOT NULL,
    permissions public.permissions NOT NULL,
    password character varying(255) NOT NULL,
    account_status public.account_status NOT NULL,
    phone_number character varying(12) NOT NULL,
    date_of_birth date NOT NULL
);


ALTER TABLE public."user" OWNER TO "User1";

--
-- TOC entry 216 (class 1259 OID 18478)
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO "User1";

--
-- TOC entry 3540 (class 0 OID 0)
-- Dependencies: 216
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- TOC entry 219 (class 1259 OID 18490)
-- Name: vehicle; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.vehicle (
    vehicle_id integer NOT NULL,
    brand character varying(30) NOT NULL,
    model character varying(50) NOT NULL,
    year_of_production integer NOT NULL,
    body_type public.body_type NOT NULL,
    status public.vehicle_status NOT NULL,
    number_of_seats integer NOT NULL,
    vehicle_class public.vehicle_class NOT NULL,
    technical_review_date date NOT NULL,
    number_of_doors integer NOT NULL,
    image bytea NOT NULL,
    drive_type public.drive_type NOT NULL,
    engine_power integer NOT NULL,
    engine_capacity double precision NOT NULL,
    fuel_type public.fuel_type NOT NULL,
    tank_capacity double precision NOT NULL,
    registration_number character varying(10) NOT NULL,
    additional_equipment text[],
    description character varying(3000)
);


ALTER TABLE public.vehicle OWNER TO "User1";

--
-- TOC entry 237 (class 1259 OID 18571)
-- Name: vehicle_review; Type: TABLE; Schema: public; Owner: User1
--

CREATE TABLE public.vehicle_review (
    rental_id integer NOT NULL,
    staff_id integer NOT NULL,
    fuel_level public.fuel_level NOT NULL,
    vehicle_body_condition boolean NOT NULL,
    other_mechanical_damage public.other_mechanical_damage NOT NULL,
    interior_cleanness boolean NOT NULL,
    exterior_cleanness boolean NOT NULL
);


ALTER TABLE public.vehicle_review OWNER TO "User1";

--
-- TOC entry 218 (class 1259 OID 18489)
-- Name: vehicle_vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: User1
--

CREATE SEQUENCE public.vehicle_vehicle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vehicle_vehicle_id_seq OWNER TO "User1";

--
-- TOC entry 3541 (class 0 OID 0)
-- Dependencies: 218
-- Name: vehicle_vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: User1
--

ALTER SEQUENCE public.vehicle_vehicle_id_seq OWNED BY public.vehicle.vehicle_id;


--
-- TOC entry 3301 (class 2604 OID 18683)
-- Name: complaint complaint_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.complaint ALTER COLUMN complaint_id SET DEFAULT nextval('public.complaint_complaint_id_seq'::regclass);


--
-- TOC entry 3300 (class 2604 OID 18684)
-- Name: discount_code discount_code_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.discount_code ALTER COLUMN discount_code_id SET DEFAULT nextval('public.discount_code_discount_code_id_seq'::regclass);


--
-- TOC entry 3294 (class 2604 OID 18685)
-- Name: feedback feedback_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.feedback ALTER COLUMN feedback_id SET DEFAULT nextval('public.feedback_feedback_id_seq'::regclass);


--
-- TOC entry 3298 (class 2604 OID 18686)
-- Name: insurance policy_number; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.insurance ALTER COLUMN policy_number SET DEFAULT nextval('public.insurance_policy_number_seq'::regclass);


--
-- TOC entry 3299 (class 2604 OID 18687)
-- Name: issue_report issue_report_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.issue_report ALTER COLUMN issue_report_id SET DEFAULT nextval('public.issue_report_issue_report_id_seq'::regclass);


--
-- TOC entry 3302 (class 2604 OID 18688)
-- Name: item item_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.item ALTER COLUMN item_id SET DEFAULT nextval('public.item_item_id_seq'::regclass);


--
-- TOC entry 3304 (class 2604 OID 18689)
-- Name: login_history log_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.login_history ALTER COLUMN log_id SET DEFAULT nextval('public.login_history_log_id_seq'::regclass);


--
-- TOC entry 3297 (class 2604 OID 18690)
-- Name: rental rental_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.rental ALTER COLUMN rental_id SET DEFAULT nextval('public.rental_rental_id_seq'::regclass);


--
-- TOC entry 3303 (class 2604 OID 18691)
-- Name: task task_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.task ALTER COLUMN task_id SET DEFAULT nextval('public.task_task_id_seq'::regclass);


--
-- TOC entry 3295 (class 2604 OID 18692)
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- TOC entry 3296 (class 2604 OID 18693)
-- Name: vehicle vehicle_id; Type: DEFAULT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.vehicle ALTER COLUMN vehicle_id SET DEFAULT nextval('public.vehicle_vehicle_id_seq'::regclass);


--
-- TOC entry 3513 (class 0 OID 18533)
-- Dependencies: 229
-- Data for Name: complaint; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.complaint (complaint_id, title, client_id, staff_id, complaint_status, description) FROM stdin;
\.


--
-- TOC entry 3523 (class 0 OID 18579)
-- Dependencies: 239
-- Data for Name: cost_distribution; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.cost_distribution (rental_id, vehicle_cost, item_cost, insurance_cost, penalty_charges, total) FROM stdin;
\.


--
-- TOC entry 3511 (class 0 OID 18524)
-- Dependencies: 227
-- Data for Name: discount_code; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.discount_code (discount_code_id, code, discount_type, discount_status, user_id) FROM stdin;
\.


--
-- TOC entry 3499 (class 0 OID 18472)
-- Dependencies: 215
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.feedback (feedback_id, vehicle_rating, comment, client_id, service_rating, rental_id) FROM stdin;
\.


--
-- TOC entry 3507 (class 0 OID 18506)
-- Dependencies: 223
-- Data for Name: insurance; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.insurance (policy_number, name, description, policy_type) FROM stdin;
\.


--
-- TOC entry 3509 (class 0 OID 18515)
-- Dependencies: 225
-- Data for Name: issue_report; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.issue_report (issue_report_id, rental_id, issue_type, title, issue_status, description) FROM stdin;
\.


--
-- TOC entry 3515 (class 0 OID 18542)
-- Dependencies: 231
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.item (item_id, price, name, description, item_status) FROM stdin;
\.


--
-- TOC entry 3522 (class 0 OID 18574)
-- Dependencies: 238
-- Data for Name: item_rental; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.item_rental (item_id, rental_id) FROM stdin;
\.


--
-- TOC entry 3519 (class 0 OID 18560)
-- Dependencies: 235
-- Data for Name: login_history; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.login_history (log_id, user_id, "timestamp") FROM stdin;
\.


--
-- TOC entry 3524 (class 0 OID 18582)
-- Dependencies: 240
-- Data for Name: policy_price_list; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.policy_price_list (policy_type, price) FROM stdin;
\.


--
-- TOC entry 3520 (class 0 OID 18566)
-- Dependencies: 236
-- Data for Name: price_list; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.price_list (vehicle_class, price, interior_cleanness_penalty, exterior_cleanness_penalty, fuel_level_minor_penalty, fuel_level_major_penalty, vehicle_body_condition_penalty, other_mechanical_damage_minor_penalty, other_mechanical_damage_major_penalty) FROM stdin;
\.


--
-- TOC entry 3505 (class 0 OID 18499)
-- Dependencies: 221
-- Data for Name: rental; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.rental (rental_id, vehicle_id, item_list_id, start_time, end_time, discount_code_id, client_id, policy_number) FROM stdin;
\.


--
-- TOC entry 3517 (class 0 OID 18551)
-- Dependencies: 233
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.task (task_id, description, name, rental_id, task_status, staff_id) FROM stdin;
\.


--
-- TOC entry 3501 (class 0 OID 18479)
-- Dependencies: 217
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public."user" (user_id, user_email_address, name, surname, permissions, password, account_status, phone_number, date_of_birth) FROM stdin;
\.


--
-- TOC entry 3503 (class 0 OID 18490)
-- Dependencies: 219
-- Data for Name: vehicle; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.vehicle (vehicle_id, brand, model, year_of_production, body_type, status, number_of_seats, vehicle_class, technical_review_date, number_of_doors, image, drive_type, engine_power, engine_capacity, fuel_type, tank_capacity, registration_number, additional_equipment, description) FROM stdin;
\.


--
-- TOC entry 3521 (class 0 OID 18571)
-- Dependencies: 237
-- Data for Name: vehicle_review; Type: TABLE DATA; Schema: public; Owner: User1
--

COPY public.vehicle_review (rental_id, staff_id, fuel_level, vehicle_body_condition, other_mechanical_damage, interior_cleanness, exterior_cleanness) FROM stdin;
\.


--
-- TOC entry 3542 (class 0 OID 0)
-- Dependencies: 228
-- Name: complaint_complaint_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.complaint_complaint_id_seq', 1, false);


--
-- TOC entry 3543 (class 0 OID 0)
-- Dependencies: 226
-- Name: discount_code_discount_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.discount_code_discount_code_id_seq', 1, false);


--
-- TOC entry 3544 (class 0 OID 0)
-- Dependencies: 214
-- Name: feedback_feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.feedback_feedback_id_seq', 1, false);


--
-- TOC entry 3545 (class 0 OID 0)
-- Dependencies: 222
-- Name: insurance_policy_number_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.insurance_policy_number_seq', 1, false);


--
-- TOC entry 3546 (class 0 OID 0)
-- Dependencies: 224
-- Name: issue_report_issue_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.issue_report_issue_report_id_seq', 1, false);


--
-- TOC entry 3547 (class 0 OID 0)
-- Dependencies: 230
-- Name: item_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.item_item_id_seq', 1, false);


--
-- TOC entry 3548 (class 0 OID 0)
-- Dependencies: 234
-- Name: login_history_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.login_history_log_id_seq', 1, false);


--
-- TOC entry 3549 (class 0 OID 0)
-- Dependencies: 220
-- Name: rental_rental_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.rental_rental_id_seq', 1, false);


--
-- TOC entry 3550 (class 0 OID 0)
-- Dependencies: 232
-- Name: task_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.task_task_id_seq', 1, false);


--
-- TOC entry 3551 (class 0 OID 0)
-- Dependencies: 216
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.user_user_id_seq', 1, false);


--
-- TOC entry 3552 (class 0 OID 0)
-- Dependencies: 218
-- Name: vehicle_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: User1
--

SELECT pg_catalog.setval('public.vehicle_vehicle_id_seq', 1, false);


--
-- TOC entry 3324 (class 2606 OID 18540)
-- Name: complaint complaint_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT complaint_pkey PRIMARY KEY (complaint_id);


--
-- TOC entry 3320 (class 2606 OID 18531)
-- Name: discount_code discount_code_code_key; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.discount_code
    ADD CONSTRAINT discount_code_code_key UNIQUE (code);


--
-- TOC entry 3322 (class 2606 OID 18529)
-- Name: discount_code discount_code_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.discount_code
    ADD CONSTRAINT discount_code_pkey PRIMARY KEY (discount_code_id);


--
-- TOC entry 3306 (class 2606 OID 18477)
-- Name: feedback feedback_id; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_id PRIMARY KEY (feedback_id);


--
-- TOC entry 3316 (class 2606 OID 18513)
-- Name: insurance insurance_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.insurance
    ADD CONSTRAINT insurance_pkey PRIMARY KEY (policy_number);


--
-- TOC entry 3318 (class 2606 OID 18522)
-- Name: issue_report issue_report_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.issue_report
    ADD CONSTRAINT issue_report_pkey PRIMARY KEY (issue_report_id);


--
-- TOC entry 3326 (class 2606 OID 18549)
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (item_id);


--
-- TOC entry 3334 (class 2606 OID 18578)
-- Name: item_rental item_rental_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.item_rental
    ADD CONSTRAINT item_rental_pkey PRIMARY KEY (item_id, rental_id);


--
-- TOC entry 3330 (class 2606 OID 18565)
-- Name: login_history login_history_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.login_history
    ADD CONSTRAINT login_history_pkey PRIMARY KEY (log_id);


--
-- TOC entry 3336 (class 2606 OID 18586)
-- Name: policy_price_list policy_price_list_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.policy_price_list
    ADD CONSTRAINT policy_price_list_pkey PRIMARY KEY (policy_type);


--
-- TOC entry 3332 (class 2606 OID 18570)
-- Name: price_list price_list_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.price_list
    ADD CONSTRAINT price_list_pkey PRIMARY KEY (vehicle_class);


--
-- TOC entry 3314 (class 2606 OID 18504)
-- Name: rental rental_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT rental_pkey PRIMARY KEY (rental_id);


--
-- TOC entry 3328 (class 2606 OID 18558)
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (task_id);


--
-- TOC entry 3308 (class 2606 OID 18486)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3310 (class 2606 OID 18488)
-- Name: user user_user_email_address_key; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_user_email_address_key UNIQUE (user_email_address);


--
-- TOC entry 3312 (class 2606 OID 18497)
-- Name: vehicle vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (vehicle_id);


--
-- TOC entry 3346 (class 2606 OID 18662)
-- Name: complaint fkcomplaint283872; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT fkcomplaint283872 FOREIGN KEY (client_id) REFERENCES public."user"(user_id);


--
-- TOC entry 3347 (class 2606 OID 18667)
-- Name: complaint fkcomplaint297298; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT fkcomplaint297298 FOREIGN KEY (staff_id) REFERENCES public."user"(user_id);


--
-- TOC entry 3355 (class 2606 OID 18612)
-- Name: cost_distribution fkcost_distr595954; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.cost_distribution
    ADD CONSTRAINT fkcost_distr595954 FOREIGN KEY (rental_id) REFERENCES public.rental(rental_id);


--
-- TOC entry 3337 (class 2606 OID 18597)
-- Name: feedback fkfeedback369708; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT fkfeedback369708 FOREIGN KEY (rental_id) REFERENCES public.rental(rental_id);


--
-- TOC entry 3338 (class 2606 OID 18672)
-- Name: feedback fkfeedback844725; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT fkfeedback844725 FOREIGN KEY (client_id) REFERENCES public."user"(user_id);


--
-- TOC entry 3344 (class 2606 OID 18642)
-- Name: insurance fkinsurance151954; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.insurance
    ADD CONSTRAINT fkinsurance151954 FOREIGN KEY (policy_type) REFERENCES public.policy_price_list(policy_type);


--
-- TOC entry 3345 (class 2606 OID 18592)
-- Name: issue_report fkissue_repo917852; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.issue_report
    ADD CONSTRAINT fkissue_repo917852 FOREIGN KEY (rental_id) REFERENCES public.rental(rental_id);


--
-- TOC entry 3353 (class 2606 OID 18607)
-- Name: item_rental fkitem_renta544906; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.item_rental
    ADD CONSTRAINT fkitem_renta544906 FOREIGN KEY (rental_id) REFERENCES public.rental(rental_id);


--
-- TOC entry 3354 (class 2606 OID 18602)
-- Name: item_rental fkitem_renta991410; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.item_rental
    ADD CONSTRAINT fkitem_renta991410 FOREIGN KEY (item_id) REFERENCES public.item(item_id);


--
-- TOC entry 3350 (class 2606 OID 18657)
-- Name: login_history fklogin_hist47353; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.login_history
    ADD CONSTRAINT fklogin_hist47353 FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- TOC entry 3340 (class 2606 OID 18637)
-- Name: rental fkrental165853; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT fkrental165853 FOREIGN KEY (vehicle_id) REFERENCES public.vehicle(vehicle_id);


--
-- TOC entry 3341 (class 2606 OID 18617)
-- Name: rental fkrental477366; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT fkrental477366 FOREIGN KEY (policy_number) REFERENCES public.insurance(policy_number);


--
-- TOC entry 3342 (class 2606 OID 18677)
-- Name: rental fkrental768557; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT fkrental768557 FOREIGN KEY (client_id) REFERENCES public."user"(user_id);


--
-- TOC entry 3343 (class 2606 OID 18587)
-- Name: rental fkrental848806; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT fkrental848806 FOREIGN KEY (discount_code_id) REFERENCES public.discount_code(discount_code_id);


--
-- TOC entry 3348 (class 2606 OID 18647)
-- Name: task fktask315433; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fktask315433 FOREIGN KEY (rental_id) REFERENCES public.rental(rental_id);


--
-- TOC entry 3349 (class 2606 OID 18652)
-- Name: task fktask317830; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fktask317830 FOREIGN KEY (staff_id) REFERENCES public."user"(user_id);


--
-- TOC entry 3339 (class 2606 OID 18632)
-- Name: vehicle fkvehicle395012; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT fkvehicle395012 FOREIGN KEY (vehicle_class) REFERENCES public.price_list(vehicle_class);


--
-- TOC entry 3351 (class 2606 OID 18622)
-- Name: vehicle_review fkvehicle_re22558; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.vehicle_review
    ADD CONSTRAINT fkvehicle_re22558 FOREIGN KEY (rental_id) REFERENCES public.rental(rental_id);


--
-- TOC entry 3352 (class 2606 OID 18627)
-- Name: vehicle_review fkvehicle_re610705; Type: FK CONSTRAINT; Schema: public; Owner: User1
--

ALTER TABLE ONLY public.vehicle_review
    ADD CONSTRAINT fkvehicle_re610705 FOREIGN KEY (staff_id) REFERENCES public."user"(user_id);


-- Completed on 2023-03-26 22:41:51

--
-- PostgreSQL database dump complete
--

