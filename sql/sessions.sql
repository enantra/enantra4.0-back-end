-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 10, 2019 at 06:56 PM
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
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(255) NOT NULL,
  `sessionid` varchar(500) NOT NULL,
  `eid` varchar(500) NOT NULL,
  `token` varchar(500) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `sessionid`, `eid`, `token`, `createdat`) VALUES
(1, 'MKKCAKFC1V', 'E20-NQC3ATSTY0', 'JJ96QYZKMWCTO1MADSXKYVRGWRJH16MCBV70U9LT', '2019-01-08 10:47:37'),
(2, 'UJFKC1KVJL', 'E20-NQC3ATSTY0', 'AYK8GHSNWGYVMWUYR3RSCHGO7U3GBBDHCSHVXNOI', '2019-01-08 10:57:58'),
(3, '5K12DDY6UW', 'E20-NQC3ATSTY0', '60FDG8BGOMMV0T4QWUSXYD7PCFTK6PCGATXVTJBJ', '2019-01-08 10:58:53'),
(4, 'OIKCZGR3GC', 'E20-NQC3ATSTY0', 'ZSXPLEGKCGISI9LRV2NPCBCZONDADOWE9TITBCTY', '2019-01-08 10:59:22'),
(5, 'CARW4LQKH3', 'E20-NQC3ATSTY0', 'CUGZXBDLCMLMHD8FTO5VDAYWLDKBFGRCQ3LFOM4D', '2019-01-08 11:00:23'),
(6, 'RAISV6F9JY', 'E20-LJQOCVYYP8', 'W0HB27UTTPIJT7IA4CRJJJHT0ZRIVYFRJNXJISBH', '2019-01-08 14:50:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eid` (`eid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `users` (`eid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
