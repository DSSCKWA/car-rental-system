(Import)
1. Add .sql file to  PostgreSQL\15\bin
2. In cmd in PostgreSQL\15\bin write: psql -h localhost -U postgres -f car_rental_service.sql

(Export) Choose "Backup" in pgAdmin4
1. General:
Filename: car_rental_service.sql
Format: Plain
Encoding: UTF-8
2. Data/Objects stays default
3. Options - switch first 4 to "yes"
4. Add to script:
CREATE USER  crs_user  with PASSWORD 'CRS';   - before line 27
ALTER DATABASE car_rental_service OWNER TO crs_user;  - at the very end


(Possible improvements)
1. Add some sort of "IF Exist" to "create user ..." statement
