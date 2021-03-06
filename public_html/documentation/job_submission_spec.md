Description of Process
======================
 
1. User selects a protein from the `proteins` array from `start_job_submit_game` response
2. User selects a ligand/conformation from the pool of all conformations
3. User is then presented with protein and ligand together and is asked to rotate ligand until it "fits" in protein
4. User submits job

Feedback will be given on a separate results page.

Rotation
--------

**Rotation** is represented by a axis vector and a rotation angle *phi* per the CHARMM COOR ROTA spec:

> The ROTATE command will cause the specified atoms to be rotated
> about the specified axis vector through the specified center. The vector
> need not be normalized, but it must have a non-zero length. If the AXIS
> keyword is used, then the axis and center information from the last
> COORdinates AXIS command will be used. The PHI value gives the amount
> of rotation about this axis in degrees.


Requests
--------

##`start_job_submit_game`

###Request

    {
      "request_type": "start_job_submit_game",
      "authenticator": "010"
    }

###Response

    {
      "success": "true",
      "session_id": "1a2b3c4d",
      "quota": {
        "total": "12",
        "remaining": "13"
      },
      "proteins": [
        {
          "id": "1",
          "name": "1ajx",
          "disease": "HIV",
          "pdb_url": "data/proteins/1ajx_receptor.pdb",
          "description": "Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers. Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers. Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers.Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers.Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers."
        },
        {
          "id": "2",
          "name": "1ajv",
          "disease": "HIV",
          "pdb_url": "data/proteins/1ajv_receptor.pdb",
          "description": "Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers. Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers. Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers.Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers.Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers."
        }
      ],
      "ligands": [
        {
          "id": 4,
          "name": null,
          "description": null,
          "conformations": [
            {
              "id": "7878",
              "pdb_url": "data/ligands/1d4j/1d4j_7_ligand.pdb"
            },
            {
              "id": "7879",
              "pdb_url": "data/ligands/1d4j/1d4j_8_ligand.pdb"
            },
            {
              "id": "7888",
              "pdb_url": "data/ligands/1d4j/1d4j_7_ligand.pdb"
            },
            {
              "id": "7889",
              "pdb_url": "data/ligands/1d4j/1d4j_8_ligand.pdb"
            },
            {
              "id": "7898",
              "pdb_url": "data/ligands/1d4j/1d4j_7_ligand.pdb"
            },
            {
              "id": "7899",
              "pdb_url": "data/ligands/1d4j/1d4j_8_ligand.pdb"
            }
          ]
        },
        {
          "id": 5,
          "name": "1d4j",
          "description": "test4",
          "conformations": [
            {
              "id": "7880",
              "pdb_url": "data/ligands/1ajv/1ajv_11_ligand.pdb"
            },
            {
              "id": "7881",
              "pdb_url": "data/ligands/1ajv/1ajv_1_ligand.pdb"
            },
            {
              "id": "7890",
              "pdb_url": "data/ligands/1ajv/1ajv_11_ligand.pdb"
            },
            {
              "id": "7891",
              "pdb_url": "data/ligands/1ajv/1ajv_1_ligand.pdb"
            },
            {
              "id": "7900",
              "pdb_url": "data/ligands/1ajv/1ajv_11_ligand.pdb"
            },
            {
              "id": "7901",
              "pdb_url": "data/ligands/1ajv/1ajv_1_ligand.pdb"
            }
          ]
        },
        {
          "id": 1,
          "name": "1ajv",
          "description": "test5",
          "conformations": [
            {
              "id": "7882",
              "pdb_url": "data/ligands/1ajx/1ajx_2_ligand.pdb"
            },
            {
              "id": "7883",
              "pdb_url": "data/ligands/1ajx/1ajx_12_ligand.pdb"
            },
            {
              "id": "7892",
              "pdb_url": "data/ligands/1ajx/1ajx_2_ligand.pdb"
            },
            {
              "id": "7893",
              "pdb_url": "data/ligands/1ajx/1ajx_12_ligand.pdb"
            },
            {
              "id": "7902",
              "pdb_url": "data/ligands/1ajx/1ajx_2_ligand.pdb"
            },
            {
              "id": "7903",
              "pdb_url": "data/ligands/1ajx/1ajx_12_ligand.pdb"
            }
          ]
        },
        {
          "id": 2,
          "name": "1ajx",
          "description": "test1",
          "conformations": [
            {
              "id": "7884",
              "pdb_url": "data/ligands/1d4h/1d4h_3_ligand.pdb"
            },
            {
              "id": "7885",
              "pdb_url": "data/ligands/1d4h/1d4h_4_ligand.pdb"
            },
            {
              "id": "7894",
              "pdb_url": "data/ligands/1d4h/1d4h_3_ligand.pdb"
            },
            {
              "id": "7895",
              "pdb_url": "data/ligands/1d4h/1d4h_4_ligand.pdb"
            },
            {
              "id": "7904",
              "pdb_url": "data/ligands/1d4h/1d4h_3_ligand.pdb"
            },
            {
              "id": "7905",
              "pdb_url": "data/ligands/1d4h/1d4h_4_ligand.pdb"
            }
          ]
        },
        {
          "id": 3,
          "name": "1d4h",
          "description": "test2",
          "conformations": [
            {
              "id": "7886",
              "pdb_url": "data/ligands/1d4i/1d4i_5_ligand.pdb"
            },
            {
              "id": "7887",
              "pdb_url": "data/ligands/1d4i/1d4i_6_ligand.pdb"
            },
            {
              "id": "7896",
              "pdb_url": "data/ligands/1d4i/1d4i_5_ligand.pdb"
            },
            {
              "id": "7897",
              "pdb_url": "data/ligands/1d4i/1d4i_6_ligand.pdb"
            },
            {
              "id": "7906",
              "pdb_url": "data/ligands/1d4i/1d4i_5_ligand.pdb"
            },
            {
              "id": "7907",
              "pdb_url": "data/ligands/1d4i/1d4i_6_ligand.pdb"
            }
          ]
        }
      ]
    }


##`submit_job`

###Request

    {
      "request_type": "submit_job",
      "authenticator": 010,
      "session_id": "1a2b3c4d",
      "job_parameters": {
        "protein_id": 1,
        "ligand_id": 2,
        "conformation_id": 11385,
        "rotation_x": 1,
        "rotation_y": 0,
        "rotation_z": 0,
        "rotation_phi": 0
      }
    }

###Response

    {
      "success": "true",
      "message": "Job submitted!"
    }
