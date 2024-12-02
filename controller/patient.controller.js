const patientService = require("../service/patient.service");

//Function for register a patient.
async function registerPatient(req, res) {
    try {

        const userRole_id = req.user.roleId;
        const patient = req.body;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create patients." });
        }

        const result = await patientService.registerPatient(patient);

        if (result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(200).json ({
                error: false,
                payload: result.payload
        })}

    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message
        })
    }
}

//Function for get all patient list.
async function getAllPatients(req, res) {
    try {
        const userRole_id = req.user.roleId;

        if (![1,2,3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins, Doctors and Nurses can view patients." });
        }

        const result = await patientService.getAllPatients();

        if (result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(200).json ({
                error: false,
                payload: result.payload
        })}

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Function for update patient details.
async function updatePatient(req, res) {
    try{
        const userRole_id = req.user.roleId;
        const { id } = req.params;
        const updatedData = req.body;
        delete updatedData.hospitalId;

        if (![1,2,3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins, Doctors and Nurses can update patients." });
        } 
        
        const result = await patientService.updatePatient(id, updatedData);

        if (result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
        })}
        
    } catch (error) {
        return res.status(500).json ({
            error: true,
            payload: error
        })
    }

}

//Function for delete a patient
async function deletePatient(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const patientID = req.params.id

        if (![1,2,3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins, Doctors and Nurses can delete patients." });
        }

        const result = await patientService.deletePatient(patientID);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json ({
            error: true,
            payload: error
        })
    }
}

//Function for get Patient by Id
async function getPatientById(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        if (![1,2,3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins, Doctors and Nurses can view patient details." });
        }
        
        const result = await patientService.getPatientById(id);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }

    } catch (error) {
        return res.status(500).json ({
            error: true,
            payload: error.message
        })
    }
}

//Admitted Patient List
async function getAdmittedPatients(req, res) {
    
    try{
        const userRole_id = req.user.roleId;

        if (![1,2,3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins, Doctors and Nurses can view adimitted patients." });
        }

        const admittedPatientList = await patientService.getAdmittedPatients();

        return res.status(200).json({
            error: false,
            payload: admittedPatientList
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message
        })       
    }
}

//Admitted Patient Matrices.
async function getAdmittedPatientMatrices(req, res){
    try {
        const userRole_id = req.user.roleId;
        
        if (![1,2,3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins, Doctors and Nurses can view adimitted patient matrices." });
        }

        const admittedPatientMatrices = await patientService.getAdmittedPatientMatrices();

        return res.status(200).json({
            error: false,
            payload: admittedPatientMatrices
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message
        })
    }
}

//Get All Patient Matrices
async function getAllPatientMatrices(req, res) {
    try {
        const userRole_id = req.user.roleId;
        
        if (![1,2,3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins, Doctors and Nurses can view patient matrices." });
        }

        const allPatientMatrices = await patientService.getAllPatientMatrices();

        return res.status(200).json({
            error: false,
            payload: allPatientMatrices
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message
        })
    }
}

//Discharge Patient
async function dischargePatient(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const {patientId} = req.params;
        
        if (![1,2,3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins, Doctors and Nurses can discharge patients." });
        }
        
        const result = await patientService.dischargePatient(patientId);

        if (result.error) {
            return res.status(400).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(200).json ({
                error: false,
                payload: result.payload
        })}
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message
        })
    }
}

async function reAdmitPatient(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const {patientId} = req.params;
        
        if (![1,2,3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins, Doctors and Nurses can re adimit patients." });
        }

        const result = await patientService.reAdmitPatient(patientId, req.body);

        if (result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
        })}
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error.message
        })
    }
}

module.exports = {
    registerPatient,
    getAllPatients,
    updatePatient,
    deletePatient,
    getPatientById,
    getAdmittedPatients,
    getAdmittedPatientMatrices,
    getAllPatientMatrices,
    dischargePatient,
    reAdmitPatient
}   