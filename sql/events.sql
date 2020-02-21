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
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(255) NOT NULL,
  `eventname` varchar(500) NOT NULL,
  `ticketname` varchar(500) NOT NULL,
  `hash` varchar(500) DEFAULT NULL,
  `points` int(255) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `eventname`, `ticketname`, `hash`, `points`) VALUES
(1, 'General Registration', 'General Registration', '18514', '0'),
(2, 'Startup Street', 'Startup Street', '18516', '0'),
(3, 'Art of Argumentation', 'Art of Argumentation', '18517', '0'),
(4, 'Entrepreneurship 101', 'Entrepreneurship 101', '18518', '0'),
(5, 'Digital Marketing', 'Digital Marketing', '18519', '0'),
(6, 'Machine Learning', 'Machine Learning', '18520', '0'),
(7, 'Internet of Things IoT', 'Internet of Things IoT', '18521', '0'),
(8, 'Art of money making online', 'Art of money making online', '18522', '0'),
(9, 'Bootcamp to Entrepreneurs', 'Bootcamp to Entrepreneurs', '18643', '0'),
(10, '6 Degree Talk - DAY 1', '6 Degree Talk - DAY 1', '18645', '0'),
(11, '6 Degree Talk - DAY 2', '6 Degree Talk - DAY 2', '18646', '0'),
(12, 'Accommodation - DAY 1', 'Accommodation - DAY 1', '18647', '0'),
(13, 'Accommodation - DAY 2', 'Accommodation - DAY 2', '18648', '0');
--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `hash` (`hash`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
