## データベース定義

### users
```
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255),
  `lastname` VARCHAR(255),
  `email` VARCHAR(255),
  `password` VARCHAR(255),
  PRIMARY KEY (`user_id`)
);

INSERT INTO users (user_id, firstname, lastname, email, password) VALUES (1, "saki", "kasima", "saki@example.com", "sakikasima");
INSERT INTO users (user_id, firstname, lastname, email, password) VALUES (2, "mayu", "iwatani", "mayu@example.com", "mayuiwatani");
INSERT INTO users (user_id, firstname, lastname, email, password) VALUES (3, "tamu", "nakano", "tamu@example.com", "tamunakano");
INSERT INTO users (user_id, firstname, lastname, email, password) VALUES (4, "utami", "hayasisita", "utami@example.com", "utamihayasisita");
```

### groups
```
DROP TABLE IF EXISTS groups;

CREATE TABLE groups (
  `group_id` INT NOT NULL AUTO_INCREMENT,
  `admin_id` INT NOT NULL,
  `groupname` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`group_id`)
);

INSERT INTO groups (group_id, admin_id, groupname) VALUES (1, 1, "oedotai");
INSERT INTO groups (group_id, admin_id, groupname) VALUES (2, 2, "stars");
INSERT INTO groups (group_id, admin_id, groupname) VALUES (3, 3, "cosmic_angels");
INSERT INTO groups (group_id, admin_id, groupname) VALUES (4, 4, "queens_quest");
```

### rooms
```
DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms (
  `group_id` INT NOT NULL,
  `admin_id` INT NOT NULL,
  `room_id` INT NOT NULL,
  `roomname` VARCHAR(255) NOT NULL
);

INSERT INTO rooms (group_id, admin_id, room_id, roomname) VALUES (1, 1, 1, "oedotai_room");
INSERT INTO rooms (group_id, admin_id, room_id, roomname) VALUES (2, 2, 2, "stars_room");
INSERT INTO rooms (group_id, admin_id, room_id, roomname) VALUES (3, 3, 3, "cosmic_angels_room");
INSERT INTO rooms (group_id, admin_id, room_id, roomname) VALUES (4, 4, 4, "queens_quest_room");
```

### members
```
DROP TABLE IF EXISTS members;

CREATE TABLE members (
  `group_id` INT NOT NULL,
  `user_id` INT NOT NULL
);

INSERT INTO members (group_id, user_id) VALUES (1, 1);
INSERT INTO members (group_id, user_id) VALUES (2, 2);
INSERT INTO members (group_id, user_id) VALUES (3, 3);
INSERT INTO members (group_id, user_id) VALUES (4, 4);
```

### events
```
DROP TABLE IF EXISTS events;

CREATE TABLE events (
  `group_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `contents` VARCHAR(255) NOT NULL,
  `start_time` VARCHAR(255) NOT NULL
);

INSERT INTO events (group_id, event_id, title, contents, start_time) VALUES (1, 1, "oedotai_event", "oedotai_event1", "2021-09-20T15:04");
INSERT INTO events (group_id, event_id, title, contents, start_time) VALUES (2, 1, "stars_event", "stars_event1", "2021-09-20T15:04");
INSERT INTO events (group_id, event_id, title, contents, start_time) VALUES (3, 1, "cosmic_angels_event", "cosmic_angels_event1", "2021-09-20T15:04");
INSERT INTO events (group_id, event_id, title, contents, start_time) VALUES (4, 1, "queens_quest_event", "queens_quest_event1", "2021-09-20T15:04");
INSERT INTO events (group_id, event_id, title, contents, start_time) VALUES (4, 1, "queens_quest_event", "queens_quest_event1", "2021-09-21T15:04");
INSERT INTO events (group_id, event_id, title, contents, start_time) VALUES (4, 1, "queens_quest_event", "queens_quest_event1", "2021-09-22T15:04");
```


### messages
```
DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `room_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `message` VARCHAR(255),
  PRIMARY KEY (`message_id`)
);

INSERT INTO messages (message_id, room_id, user_id, username, message) VALUES (1, 1, 1, "saki", "are you free");
INSERT INTO messages (message_id, room_id, user_id, username, message) VALUES (2, 1, 2, "mayu", "yes");
INSERT INTO messages (message_id, room_id, user_id, username, message) VALUES (3, 1, 1, "saki", "take my home");
INSERT INTO messages (message_id, room_id, user_id, username, message) VALUES (4, 1, 2, "mayu", "ok!");
```

### movies
```
DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  `group_id` INT NOT NULL,
  `admin_id` INT NOT NULL,
  `movie_id` INT NOT NULL,
  `moviename` VARCHAR(255) NOT NULL,
  `movie` MEDIUMBLOB
);

INSERT INTO movies (group_id, admin_id, movie_id, moviename) VALUES (1, 1, 1, "oedotai_movie");

```