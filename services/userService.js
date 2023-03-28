'use strict'
const csvtojson = require('csvtojson');
const sequelize = require('../database/connection');
const User = require('../models/userModel');
const { Op } = require('sequelize');


const ageGroups = [
    { name: '< 20', minAge: 0, maxAge: 19 },
    { name: '20 to 40', minAge: 20, maxAge: 40 },
    { name: '40 to 60', minAge: 41, maxAge: 60 },
    { name: '> 60', minAge: 61, maxAge: 200 },
];

async function csvTojson() {
    try {
        // Get CSV file path from env
        const csvFilePath = process.env.CSV_FILE_PATH ;
        // Convert CSV to JSON
        const jsonArray = await csvtojson().fromFile(csvFilePath);
        // Map JSON fields to User model fields
        console.log(jsonArray);
        const users = jsonArray.map(({ name: { firstName, lastName }, age, address, ...additional }) => ({
            name: `${firstName} ${lastName}`,
            age: +age,
            address,
            additional_info: additional
        }));

        // Save Users to database
        return await User.bulkCreate(users);
    } catch (error) {
        console.error(error);
        return { message: 'Error occurred while converting csv file.', error: error };
    }
}


async function calAgeDistribution() {
    try {
        const userCount = await User.count();
        const ageDistribution = await Promise.all(
            ageGroups.map(async (group) => {
                const { minAge, maxAge, name } = group;
                const count = await User.count({
                    where: {
                        age: {
                            [Op.and]: [{ [Op.gte]: minAge }, { [Op.lte]: maxAge }],
                        },
                    },
                });
                const percent = (count / userCount) * 100;
                return { name, count, percent };
            })
        );
        return ageDistribution;
    } catch (error) {
        console.error('Error while calculating age distribution:', error);
        throw error;
    }

}

module.exports = {
    csvTojson,
    calAgeDistribution
}