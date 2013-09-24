<?php
	//request_structure
	$request_structures["start_job_submit_game"] = array();
	$request_structures["start_job_submit_game"]["request_type"] = "";
	$request_structures["start_job_submit_game"]["authenticator"] = "";

	$NUM_START_LIGANDS = 30;
	

	function handle_start_job_submit_game_request($request_object){
		global $mysqli_gamedb;
		global $NUM_START_LIGANDS;

		$mysqli_gamedb = connect_to_mysql();

		if ($mysqli_gamedb->connect_errno) {
			return_error("Failed to connect to MySQL: (" . $mysqli_gamedb->connect_errno . ") " . $mysqli_gamedb->connect_error);
		}

		$response_object = array();

		$response_object['success'] = "true";
		$response_object['session_id'] = "1a2b3c4d";

		
		$response_object['quota'] = array();
		$response_object['quota']['total'] = "13";
		$response_object['quota']['used'] =  "12";
		
		
		$response_object['protein_list'] = get_protein_list();
		$response_object['ligand_list'] = get_ligands($NUM_START_LIGANDS);

		//$response_object["temp_profile_limits"] = get_temperature_limits();

		return $response_object;

	}

	function get_temperature_limits(){
		global $mysqli_gamedb;

		$limits = array();

		$query = "SELECT * FROM temp_profile_limits";

		if($result = $mysqli_gamedb->query($query)){	
			while($array = $result->fetch_assoc()){
				$limits[$array["value"]] = array();
				$limits[$array["value"]]["min"] = $array["min"];
				$limits[$array["value"]]["max"] = $array["max"];
			}
			$result->close();
		}

		return $limits;
	}
	
	function get_protein_list(){
		global $mysqli_gamedb;

		$proteins = array();
		$query = "SELECT * FROM protein";

		if($result = $mysqli_gamedb->query($query)){	
			while($array = $result->fetch_assoc()){
				$proteins[] = $array;//array("protein"=>$array);
			}
			$result->close();
		}

		return $proteins;
	}


	function get_ligands($num_comfirmations){
		global $mysqli_gamedb;

		$ligands = array();

		$categories = array();

		//TODO TODO CHANGE TO PICK ALL RANDOM RATHER THAN SEQUENTIAL 
		$query = "SELECT r1.id, ligand_id, pdb_url
					FROM ligand_conformation AS r1 JOIN
						(SELECT (RAND() *
							(SELECT MAX(id)
							FROM ligand_conformation)) AS id)
							AS r2
					WHERE r1.id >= r2.id
					ORDER BY r1.id ASC
					LIMIT $num_comfirmations";

		if($result = $mysqli_gamedb->query($query)){
			while($conformation = $result->fetch_assoc()){
				if(!array_key_exists($conformation['ligand_id'],$categories)){
					$categories[$conformation['ligand_id']] = array();
				}
				
				$ligand_id = $conformation['ligand_id'];
				unset($conformation['ligand_id']);
				
				$categories[$ligand_id][] = $conformation;//array("conformation" => $conformation);
			}
		}
		else{
			echo $query;
		}
		$result->close();

		foreach( $categories as $id => $category ){
			$new_ligand = array();
			$new_ligand["id"] = $id;
			
			
			$desc_query = "SELECT name, description
				      	      FROM ligand
					      WHERE id = $id";

			if(($result = $mysqli_gamedb->query($desc_query)) && ($result->num_rows > 0)){
				   	$result_array = $result->fetch_assoc();
				  	$new_ligand["description"] = $result_array["description"];
				   	$new_ligand["name"] = $result_array["name"];
			}
			else{
				echo $result;
			}
			
			$new_ligand["conformation_list"] = $category;

			$ligands[] = $new_ligand;//array("ligand" => $new_ligand);
		}

		return $ligands;
	}
?>
