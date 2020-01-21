DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS attachment_user;
DROP TABLE IF EXISTS attachment;
DROP TABLE IF EXISTS rider_list;
DROP TABLE IF EXISTS user_event;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS user;



CREATE TABLE IF NOT EXISTS user (
  user_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  mobile INT NULL,
  hash VARCHAR(45) NOT NULL,
  salt VARCHAR(256) NOT NULL,
  type VARCHAR(45)  NOT NULL,
  picture LONGBLOB NULL,
  PRIMARY KEY (user_id))
ENGINE = InnoDB;
 

 
CREATE TABLE IF NOT EXISTS event (
  event_id INT NOT NULL AUTO_INCREMENT,
  organizer INT,
  name VARCHAR(45) NOT NULL,
  address VARCHAR(45) NOT NULL,
  from_date DATETIME NOT NULL,
  to_date DATETIME NOT NULL,
  capacity INT NOT NULL,
  status INT NOT NULL,
information TEXT NOT NULL,
category VARCHAR(45) NOT NULL,
picture LONGBLOB NOT NULL,

  PRIMARY KEY (event_id),
	FOREIGN KEY (organizer)
	REFERENCES user (user_id)
	ON DELETE SET NULL
	ON UPDATE CASCADE)
ENGINE = InnoDB;
 
 
DROP TABLE IF EXISTS user_event ;
 
CREATE TABLE IF NOT EXISTS user_event (
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  PRIMARY KEY (user_id, event_id),
	FOREIGN KEY (user_id)
	REFERENCES user (user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY (event_id)
	REFERENCES event (event_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE)
ENGINE = InnoDB;
 
 
CREATE TABLE IF NOT EXISTS rider_list (
  rider_list_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  event_id INT,
  text VARCHAR(256),
    PRIMARY KEY (rider_list_id),
	FOREIGN KEY (user_id)
	REFERENCES user (user_id)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
	FOREIGN KEY (event_id)
	REFERENCES event (event_id)
	ON DELETE SET NULL
	ON UPDATE CASCADE)
ENGINE = InnoDB;

 
CREATE TABLE IF NOT EXISTS attachment (
  attachment_id INT NOT NULL AUTO_INCREMENT,
  event_id INT NOT NULL,
  user_id INT,
  data LONGBLOB NOT NULL,
  filetype VARCHAR(512) NOT NULL,
  filename VARCHAR(512) NOT NULL,
  filesize INT NOT NULL,
  PRIMARY KEY (attachment_id),
	FOREIGN KEY (event_id)
	REFERENCES event (event_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY (user_id)
	REFERENCES user (user_id)
	ON DELETE SET NULL
	ON UPDATE CASCADE
)
ENGINE = InnoDB;
 

 
CREATE TABLE IF NOT EXISTS ticket (
  ticket_id INT NOT NULL AUTO_INCREMENT,
  event_id INT NOT NULL,
  price INT NOT NULL,
  type VARCHAR(45) NOT NULL,
  available INT NOT NULL,
  PRIMARY KEY (ticket_id),
	FOREIGN KEY (event_id)
	REFERENCES event (event_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE)
ENGINE = InnoDB;

 DROP TABLE IF EXISTS attachment_user;

CREATE TABLE IF NOT EXISTS attachment_user (
	attachment_id INT NOT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY (attachment_id, user_id),
		FOREIGN KEY (attachment_id)
		REFERENCES attachment (attachment_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
		FOREIGN KEY (user_id)
		REFERENCES user (user_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE)
	ENGINE = InnoDB;
