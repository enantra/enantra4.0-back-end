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
-- Table structure for table `ebm`
--

CREATE TABLE `ebm` (
  `id` int(255) NOT NULL,
  `eid` varchar(500) NOT NULL,
  `refcode` varchar(500) NOT NULL,
  `count` int(255) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ebm`
--

INSERT INTO `ebm` (`id`, `eid`, `refcode`, `count`) VALUES
(1, 'E20-ZRJNTHLCNY', 'admin', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ebm`
--
ALTER TABLE `ebm`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `refcode` (`refcode`),
  ADD KEY `eid` (`eid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ebm`
--
ALTER TABLE `ebm`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ebm`
--
ALTER TABLE `ebm`
  ADD CONSTRAINT `ebm_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `users` (`eid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
