-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2023 at 05:21 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `followId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`followId`, `userId`, `vacationId`) VALUES
(47, 9, 24),
(53, 8, 28),
(57, 9, 30),
(66, 8, 24),
(71, 8, 23),
(72, 8, 31),
(73, 8, 27),
(74, 8, 22);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userFirstName` varchar(20) NOT NULL,
  `userLastName` varchar(20) NOT NULL,
  `userEmail` varchar(50) NOT NULL,
  `userPassword` varchar(1000) NOT NULL,
  `userRole` enum('User','Admin') NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userFirstName`, `userLastName`, `userEmail`, `userPassword`, `userRole`) VALUES
(7, 'gershon', 'bookey', 'gershon@gershon.com', '0f85d418a2bb929d8a6bf388999238642771282123c04f50baaeb77e72cd31e6edd7bfa6a21724b0fcb5d5f78590cad0561f5f4a0145900115c361f76e8cb588', 'Admin'),
(8, 'baily', 'bookey', 'baily@baily.com', '11b6b3bd24c49a8a088ef4906e2ba840c01d02fa84ee0225586728217be5c391ddf77b82e76e4e84104abc6e9ea4244ceb2f50928cd882a6fc6be2bf934fe7bf', 'User'),
(9, 'yanky', 'bookey', 'yanky@yanky.com', '2b33fd890b6d0bcb6ec566c90454db7e1238cda8ffbdfdae6f80792b74ca5082420fa1ce1253a4ea4e3041487128812e7f9cb12024d78e2fad7de3fd0de5800a', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationDestination` varchar(30) NOT NULL,
  `vacationDescription` varchar(5000) NOT NULL,
  `vacationStart` varchar(50) NOT NULL,
  `vacationEnd` varchar(50) NOT NULL,
  `vacationPrice` decimal(6,2) NOT NULL,
  `vacationImgName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationDestination`, `vacationDescription`, `vacationStart`, `vacationEnd`, `vacationPrice`, `vacationImgName`) VALUES
