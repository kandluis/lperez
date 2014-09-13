<?php
/* * * * * * * * * * * * * * * * * * * * * * * * * * 
 * mysql.php
 *
 * Class MySQL
 *
 * A class constructed for easier interactions with
 * MySQL databases. The connection is established
 * with a database selected by config.php. Abstracts
 * away database interaction.
 * * * * * * * * * * * * * * * * * * * * * * * * * */
 
// MySQL Class
class MySQL {
	// Base variables
	private $sLastError;		// Holds the last error
	private $sLastQuery;		// Holds the last query
	private $aResult;			// Holds the MySQL query result
	private $iRecords;			// Holds the total number of records returned
	private $iAffected;			// Holds the total number of records affected
	
	private $lastRow;			// Holds the last row of data returned by mysql_fetch_array()
	
	private $sHostname = DB_HOST;		// MySQL Hostname
	private $sUsername = DB_USER;		// MySQL Username
	private $sPassword = DB_PASSWORD;	// MySQL Password
	private $sDatabase = DB_NAME;		// MySQL Database
	
	private $sDBLink;			// Database Connection Link
	
	// Class Constructor
	// Assigning values to variables
	function __construct() {
		$this->Connect();
	}
	
	// Connects class to database
	// $bPersistant (boolean) - Use persistant connection?
	public function Connect($bPersistant = false){
		if($this->sDBLink){
			mysql_close($this->sDBLink);
		}
		
		if($bPersistant){
			$this->sDBLink = mysql_pconnect($this->sHostname, $this->sUsername, $this->sPassword);
		}else{
			$this->sDBLink = mysql_connect($this->sHostname, $this->sUsername, $this->sPassword);
		}
		
		if (!$this->sDBLink){
   			$this->sLastError = 'Could not connect to server: ' . mysql_error();
			die($this->sLastError);
		}
		
		if(!$this->UseDB()){
			$this->sLastError = 'Could not connect to database: ' . mysql_error();
			die($this->sLastError);
		}
		return true;
	}
	
	// Select database to use
	public function UseDB() {
		if (!mysql_select_db($this->sDatabase)) {
			$this->sLastError ='Cannot select database: ' . mysql_error();
			die($this->sLastError);
		} else {
			return true;
		}
	}
	
	// Executes MySQL query
	public function ExecuteSQL($sSQLQuery) {
		$this->sLastQuery = $sSQLQuery;
		
		if ($this->aResult 		= mysql_query($sSQLQuery)) {
			$this->iRecords 	= @mysql_num_rows($this->aResult);
			$this->iAffected	= @mysql_affected_rows();
			return $this->aResult;
		} else {
			$this->sLastError = mysql_error();
			die('Could not complete the database interaction: ' . $this->sLastError);
		}
	}
	
	// Returns number of records returned from query
	public function getNumRecordsReturned() {
		return $this->iRecords;
	}
	
	// Returns number of records affected by query
	public function getNumRecordsAffected() {
		return $this->iAffected;
	}
	
	// Returns the row of data as an associative or numerical array
	public function getRow($result = -1) {
		if ($result == -1)
			$result = $this->aResult;
		$this->lastRow = @mysql_fetch_array($result);
		return $this->lastRow;
	}
	
	public function getLastInsertID() {
		return mysql_insert_id();	
	}

	// Performs a 'mysql_real_escape_string' on the entire array/string
	public static function SecureData($aData){
		if(is_array($aData)){
			foreach($aData as $iKey=>$sVal){
				if(!is_array($aData[$iKey])){
					$aData[$iKey] = mysql_real_escape_string(htmlentities($aData[$iKey], ENT_COMPAT));
				}
			}
		}else{
			$aData = mysql_real_escape_string(htmlentities($aData, ENT_COMPAT));
		}
		return $aData;
	}
}
?>