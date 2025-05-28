const express = require('express');
const {pool, testConnection} =  require("../database/connection");
const router = express.Router();
const {addSchoolSchema} = require('../ZodSchema/addSchoolValidation')
const {listSchoolSchema} = require('../ZodSchema/listSchoolValidation')
const {validateBody,validateQuery} = require('../middlewares/validateMiddleware')

testConnection();

// addSchool route
router.post("/addSchool",validateBody(addSchoolSchema), async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Check if school with same name and address already exists
    const [existingSchools] = await pool.execute(
      "SELECT id FROM schools WHERE name = ? AND address = ?",
      [name, address]
    );

    if (existingSchools.length > 0) {
      return res.status(409).json({
        success: false,
        message: "School with same name and address already exists",
      });
    }

    // Insert new school
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, parseFloat(latitude), parseFloat(longitude)]
    );

    // Fetch the newly created school
    const [newSchool] = await pool.execute(
      "SELECT * FROM schools WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: newSchool[0].id,
        name: newSchool[0].name,
        address: newSchool[0].address,
        latitude: newSchool[0].latitude,
        longitude: newSchool[0].longitude,
        created_at: newSchool[0].created_at,
      },
    });
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while adding school",
    });
  }
});


// Utility function to calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};


// listSchools route
router.get("/listSchools", validateQuery(listSchoolSchema), async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // Fetch all schools from database WITHOUT any order
    const [schools] = await pool.execute('SELECT * FROM schools');

    if (schools.length === 0) {
      return res.json({
        success: true,
        message: 'No schools found',
        data: []
      });
    }

    // Calculate distance for each school and add to school object
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      );
      return {
        id: school.id,
        name: school.name,
        address: school.address,
        latitude: school.latitude,
        longitude: school.longitude,
        distance: Math.round(distance * 100) / 100, 
        created_at: school.created_at
      };
    });

    // Sort schools by distance (closest first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json({
      success: true,
      message: `Found ${schoolsWithDistance.length} schools, sorted by proximity`,
      user_location: {
        latitude: userLat,
        longitude: userLon
      },
      data: schoolsWithDistance
    });

  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching schools'
    });
  }
});


module.exports = router;
