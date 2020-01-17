INSERT INTO user VALUES(default, 'Hans Hansen', 'hans@hansen.com', default, 'dfghjklfghj', 'fghjkfghjkh', 'organizer', default);
 
INSERT INTO user VALUES(default, 'Roy Narvestad', 'roy@hotmail.com', default, 'qwertyuty', 'cbnmnnm', 'organizer', default);
 
INSERT INTO user VALUES(default, 'Jens Jensen', 'jens@jensen.com', default, 'dfghjkfghjkfghjk', 'zxcvbnmxcvb', 'artist', default);
 
INSERT INTO user VALUES(default, 'Navn Navnesen', 'navn@navnesen.com', default, 'ajjjajajjjjs', 'uriueriueriei', 'volunteer', default);
 
INSERT INTO rider VALUES(default, 'Julebrus');
INSERT INTO rider VALUES(default, 'Potetgull');
INSERT INTO rider VALUES(default, 'Forsterker');
INSERT INTO rider VALUES(default, 'Lyskaster');
INSERT INTO rider VALUES(default, 'Lydmann');
INSERT INTO rider VALUES(default, 'Lysmann');
 
INSERT INTO event VALUES(DEFAULT, 2, 'Øyafestivalen', 'Hovinveien 12', '2020-01-07 15:00:00', '2020-01-08 23:00:00', 1000, 'kommende', 'Norges største festival – løp og kjøp!', 'festival', 'x’23BC');
 
INSERT INTO event VALUES(DEFAULT, 1, 'Astrid S konsert', 'Elgseter Gate 1', '2020-01-18 21:00:00', '2020-01-08 23:30:00', 300, 'kommende', 'Detta må du få med deg', 'konsert', 'x’12D');
 
INSERT INTO ticket VALUES(default, 1, 600, 'ståplass', 20);
INSERT INTO ticket VALUES(default, 2, 500, 'sitteplass', 75);
INSERT INTO ticket VALUES(default, 2, 1000, 'vip', 16);
 
INSERT INTO attachment VALUES(default, 2, 1, 'x’12F','txt','test',1024);
INSERT INTO attachment VALUES(default, 1, 2, 'x’34E','xml','test2',10);
 
INSERT INTO user_event VALUES(2,1);
INSERT INTO user_event VALUES(1,1);
INSERT INTO user_event VALUES(3,1);
INSERT INTO user_event VALUES(4,1);
 
INSERT INTO rider_list VALUES(DEFAULT, 3, 1, 1, DEFAULT, 5);
 
INSERT INTO attachment_user VALUES(1,1);
INSERT INTO attachment_user VALUES(2,2);

 
 


