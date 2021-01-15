USE `crm`;

DROP TABLE IF EXISTS `client`;

DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
    `id` int(11) NOT NULL,
    `country` varchar(60) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `email_type`;
CREATE TABLE `email_type` (
    `id` int(11) NOT NULL,
    `email_type` varchar(1) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `owner`;
CREATE TABLE `owner` (
    `id` int(11) NOT NULL,
    `owner` varchar(40) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `client` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `last` varchar(40) DEFAULT NULL,
    `first` varchar(40) DEFAULT NULL,
    `sold` tinyint(1) DEFAULT NULL,
    `first_contact` varchar(40) DEFAULT NULL,
    `email_type_id` int(11) DEFAULT NULL,
    `owner_id` int(11) DEFAULT NULL,
    `country_id` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`email_type_id`) REFERENCES `email_type` (`id`),
    FOREIGN KEY (`owner_id`) REFERENCES `owner` (`id`),
    FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
);