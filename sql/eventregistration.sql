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
-- Table structure for table `eventregistration`
--

CREATE TABLE `eventregistration` (
  `id` int(255) NOT NULL,
  `event` int(255) NOT NULL,
  `eid` varchar(500) NOT NULL,
  `status` int(255) NOT NULL DEFAULT '1',
  `referral` varchar(500) NOT NULL,
  `discount` int(255) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventregistration`
--

INSERT INTO `eventregistration` (`id`, `event`, `eid`, `status`, `referral`, `discount`) VALUES
(2, 1, 'E20-ZRJNTHLCNY', 1, 'admin', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `eventregistration`
--
ALTER TABLE `eventregistration`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event` (`event`),
  ADD KEY `eid` (`eid`),
  ADD KEY `status` (`status`),
  ADD KEY `referral` (`referral`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `eventregistration`
--
ALTER TABLE `eventregistration`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `eventregistration`
--
ALTER TABLE `eventregistration`
  ADD CONSTRAINT `eventregistration_ibfk_1` FOREIGN KEY (`event`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `eventregistration_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `users` (`eid`),
  ADD CONSTRAINT `eventregistration_ibfk_3` FOREIGN KEY (`status`) REFERENCES `paymentstatus` (`id`),
  ADD CONSTRAINT `eventregistration_ibfk_4` FOREIGN KEY (`referral`) REFERENCES `ebm` (`refcode`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
