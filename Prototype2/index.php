<html>
<head>
</head>
<body>

<form method="get" action="">
  <input type="text" name="city" placeholder="Enter city name">
  <input type="submit" name="submit" value="Search">
</form>

<?php

if (isset($_GET['submit'])) {
  $city = $_GET['city'];
} else {
  $city = "Noma";
}

$url = "http://api.openweathermap.org/data/2.5/weather?q=" . urlencode($city) . "&appid=bdd64c736f51fb2ffa936eaf1baa8bb3";
$response = file_get_contents($url);
$data = json_decode($response, true);

if (!$data) {
  die("Error: Failed to retrieve data from OpenWeatherMap API.");
}

$city_name = $data['name'];
$condition = $data['weather'][0]['main'];
$icon = $data['weather'][0]['icon'];
$temperature = $data['main']['temp'];
$pressure = $data['main']['pressure'];
$humidity = $data['main']['humidity'];
$wind_speed = $data['wind']['speed'];
$rain = isset($data['rain']['1h']) ? $data['rain']['1h'] : 'not given';

$host = 'localhost';
$username = 'root';
$password = "";
$dbname = 'database';

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
} else {
  echo "Connection established";
}

$sql = "INSERT INTO `prototype2` (city, date, weather_condition, temperature, wind_speed, pressure, humidity)
        VALUES ('$city_name', NOW(), '$condition', $temperature, $wind_speed, $pressure, $humidity)";

mysqli_query($conn, $sql);

$sql = "SELECT * FROM `prototype2` WHERE `city`='$city_name' AND DATE(`date`) = CURDATE() ORDER BY `date` DESC";
$result = mysqli_query($conn, $sql);

echo "<table border='1'>";
echo "<tr>";
echo "<th>Date/Time</th>";
echo "<th>Condition</th>";
echo "<th>Icon</th>";
echo "<th>Temperature</th>";
echo "<th>Humidity</th>";
echo "<th>Wind Speed</th>";
echo "</tr>";

while ($row = mysqli_fetch_assoc($result)) {
  $date = date('Y-m-d H:i:s', strtotime($row['date']));
  $condition = $row['weather_condition'];
  
  $temperature = $row['temperature'];
  $humidity = $row['humidity'];
  $wind_speed = $row['wind_speed'];

  echo "<tr>";
  echo "<td>{$date}</td>";
  echo "<td>{$condition}</td>";
  echo "<td><img src='http://openweathermap.org/img/w/{$icon}.png'></td>";
  echo "<td>{$temperature}Â°C</td>";
  echo "<td>{$humidity}%</td>";
  echo "<td>{$wind_speed} m/s</td>";
  echo "</tr>";
}
echo "</table>";



mysqli_close($conn);
?>
</body>
</html>