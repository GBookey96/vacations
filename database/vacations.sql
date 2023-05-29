-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2023 at 06:51 PM
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
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(7, 'gershon', 'gershon', 'gershon@gershon.com', '0f85d418a2bb929d8a6bf388999238642771282123c04f50baaeb77e72cd31e6edd7bfa6a21724b0fcb5d5f78590cad0561f5f4a0145900115c361f76e8cb588', 'Admin'),
(8, 'baily', 'bookey', 'baily@baily.com', '11b6b3bd24c49a8a088ef4906e2ba840c01d02fa84ee0225586728217be5c391ddf77b82e76e4e84104abc6e9ea4244ceb2f50928cd882a6fc6be2bf934fe7bf', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationDestination` varchar(30) NOT NULL,
  `vacationDescription` varchar(5000) NOT NULL,
  `vacationStart` date NOT NULL,
  `vacationEnd` date NOT NULL,
  `vacationOneLine` varchar(15) NOT NULL,
  `vacationPrice` decimal(6,2) NOT NULL,
  `vacationImgName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationDestination`, `vacationDescription`, `vacationStart`, `vacationEnd`, `vacationOneLine`, `vacationPrice`, `vacationImgName`) VALUES
(21, 'Rome', 'Immerse yourself in Rome\'s grandeur on a week-long high-end vacation. Stay at a luxurious hotel in the city center. Explore ancient Rome\'s iconic landmarks, visit the Vatican City for art and culture, indulge in personalized shopping, and take a private helicopter tour to Tuscan vineyards. Discover Renaissance art, enjoy a sunset cruise, and embark on a day trip to the Amalfi Coast. Conclude with a private cooking class and farewell dinner. With personalized service and opulent accommodations, create unforgettable memories in the Eternal City.', '2023-08-01', '2023-08-07', 'Exquisite', '6995.00', '097e875a-f1f1-45dc-bd8f-fb7d745a8692.jpg'),
(22, 'Phuket', 'Experience the best of Phuket with a mid-range vacation. Enjoy pristine beaches, vibrant nightlife, and cultural wonders. Stay in comfortable accommodations, explore the vibrant streets of Patong, indulge in Thai cuisine, and visit iconic landmarks like the Big Buddha. Relax on stunning beaches like Kata and Karon, take a boat tour to Phi Phi Islands, and immerse yourself in the local culture at Old Phuket Town. With a mix of relaxation and adventure, this affordable trip offers a perfect balance for an unforgettable Phuket getaway.', '2024-02-01', '2024-02-05', 'Tropical', '795.00', 'dd583d80-7459-4360-b177-f7b9cdc652d8.jpg'),
(23, 'New York City', 'Discover the magic of New York City on an unforgettable city break. Explore iconic landmarks like Times Square, Central Park, and the Statue of Liberty. Immerse yourself in the vibrant culture by visiting renowned museums, catching Broadway shows, and savoring diverse culinary delights. Take a stroll through trendy neighborhoods like SoHo and Greenwich Village, shop on Fifth Avenue, and experience the city\'s energetic nightlife. With comfortable accommodations and a multitude of activities, this trip promises an exhilarating blend of culture, entertainment, and urban charm in the heart of the Big Apple.', '2023-07-02', '2023-07-09', 'Vibrant', '4595.00', '7ce69044-9e9e-448e-a714-6062b56cfa9c.jpg'),
(24, 'Ho Chi Minh City', 'Embark on an affordable two-week adventure in Ho Chi Minh City, Vietnam. Immerse yourself in the captivating history and vibrant culture without breaking the bank. Explore the bustling streets, visit iconic landmarks like the War Remnants Museum and Reunification Palace. Indulge in the tantalizing street food and authentic Vietnamese cuisine available at budget-friendly prices. Cruise along the enchanting Mekong Delta, discover the historical significance of the Cu Chi Tunnels. Experience local life in charming towns nearby.\r\nWith budget accommodations and cost-effective transportation options, this package allows you to discover the wonders of Ho Chi Minh City on a shoestring budget. Uncover the hidden gems, connect with the warmth of the Vietnamese people, and create lasting memories of your affordable adventure in Vietnam. Book your package vacation now and embark on an incredible journey that combines affordability with the richness of Vietnamese culture.', '2023-06-01', '2023-06-14', 'Bargain', '995.00', '3532217d-8db1-41b6-90b6-7d9e466e7640.jpg'),
(25, 'Maldives', 'Indulge in the ultimate luxury with a Labor Day weekend getaway to the Maldives. Experience the epitome of paradise with pristine white-sand beaches, crystal-clear turquoise waters, and luxurious resorts. Relax in overwater villas with private pools, indulge in world-class spa treatments, and savor gourmet cuisine from renowned chefs. Immerse yourself in underwater adventures with snorkeling or diving amidst vibrant coral reefs and exotic marine life. Enjoy sunset cruises, private beach dinners, and pampering in exclusive spas. This opulent escape guarantees an unforgettable experience filled with relaxation, romance, and unparalleled beauty in the breathtaking Maldives.', '2023-08-31', '2023-09-04', 'Opulent', '6995.00', '6dc57178-a94b-49f9-b2ad-06750c8291bb.jpg'),
(26, 'United Kingdom', 'Embark on an adventurous cross-country journey through the United Kingdom as a backpacker. Discover the diverse landscapes, rich history, and vibrant culture on a budget-friendly adventure. Explore the charming streets of London, visit iconic landmarks like Buckingham Palace and the Tower of London. Experience the beauty of the English countryside in the Lake District, hike along the stunning trails of Snowdonia National Park in Wales, and explore the historic sites of Edinburgh in Scotland. Stay in budget accommodations such as hostels or campgrounds, savor affordable local cuisine, and take advantage of public transportation like trains and buses. This backpacking trip promises an immersive and affordable exploration of the UK\'s captivating landscapes and cultural treasures.', '2023-07-04', '2023-07-17', 'Adventurous', '845.00', '40707199-999c-40fc-b604-2506750826f7.jpg'),
(27, 'Queenstown', 'Embark on a stylish and unforgettable journey to Queenstown, New Zealand. Experience the best of luxury in one of the world\'s most breathtaking destinations. Stay in opulent accommodations that offer stunning views of the surrounding mountains and lakes. Indulge in gourmet dining at award-winning restaurants and vineyards, sampling the finest local cuisine and wines. Take part in thrilling outdoor adventures like bungee jumping, jet boating, and heli-skiing, all accompanied by experienced guides. Enjoy exclusive spa treatments and wellness experiences to relax and rejuvenate. Explore the picturesque landscapes of Milford Sound and the Remarkables, taking in the beauty of nature in ultimate comfort. This luxurious trip to Queenstown promises a perfect blend of adrenaline-pumping activities, indulgent relaxation, and exquisite experiences in an awe-inspiring setting', '2024-01-09', '2024-01-16', 'Chic', '5995.00', 'ca8a5b34-1d1b-415d-84f2-3401aa853504.jpg'),
(28, 'Prague', 'Embark on a romantic weekend getaway to Prague, Czech Republic, in the enchanting month of August. Immerse yourselves in the city\'s rich history, stunning architecture, and romantic ambiance. Stroll hand in hand along the picturesque Charles Bridge, enjoying the panoramic views of the Vltava River and Prague Castle. Explore the charming cobblestone streets of Old Town Square, where you can admire the intricate Astronomical Clock and indulge in cozy cafes and boutique shops. Take a romantic boat ride along the Vltava River, enjoying the scenic views of the city\'s landmarks. Treat yourselves to a candlelit dinner at a rooftop restaurant, savoring delicious Czech cuisine and fine wines. End the evening by attending a classical music concert or ballet performance at one of Prague\'s grand theaters. With its fairytale-like charm and romantic ambiance, Prague in August offers the perfect backdrop for a memorable and dreamy weekend with your loved one', '2023-08-10', '2023-08-13', 'Enchanting', '1495.00', 'd16b6c7e-8ae6-45aa-9005-2b3b34c4eee1.jpg'),
(29, 'Kruger National Park', 'Embark on an exciting and immersive two-week adventure in Kruger National Park, South Africa, perfect for teenagers. Experience the thrill of wildlife encounters and the beauty of the African wilderness. Stay in comfortable safari lodges or campsites within the park, surrounded by nature. Participate in guided game drives and bushwalks, led by experienced rangers, to spot the Big Five (lion, leopard, elephant, buffalo, and rhino) and other incredible wildlife species. Learn about conservation efforts and engage in educational activities, such as tracking animals and identifying bird species. Explore the diverse ecosystems of Kruger, including rivers, grasslands, and woodlands, all teeming with unique flora and fauna. Take part in community-based initiatives, such as visiting local villages and learning about the local culture. This teenager getaway promises an unforgettable wildlife experience, educational opportunities, and a chance to connect with nature in one of Africa\'s most iconic national parks', '2023-06-28', '2023-07-12', 'Thrilling', '2695.00', 'e01bfaad-4fa2-49aa-803a-6b75a1f418e2.jpg'),
(30, 'Hawaii', 'Embark on a memorable family vacation in the tropical paradise of Hawaii. With its stunning beaches, lush landscapes, and diverse activities, Hawaii offers something for everyone in the family. Relax and play on world-famous beaches like Waikiki in Oahu or Ka\'anapali in Maui, where you can swim, snorkel, and build sandcastles together. Explore the fascinating marine life through family-friendly snorkeling or take a guided boat tour to spot dolphins and sea turtles. Discover the unique culture and history of Hawaii by visiting Pearl Harbor in Oahu or exploring the Polynesian Cultural Center. Hike through breathtaking trails, such as the Diamond Head Crater or the Pipiwai Trail in Maui, where you can witness stunning waterfalls and lush rainforests. Enjoy exciting water sports like surfing, paddleboarding, or kayaking. Don\'t miss the opportunity to attend a traditional luau, complete with Hawaiian music, hula dancing, and a delicious feast. With its family-friendly attractions, natural wonders, and warm hospitality, Hawaii promises an unforgettable vacation for the whole family', '2023-07-05', '2023-07-13', 'Paradise', '1995.00', '274b1a29-4263-40e2-8af5-fc9915a6f3df.jpg'),
(31, 'Jerusalem', 'Experience the magic of Jerusalem during the festive season of Sukkot. During Sukkot, Jerusalem comes alive with joyous celebrations and special events. Explore the Old City adorned with beautiful sukkahs (temporary huts) and join in the festive atmosphere. Visit the Western Wall, where thousands gather to pray and celebrate. Take part in the lively Sukkot parades and processions through the streets, featuring music, dancing, and traditional costumes. Explore the vibrant Machane Yehuda Market, filled with colorful decorations and holiday treats. Attend concerts, performances, and cultural events showcasing the rich traditions of Sukkot. Enjoy delicious meals in outdoor sukkahs, immersing yourself in the unique ambiance of the holiday. Take time to explore the historical and religious sites of Jerusalem, including the Holy Sepulchre, the Dome of the Rock, and the Tower of David. Embrace the festive spirit and the special connection to Jewish heritage that Sukkot brings in the ancient and sacred city of Jerusalem', '2023-09-27', '2023-10-10', 'Sacred', '6495.00', '4cefff67-718a-4d92-80f1-88763ee896a1.jpg'),
(32, 'Singapore', 'Welcome to Singapore, the bustling cosmopolitan city-state known for its modernity, diverse cultures, and culinary delights. Discover the vibrant blend of East and West as you explore this compact yet captivating destination. Immerse yourself in the futuristic skyline of Marina Bay, where you can witness the iconic Marina Bay Sands and enjoy the stunning Gardens by the Bay. Experience the cultural heritage of Singapore by visiting the historic districts of Chinatown, Little India, and Kampong Glam, each offering a unique atmosphere, delicious street food, and traditional crafts. Take a relaxing stroll along the Singapore River and explore the quays, such as Boat Quay and Clarke Quay, with their charming riverside cafes and bustling nightlife. For a family adventure, spend a fun-filled day at Universal Studios Singapore or visit the world-class Singapore Zoo and Night Safari. Don\'t miss the chance to savor the renowned local cuisine at hawker centers, where you can try mouthwatering dishes like Hainanese chicken rice and chili crab. Indulge in shopping along Orchard Road or explore the vibrant cultural and arts scene at places like the National Gallery and Esplanade - Theatres on the Bay. Singapore offers a delightful blend of modernity, cultural diversity, and culinary delights, making it an exciting destination for travelers of all kinds', '2023-07-11', '2023-07-18', 'Futuristic', '3695.00', '7cd2a450-94af-4ccc-b22e-cc39fb81a364.jpg'),
(36, 'aslkdjfhasdlfkjh', 'asdlfjjfh asdjfgh askjfh asl d fdhgalsdkjjcvblsdk jfhv hiosdu fhg lksjdfhv lkjsdh fgvlkjsdh fblk jsdh f lkjsdh fbv kljh sdfkjh sdfgkljsdfljkh dgfs  hjklfdgs hjkl dfsg hjkl dfsg  hjkldfsg hjkl dfsg hjkldfsg hjklsfdg hjklsdfg', '2023-01-01', '2023-06-01', 'asdf', '1.00', '6069b0bb-6b7e-4784-9d5c-2afe7a7a08e4.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
