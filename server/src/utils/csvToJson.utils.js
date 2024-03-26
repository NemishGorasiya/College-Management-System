import axios from "axios";
import csv from "csvtojson";

export async function csvToJson(csv_link) {
    const { data: resultData } = await axios.get(csv_link, {
        responseType: "blob", //working
        // responseType: "stream",
    });

    const csvConverter = csv({
        noheader: false,
        ignoreColumns: /(profilePicture)/
    });

    const students = await csvConverter.fromString(resultData.toString());
    // const students = await csvConverter.fromStream(resultData);

    return students;
};

export async function validateStudents(schema, students) {
    return await schema.validateAsync(students, { abortEarly: false })
};