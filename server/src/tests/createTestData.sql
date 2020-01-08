INSERT INTO user VALUES(default, 'Hans Hansen', 'hans@hansen.com', default, 'dfghjklfghj', 'fghjkfghjkh', 'Arrangør', default);

INSERT INTO user VALUES(default, 'Roy Narvestad', 'roy@hotmail.com', default, 'qwertyuty', 'cbnmnnm', 'Arrangør', default);

INSERT INTO user VALUES(default, 'Jens Jensen', 'jens@jensen.com', default, 'dfghjkfghjkfghjk', 'zxcvbnmxcvb', 'Artist', default);

INSERT INTO user VALUES(default, 'Navn Navnesen', 'navn@navnesen.com', default, 'ajjjajajjjjs', 'uriueriueriei', 'Frivillig', default);

INSERT INTO rider VALUES(default, 'Julebrus');
INSERT INTO rider VALUES(default, 'Potetgull');
INSERT INTO rider VALUES(default, 'Forsterker');
INSERT INTO rider VALUES(default, 'Lyskaster');
INSERT INTO rider VALUES(default, 'Lydmann');
INSERT INTO rider VALUES(default, 'Lysmann');

INSERT INTO event VALUES(DEFAULT, 2, 'Øyafestivalen', 'Hovinveien 12', '2020-01-07 15:00:00', '2020-01-08 23:00:00', 1000, 'Kommende');


INSERT INTO event VALUES(DEFAULT, 3, 'Astrid S konsert', 'Elgseter Gate 1', '2020-01-18 21:00:00', '2020-01-08 23:30:00', 300, 'Kommende');

INSERT INTO ticket VALUES(default, 1, 600, 'Ståplass');
INSERT INTO ticket VALUES(default, 2, 500, 'Sitteplass');
INSERT INTO ticket VALUES(default, 2, 1000, 'VIP');

INSERT INTO attachment VALUES(default, 2, 1, 'x’12F’');
INSERT INTO attachment VALUES(default, 1, 2, 'x’34E’');


INSERT INTO user_event VALUES(3,1);

INSERT INTO user_event VALUES(4,1);

INSERT INTO rider_list VALUES(DEFAULT, 3, 1, 1);