(21, 'Rome', 'Immerse yourself in Rome\'s grandeur on a week-long high-end vacation. Stay at a luxurious hotel in the city center. Explore ancient Rome\'s iconic landmarks, visit the Vatican City for art and culture, indulge in personalized shopping, and take a private helicopter tour to Tuscan vineyards. Discover Renaissance art, enjoy a sunset cruise, and embark on a day trip to the Amalfi Coast. Conclude with a private cooking class and farewell dinner. With personalized service and opulent accommodations, create unforgettable memories in the Eternal City.', '2023-08-01', '2023-08-07', '6995.00', '097e875a-f1f1-45dc-bd8f-fb7d745a8692.jpg'),
(22, 'Phuket', 'Experience the best of Phuket with a mid-range vacation. Enjoy pristine beaches, vibrant nightlife, and cultural wonders. Stay in comfortable accommodations, explore the vibrant streets of Patong, indulge in Thai cuisine, and visit iconic landmarks like the Big Buddha. Relax on stunning beaches like Kata and Karon, take a boat tour to Phi Phi Islands, and immerse yourself in the local culture at Old Phuket Town. With a mix of relaxation and adventure, this affordable trip offers a perfect balance for an unforgettable Phuket getaway.', '2024-02-01', '2024-02-05', '795.00', 'dd583d80-7459-4360-b177-f7b9cdc652d8.jpg'),
(23, 'New York City', 'Immerse yourself in the iconic attractions that make NYC a global metropolis. Explore the dazzling lights of Times Square, stroll through the green oasis of Central Park, admire the grandeur of the Statue of Liberty, and ascend the Empire State Building for breathtaking views. Experience the magic of Broadway with captivating shows that transport you to another world. Delve into art and culture at renowned museums like the Metropolitan Museum of Art and Museum of Modern Art. Indulge in a shopping spree on Fifth Avenue and savor a diverse culinary journey. Enjoy a comfortable stay at a centrally located hotel in Midtown, complete with complimentary breakfast. Benefit from a dedicated tour guide, discounted attraction tickets, and convenient transportation services. Discover the vibrant energy of New York City on this enticing vacation package', '2023-07-02', '2023-07-09', '4595.00', '7ce69044-9e9e-448e-a714-6062b56cfa9c.jpg'),
(24, 'Ho Chi Minh City', 'Embark on an affordable two-week adventure in Ho Chi Minh City, Vietnam. Immerse yourself in the captivating history and vibrant culture without breaking the bank. Explore the bustling streets, visit iconic landmarks like the War Remnants Museum and Reunification Palace. Indulge in the tantalizing street food and authentic Vietnamese cuisine available at budget-friendly prices. Cruise along the enchanting Mekong Delta, discover the historical significance of the Cu Chi Tunnels. Experience local life in charming towns nearby.\r\nWith budget accommodations and cost-effective transportation options, this package allows you to discover the wonders of Ho Chi Minh City on a shoestring budget. Uncover the hidden gems, connect with the warmth of the Vietnamese people, and create lasting memories of your affordable adventure in Vietnam. Book your package vacation now and embark on an incredible journey that combines affordability with the richness of Vietnamese culture.', '2023-06-01', '2023-06-14', '995.00', '3532217d-8db1-41b6-90b6-7d9e466e7640.jpg'),
(25, 'Maldives', 'Indulge in the ultimate luxury with a Labor Day weekend getaway to the Maldives. Experience the epitome of paradise with pristine white-sand beaches, crystal-clear turquoise waters, and luxurious resorts. Relax in overwater villas with private pools, indulge in world-class spa treatments, and savor gourmet cuisine from renowned chefs. Immerse yourself in underwater adventures with snorkeling or diving amidst vibrant coral reefs and exotic marine life. Enjoy sunset cruises, private beach dinners, and pampering in exclusive spas. This opulent escape guarantees an unforgettable experience filled with relaxation, romance, and unparalleled beauty in the breathtaking Maldives.', '2023-08-31', '2023-09-04', '6995.00', '6dc57178-a94b-49f9-b2ad-06750c8291bb.jpg'),
(26, 'United Kingdom', 'Dive into the rich tapestry of city exploration and exhilarating outdoor adventures through the captivating landscapes of the United Kingdom! Be enthralled by the iconic tourist attractions that have captured the world\'s imagination, while also uncovering the hidden gems and wonders that await your discovery. Indulge in delightful accommodations, ranging from quaint and cozy guesthouses nestled in picturesque countryside to unique stays that offer a glimpse into the local culture. Traverse the country with comfort, relishing in the charm of scenic train rides that offer breathtaking vistas, embarking on exhilarating ferry crossings that connect you with stunning coastal landscapes. Every step of this enchanting backpacking expedition will be filled with unforgettable moments, as you create cherished memories that will stay with you forever. Get ready for a transformative experience that will leave you inspired and captivated by the beauty that the UK has to offer!', '2023-06-30', '2023-07-13', '845.00', '40707199-999c-40fc-b604-2506750826f7.jpg'),
(27, 'Queenstown', 'Embark on a stylish and unforgettable journey to Queenstown, New Zealand. Experience the best of luxury in one of the world\'s most breathtaking destinations. Stay in opulent accommodations that offer stunning views of the surrounding mountains and lakes. Indulge in gourmet dining at award-winning restaurants and vineyards, sampling the finest local cuisine and wines. Take part in thrilling outdoor adventures like bungee jumping, jet boating, and heli-skiing, all accompanied by experienced guides. Enjoy exclusive spa treatments and wellness experiences to relax and rejuvenate. Explore the picturesque landscapes of Milford Sound and the Remarkables, taking in the beauty of nature in ultimate comfort. This luxurious trip to Queenstown promises a perfect blend of adrenaline-pumping activities, indulgent relaxation, and exquisite experiences in an awe-inspiring setting', '2024-01-09', '2024-01-16', '5995.00', 'ca8a5b34-1d1b-415d-84f2-3401aa853504.jpg'),
(28, 'Prague', 'Escape to Prague with our enchanting 3-night romantic getaway. Immerse yourselves in its timeless beauty, where cobblestone streets whisper tales of history and mesmerizing architecture awaits.\r\n\r\nUnwind in our handpicked boutique hotel, an oasis of elegance in Prague\'s heart. Enjoy the intimate ambiance of your exquisitely designed room, toast with champagne, and plan your adventures.\r\n\r\nEmbark on a romantic river cruise along the Vltava, gliding beneath the iconic Charles Bridge. Marvel at Prague Castle and discover hidden gems in the Lesser Town.\r\n\r\nIndulge in Prague\'s culinary delights, savoring a candlelit dinner at a Michelin-starred restaurant. Immerse yourselves in the city\'s arts scene, from classical music concerts to the Prague National Gallery.\r\n\r\nBook your 3-night romantic getaway to Prague today and create unforgettable memories in this fairytale city.', '2023-08-09', '2023-08-12', '1495.00', 'd16b6c7e-8ae6-45aa-9005-2b3b34c4eee1.jpg'),
(29, 'Kruger National Park', 'Embark on an exciting and immersive two-week adventure in Kruger National Park, South Africa, perfect for teenagers. Experience the thrill of wildlife encounters and the beauty of the African wilderness. Stay in comfortable safari lodges or campsites within the park, surrounded by nature. Participate in guided game drives and bushwalks, led by experienced rangers, to spot the Big Five and other incredible wildlife species. Learn about conservation efforts and engage in educational activities, such as tracking animals and identifying bird species. Explore the diverse ecosystems of Kruger, including rivers, grasslands, and woodlands, all teeming with unique flora and fauna. Take part in community-based initiatives, such as visiting local villages and learning about the local culture. This teenager getaway promises an unforgettable wildlife experience, educational opportunities, and a chance to connect with nature in one of Africa\'s most iconic national parks', '2023-06-04', '2023-06-18', '2695.00', 'e01bfaad-4fa2-49aa-803a-6b75a1f418e2.jpg'),
(30, 'Hawaii', 'Embark on a memorable family vacation in the tropical paradise of Hawaii. With its stunning beaches, lush landscapes, and diverse activities, Hawaii offers something for everyone in the family. Relax and play on world-famous beaches like Waikiki in Oahu or Ka\'anapali in Maui, where you can swim, snorkel, and build sandcastles together. Explore the fascinating marine life through family-friendly snorkeling or take a guided boat tour to spot dolphins and sea turtles. Discover the unique culture and history of Hawaii by visiting Pearl Harbor in Oahu or exploring the Polynesian Cultural Center. Hike through breathtaking trails, such as the Diamond Head Crater or the Pipiwai Trail in Maui, where you can witness stunning waterfalls and lush rainforests. Enjoy exciting water sports like surfing, paddleboarding, or kayaking. Don\'t miss the opportunity to attend a traditional luau, complete with Hawaiian music, hula dancing, and a delicious feast. With its family-friendly attractions, natural wonders, and warm hospitality, Hawaii promises an unforgettable vacation for the whole family', '2023-07-05', '2023-07-13', '1995.00', '274b1a29-4263-40e2-8af5-fc9915a6f3df.jpg'),
(31, 'Jerusalem', 'Experience the magic of Jerusalem during the festive season of Sukkot. During Sukkot, Jerusalem comes alive with joyous celebrations and special events. Explore the Old City adorned with beautiful sukkahs (temporary huts) and join in the festive atmosphere. Visit the Western Wall, where thousands gather to pray and celebrate. Take part in the lively Sukkot parades and processions through the streets, featuring music, dancing, and traditional costumes. Explore the vibrant Machane Yehuda Market, filled with colorful decorations and holiday treats. Attend concerts, performances, and cultural events showcasing the rich traditions of Sukkot. Enjoy delicious meals in outdoor sukkahs, immersing yourself in the unique ambiance of the holiday. Take time to explore the historical and religious sites of Jerusalem, including the Holy Sepulchre, the Dome of the Rock, and the Tower of David. Embrace the festive spirit and the special connection to Jewish heritage that Sukkot brings in the ancient and sacred city of Jerusalem', '2023-09-27', '2023-10-10', '6495.00', '4cefff67-718a-4d92-80f1-88763ee896a1.jpg'),
(32, 'Singapore', 'Embark on an all-inclusive week-long vacation in vibrant Singapore. Discover captivating attractions, cultural experiences, and hidden gems. Enjoy midrange hotel accommodations and seamless transport arrangements for a hassle-free journey.\r\n\r\nMarvel at iconic landmarks like Marina Bay Sands and immerse yourself in the cultural tapestry of Chinatown. Explore hidden treasures like Little India and the historic neighborhoods of Kampong Glam and Katong. Engage with locals, participate in cultural workshops, and savor diverse cuisine.\r\n\r\nThis comprehensive package ensures an enriching experience, blending must-see attractions with lesser-known destinations. Create unforgettable memories in enchanting Singapore. Book now for an effortless and memorable journey.', '2023-07-10', '2023-07-17', '3695.00', '7cd2a450-94af-4ccc-b22e-cc39fb81a364.jpg'),
(131, 'Bali', 'Escape to Bali\'s tropical paradise with our Bali Bliss Retreat. Immerse yourself in the beauty and culture of this enchanting island as you explore Ubud\'s cultural treasures, indulge in relaxing spa treatments, witness a breathtaking sunrise from Mount Batur, and embark on an island excursion to Nusa Penida. This vacation package offers the perfect balance of exploration and relaxation, allowing you to create lasting memories in Bali\'s idyllic surroundings. Join us on this unforgettable journey from October 15th to October 23rd and experience the blissful charm of Bali.\r\n\r\n\r\n\r\n\r\n', '2023-10-15', '2023-10-23', '3500.00', '395d3a23-0153-4031-9c86-e3a8a2284e1d.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followId`),
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_3` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
