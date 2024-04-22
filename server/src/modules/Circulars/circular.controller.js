import httpStatus from "http-status";
import Circular from "./Circular.js";
import { addMonths, format, getMonth, getYear } from "date-fns";
import CustomError from "../../errors/CustomError.js";

export const getCirculars = async (req, res) => {
    //query params - based on months and year
    let { date } = req.query;
    const filterObj = {};

    if (!date) {

        date = format(new Date(), 'yyyy-MM-dd')
    }

    //fetches latest dated circulars only
    const month = getMonth(date) + 1;
    const year = getYear(date);
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = addMonths(startDate, 1);

    filterObj.createdAt = {
        $gte: startDate,
        $lt: endDate,
    };

    const circulars = await Circular.find(filterObj);

    return res.status(httpStatus.OK).send({
        "message": "Circulars fetched successfully",
        circulars,
    });
};

export const createCircular = async (req, res) => {
    const { title, link } = req.body;

    const circular = new Circular({
        title,
        link,
        createdBy: req.user._id
    });

    await circular.save();

    return res.status(httpStatus.CREATED).send({
        "message": "Circular created successfully  ",
    })
};

export const updateCircular = async (req, res) => {
    //get the id of the event
    const { circularId } = req.params;

    const circular = await Circular.findById(circularId);

    if (!circular) {
        throw new CustomError(httpStatus.NOT_FOUND, "Circular not found");
    };

    for (let item in req.body) {
        circular[item] = req.body[item];
    }

    await circular.save();

    return res.status(httpStatus.OK).send({
        "message": "Circular updated successfully",
    });
};

export const deleteCircular = async (req, res) => {
    const { circularId } = req.params;

    const circular = await Circular.findById(circularId);

    if (!circular) {
        throw new CustomError(httpStatus.NOT_FOUND, "Circular not found");
    };

    await Circular.deleteOne({
        _id: circular._id
    })

    return res.status(httpStatus.OK).send({
        "message": "Circular deleted successfully"
    })
};