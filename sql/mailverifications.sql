-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 10, 2019 at 06:55 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `klaus`
--

-- --------------------------------------------------------

--
-- Table structure for table `mailverifications`
--

CREATE TABLE `mailverifications` (
  `id` int(255) NOT NULL,
  `eid` varchar(500) NOT NULL,
  `token` varchar(500) NOT NULL,
  `expiry` bigint(30) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mailverifications`
--

INSERT INTO `mailverifications` (`id`, `eid`, `token`, `expiry`, `createdat`) VALUES
(3, 'E20-ZRJNTHLCNY', 'FSFIUILEXNXRFOFBMQV0WUS2C4HTPOFRPIPNYD6L', 1546956356457, '2019-01-08 11:05:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mailverifications`
--
ALTER TABLE `mailverifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `eid` (`eid`),
  ADD UNIQUE KEY `token` (`token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mailverifications`
--
ALTER TABLE `mailverifications`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mailverifications`
--
ALTER TABLE `mailverifications`
  ADD CONSTRAINT `mailverifications_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `users` (`eid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
