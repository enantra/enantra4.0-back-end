show create table users;
set foreign_key_checks=1;

select * from sessions;

select * from users;

CREATE TABLE `ebm` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `eid` varchar(500) NOT NULL,
  `refcode` varchar(500) NOT NULL,
  `count` int(255) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `refcode` (`refcode`),
  KEY `eid` (`eid`),
  CONSTRAINT `ebm_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `users` (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `eventregistration` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `event` int(255) NOT NULL,
  `eid` varchar(500) NOT NULL,
  `status` int(255) NOT NULL DEFAULT '1',
  `referral` varchar(500) NOT NULL,
  `discount` int(255) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `event` (`event`),
  KEY `eid` (`eid`),
  KEY `status` (`status`),
  KEY `referral` (`referral`),
  CONSTRAINT `eventregistration_ibfk_1` FOREIGN KEY (`event`) REFERENCES `events` (`id`),
  CONSTRAINT `eventregistration_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `users` (`eid`),
  CONSTRAINT `eventregistration_ibfk_3` FOREIGN KEY (`status`) REFERENCES `paymentstatus` (`id`),
  CONSTRAINT `eventregistration_ibfk_4` FOREIGN KEY (`referral`) REFERENCES `ebm` (`refcode`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `events` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `eventname` varchar(500) NOT NULL,
  `ticketname` varchar(500) NOT NULL,
  `hash` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hash` (`hash`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `gender` (
  `id` int(255) NOT NULL,
  `gender` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `mailverifications` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `eid` varchar(500) NOT NULL,
  `token` varchar(500) NOT NULL,
  `expiry` bigint(30) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `eid` (`eid`),
  UNIQUE KEY `token` (`token`),
  CONSTRAINT `mailverifications_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `users` (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

CREATE TABLE `paymentstatus` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `status` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

CREATE TABLE `regdump` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `email` varchar(500) NOT NULL,
  `name` varchar(500) NOT NULL,
  `ticketname` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `sessions` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `sessionid` varchar(500) NOT NULL,
  `eid` varchar(500) NOT NULL,
  `token` varchar(500) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `eid` (`eid`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `users` (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `eid` varchar(500) NOT NULL,
  `name` varchar(500) NOT NULL,
  `dob` varchar(500) DEFAULT NULL,
  `gender` int(255) NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone` bigint(40) NOT NULL,
  `college` varchar(500) NOT NULL,
  `year` int(255) DEFAULT NULL,
  `department` varchar(50) NULL,  
  `block` int(1) NOT NULL DEFAULT '1',
  `loggedin` int(1) NOT NULL DEFAULT '0',
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedat` datetime DEFAULT NULL,
  `city` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `eid` (`eid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

alter table events add points int(255) default 0;