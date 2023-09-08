import mongoose from "mongoose";
import CalObj from "../models/calObj.js";
import DataArray from "../models/dataArray.js";

// Isn't really being used...since getAll is responding with full data for each calobj
export const getOne = async (req, res) => {
    const { id } = req.query;

    try {
        const obj = await CalObj.findById(id).exec()
        res.status(200).json(obj);  // response is just the object
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getAll = async (req, res) => {
    const { date } = req.query;
    // console.log("Get ALL")
    try {
        if (!await DataArray.exists({ date: date }))
            res.status(200).json([])
        else {
            const list = await DataArray.findOne({ date: date }).populate('data').exec();
            res.status(200).json(list.data)
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const addOne = async (req, res) => {
    const data = req.body;

    try {
        const newCalObj = new CalObj(data);
        await newCalObj.save();

        if (await DataArray.exists({ date: newCalObj.date })) {
            const list = await DataArray.findOne({ date: newCalObj.date });
            list.data.push(newCalObj._id);
            await list.save();
        }
        else {
            const list = new DataArray({ date: newCalObj.date, data: [newCalObj._id] });
            await list.save();
        }
        const list = await DataArray.findOne({ date: newCalObj.date }).populate('data').exec()
        res.status(201).json({ addedItem: newCalObj, list: list.data });
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }
}


export const updateOne = async (req, res) => {

    try {
        const { id, ...data } = req.body;
        const filter = { _id: id };
        const obj = await CalObj.findOneAndUpdate(filter, data, { new: true }).exec();
        const list = await DataArray.findOne({ date: data.date }).populate('data').exec()
        res.status(200).json(list.data);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

export const updateAll = async (req, res) => {
    // console.log("////////////////////////////")
    // console.log(req.body)
    // console.log("////////////////////////////")
    try {
        const data = req.body;
        const date = data[0].date;
        const update = data.map(object => mongoose.Types.ObjectId(object._id));
        const list = await DataArray.findOne({ date: date }).exec();
        list.data = update;
        await list.save();
        res.status(200).json(list.data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteOne = async (req, res) => {

    const { id } = req.body;

    try {
        const obj = await CalObj.findByIdAndDelete(id);
        res.status(202).send(obj);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

export const deleteAll = async (req, res) => {
    const { date } = req.body;
    const filter = { date: date }
    try {
        await DataArray.deleteOne(filter)
        await CalObj.deleteMany(filter)
        res.status(204).end()
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

export const apiTest = async (req, res) => {
    const data = {
        "common": [
            {
                "food_name": "chicken",
                "serving_unit": "oz",
                "tag_name": "chicken",
                "serving_qty": 3,
                "common_type": null,
                "tag_id": "9",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/9_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "fried chicken",
                "serving_unit": "piece",
                "tag_name": "fried chicken",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "567",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/567_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "whole chicken",
                "serving_unit": "chicken",
                "tag_name": "whole chicken",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "4025",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/4025_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "chicken salad",
                "serving_unit": "cup",
                "tag_name": "chicken salad",
                "serving_qty": 0.5,
                "common_type": null,
                "tag_id": "1420",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/1420_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "chicken curry",
                "serving_unit": "cup",
                "tag_name": "chicken curry",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "3264",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/3264_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "chicken wings",
                "serving_unit": "wingette or drummette",
                "tag_name": "Chicken wings",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "471",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/1830_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "chicken broth",
                "serving_unit": "cup",
                "tag_name": "broth chicken",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "3336",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/3336_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "chicken thigh",
                "serving_unit": "thigh with skin",
                "tag_name": "chicken thigh",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "1743",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/1743_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "baked chicken",
                "serving_unit": "oz",
                "tag_name": "baked chicken",
                "serving_qty": 3,
                "common_type": null,
                "tag_id": "8333",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/9_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "ground chicken",
                "serving_unit": "oz crumbled",
                "tag_name": "ground chicken",
                "serving_qty": 3,
                "common_type": null,
                "tag_id": "1973",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/1973_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "chicken breast",
                "serving_unit": "breast",
                "tag_name": "boneless skinless chicken breast",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "7820",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/7820_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "chicken cutlet",
                "serving_unit": "cutlet",
                "tag_name": "chicken cutlet",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "8870",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/8870_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "chicken breasts",
                "serving_unit": "breast",
                "tag_name": "boneless skinless chicken breast",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "7820",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/7820_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "grilled chicken",
                "serving_unit": "piece",
                "tag_name": "grilled chicken",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "1714",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/1714_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "rotisserie chicken",
                "serving_unit": "serving (3 oz)",
                "tag_name": "rotisserie chicken",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "1838",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/1838_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "baked chicken breast",
                "serving_unit": "breast, bone and skin removed",
                "tag_name": "baked chicken breast",
                "serving_qty": 0.5,
                "common_type": null,
                "tag_id": "7821",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/7821_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "grilled chicken breast",
                "serving_unit": "piece",
                "tag_name": "grilled chicken breast",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "466",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/466_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "breaded chicken breast",
                "serving_unit": "piece",
                "tag_name": "breaded chicken",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "101",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/101_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "baked breaded chicken breast",
                "serving_unit": "piece",
                "tag_name": "baked breaded chicken",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "5839",
                "photo": {
                    "thumb": "https://nix-tag-images.s3.amazonaws.com/5839_thumb.jpg"
                },
                "locale": "en_US"
            },
            {
                "food_name": "coconut breaded chicken breast",
                "serving_unit": "piece, breast",
                "tag_name": "coconut chicken",
                "serving_qty": 1,
                "common_type": null,
                "tag_id": "6136",
                "photo": {
                    "thumb": "https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png",
                    "highres": null,
                    "is_user_uploaded": false
                },
                "locale": "en_US"
            }
        ],
        "branded": [
            {
                "food_name": "Chunk Light Tuna in Water",
                "serving_unit": "oz drained",
                "nix_brand_id": "51db37b6176fe9790a898901",
                "brand_name_item_name": "Chicken Of The Sea Chunk Light Tuna in Water",
                "serving_qty": 3,
                "nf_calories": 90,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/56172dbac0d532a13cea0ede.jpeg"
                },
                "brand_name": "Chicken Of The Sea",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "56172a8a3f2ab4107b5c3593",
                "locale": "en_US"
            },
            {
                "food_name": "Tuna, Chunk Light",
                "serving_unit": "can drained",
                "nix_brand_id": "51db37b6176fe9790a898901",
                "brand_name_item_name": "Chicken Of The Sea Tuna, Chunk Light",
                "serving_qty": 1,
                "nf_calories": 100,
                "photo": {
                    "thumb": "https://assets.syndigo.com/ead0c82b-6965-484a-80b2-a0e34710f2a4"
                },
                "brand_name": "Chicken Of The Sea",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "51c3ba9797c3e6d8d3b462f2",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Breast",
                "serving_unit": "oz",
                "nix_brand_id": "51db380c176fe9790a89b0d7",
                "brand_name_item_name": "Kirkland Signature Chicken Breast",
                "serving_qty": 2,
                "nf_calories": 60,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/570e129d7d854e4e68c20ea8.jpeg"
                },
                "brand_name": "Kirkland Signature",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "570e126dca6868bb5b0c7c0f",
                "locale": "en_US"
            },
            {
                "food_name": "Pink Salmon, Alaskan, Wild Caught, Skinless & Boneless",
                "serving_unit": "packet",
                "nix_brand_id": "51db37b6176fe9790a898901",
                "brand_name_item_name": "Chicken Of The Sea Pink Salmon, Alaskan, Wild Caught, Skinless & Boneless",
                "serving_qty": 1,
                "nf_calories": 70,
                "photo": {
                    "thumb": "https://assets.syndigo.com/1339e190-7125-4141-9510-8f8d1de06726"
                },
                "brand_name": "Chicken Of The Sea",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "51c3ba9897c3e6d8d3b462f9",
                "locale": "en_US"
            },
            {
                "food_name": "Sausage, Smoked Chicken, Chicken & Apple",
                "serving_unit": "link",
                "nix_brand_id": "51db37b5176fe9790a89889e",
                "brand_name_item_name": "Aidells Sausage, Smoked Chicken, Chicken & Apple",
                "serving_qty": 1,
                "nf_calories": 170,
                "photo": {
                    "thumb": "https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png",
                    "highres": null,
                    "is_user_uploaded": false
                },
                "brand_name": "Aidells",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "51d37928cc9bff5553aa9a17",
                "locale": "en_US"
            },
            {
                "food_name": "Pink Salmon, Skinless and Boneless",
                "serving_unit": "pouch",
                "nix_brand_id": "51db37b6176fe9790a898901",
                "brand_name_item_name": "Chicken Of The Sea Pink Salmon, Skinless and Boneless",
                "serving_qty": 1,
                "nf_calories": 150,
                "photo": {
                    "thumb": "https://assets.syndigo.com/4dd4f790-3f14-4e64-b444-4c8d51779c7a"
                },
                "brand_name": "Chicken Of The Sea",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "51c3ba9997c3e6d8d3b46302",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Breast Chunks, Lightly Breaded",
                "serving_unit": "oz",
                "nix_brand_id": "51db37f6176fe9790a89aa77",
                "brand_name_item_name": "Just Bare Chicken Breast Chunks, Lightly Breaded",
                "serving_qty": 3,
                "nf_calories": 160,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/643a8481034c660008c5bc33.jpeg"
                },
                "brand_name": "Just Bare",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "5f363a105f7045ea353b3276",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Strips",
                "serving_unit": "oz",
                "nix_brand_id": "5cbac7b15f1adec654afa52b",
                "brand_name_item_name": "Realgood Chicken Strips",
                "serving_qty": 4,
                "nf_calories": 170,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/63230710584cd600088a5d18.jpeg"
                },
                "brand_name": "Realgood",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "63230710584cd600088a5d17",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Breast Strips",
                "serving_unit": "oz",
                "nix_brand_id": "51db37b3176fe9790a8986a0",
                "brand_name_item_name": "Tyson Chicken Breast Strips",
                "serving_qty": 3,
                "nf_calories": 110,
                "photo": {
                    "thumb": "https://assets.syndigo.com/3d6628ee-5719-4ef0-951e-b385377d58ca"
                },
                "brand_name": "Tyson",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "51c3698e97c3e69de4b06b9f",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Skewers",
                "serving_unit": "skewers",
                "nix_brand_id": "5590553e026e12bd1c1080d1",
                "brand_name_item_name": "WestEnd Cuisine Chicken Skewers",
                "serving_qty": 2,
                "nf_calories": 150,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/6453913cc3f2960008464836.jpeg"
                },
                "brand_name": "WestEnd Cuisine",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "5e819dcc892b618a3bfc29ad",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Breast Bites",
                "serving_unit": "pouch",
                "nix_brand_id": "5d43e400e7c3b7073a95385c",
                "brand_name_item_name": "Fresh Additions Chicken Breast Bites",
                "serving_qty": 1,
                "nf_calories": 130,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/631dc0f065c4b6000831c8f0.jpeg"
                },
                "brand_name": "Fresh Additions",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "5d91a9adf982591b49aba4d8",
                "locale": "en_US"
            },
            {
                "food_name": "Seasoned Rotisserie Chicken",
                "serving_unit": "oz",
                "nix_brand_id": "51db380c176fe9790a89b0d7",
                "brand_name_item_name": "Kirkland Signature Seasoned Rotisserie Chicken",
                "serving_qty": 3,
                "nf_calories": 140,
                "photo": {
                    "thumb": "https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png",
                    "highres": null,
                    "is_user_uploaded": false
                },
                "brand_name": "Kirkland Signature",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "53d7d0bf65a202b03bbb700d",
                "locale": "en_US"
            },
            {
                "food_name": "Grilled Chicken & Broccoli Alfredo",
                "serving_unit": "meal",
                "nix_brand_id": "5522ddaf7f4a6d5205c69602",
                "brand_name_item_name": "Healthy Choice Cafe Steamers Grilled Chicken & Broccoli Alfredo",
                "serving_qty": 1,
                "nf_calories": 190,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/554cf746e51caf6d6819adf4.jpeg"
                },
                "brand_name": "Healthy Choice Cafe Steamers",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "554cf700a5b0b55b39e82755",
                "locale": "en_US"
            },
            {
                "food_name": "Tuna, Lemon & Thyme",
                "serving_unit": "container",
                "nix_brand_id": "51db37b6176fe9790a898901",
                "brand_name_item_name": "Chicken Of The Sea Tuna, Lemon & Thyme",
                "serving_qty": 1,
                "nf_calories": 80,
                "photo": {
                    "thumb": "https://assets.syndigo.com/cb789f45-cd5d-4ae8-bba9-e65237e716b6"
                },
                "brand_name": "Chicken Of The Sea",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "5ba34accdafc50d14cd2c697",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Breast Chunk",
                "serving_unit": "oz",
                "nix_brand_id": "546f4d5fa5c4dcf51e0cbc70",
                "brand_name_item_name": "Member's Mark Chicken Breast Chunk",
                "serving_qty": 3,
                "nf_calories": 90,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/64353ef9478d4100077fab42.jpeg"
                },
                "brand_name": "Member's Mark",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "58e73b32c5dbf8080d0b12d8",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Patties, Chicken Raised, Lightly Seasoned",
                "serving_unit": "patty",
                "nix_brand_id": "53cd1c119628b8892a249eac",
                "brand_name_item_name": "Don Lee Farms Chicken Patties, Chicken Raised, Lightly Seasoned",
                "serving_qty": 1,
                "nf_calories": 120,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/552df7c5b6feef207c54c0f4.jpeg"
                },
                "brand_name": "Don Lee Farms",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "552df669f0bbf389304b710b",
                "locale": "en_US"
            },
            {
                "food_name": "Organic Chicken & Apple Smoked Chicken Sausage",
                "serving_unit": "link",
                "nix_brand_id": "51db3834176fe9790a89b945",
                "brand_name_item_name": "Chef Bruce Aidells Organic Chicken & Apple Smoked Chicken Sausage",
                "serving_qty": 1,
                "nf_calories": 190,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/5b3b3c6b0b3a481637c1d7e4.jpeg"
                },
                "brand_name": "Chef Bruce Aidells",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "5b3b21218105cb2b37d44c90",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Sausage, Fully Cooked",
                "serving_unit": "links",
                "nix_brand_id": "51db37cb176fe9790a899955",
                "brand_name_item_name": "Jones Dairy Farm Chicken Sausage, Fully Cooked",
                "serving_qty": 3,
                "nf_calories": 90,
                "photo": {
                    "thumb": "https://nutritionix-api.s3.amazonaws.com/64353e7f478d4100077fa9ab.jpeg"
                },
                "brand_name": "Jones Dairy Farm",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "5a6ad46bfce35ad1027b7739",
                "locale": "en_US"
            },
            {
                "food_name": "Chicken Breast, Original Fillets, Lightly Breaded",
                "serving_unit": "piece",
                "nix_brand_id": "51db37f6176fe9790a89aa77",
                "brand_name_item_name": "Just Bare Chicken Breast, Original Fillets, Lightly Breaded",
                "serving_qty": 1,
                "nf_calories": 210,
                "photo": {
                    "thumb": "https://assets.syndigo.com/e5bd07c9-bfda-49ad-880b-a7e9197359fb"
                },
                "brand_name": "Just Bare",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "62b06e07e32574000627969b",
                "locale": "en_US"
            },
            {
                "food_name": "Tuna, Premium, Albacore",
                "serving_unit": "can drained",
                "nix_brand_id": "51db37b6176fe9790a898901",
                "brand_name_item_name": "Chicken Of The Sea Tuna, Premium, Albacore",
                "serving_qty": 1,
                "nf_calories": 130,
                "photo": {
                    "thumb": "https://assets.syndigo.com/ca0ffce7-abc3-4e3b-91e9-1633a6aa7fdb"
                },
                "brand_name": "Chicken Of The Sea",
                "region": 1,
                "brand_type": 2,
                "nix_item_id": "51c3ba9697c3e6d8d3b462e9",
                "locale": "en_US"
            }
        ]
    }

    res.status(200).json(data)
}


// FOR TESTING PURPOSES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// export const updateOne = async (req, res) => {

//     const test = [
//         {
//             "_id": "64837c63eef16b3a04fb097c",
//             "objType": "activity",
//             "date": "06/08/2023",
//             "name": "Working on Project",
//             "calories": -50,
//             "amount": 250,
//             "unit": "minutes",
//             "__v": 0
//         },
//         {
//             "_id": "64837c5eeef16b3a04fb0977",
//             "objType": "food",
//             "date": "06/08/2023",
//             "name": "Salmon",
//             "calories": 400,
//             "amount": 200,
//             "unit": "g",
//             "protein": 57,
//             "carbs": 5,
//             "fat": 10,
//             "__v": 0
//         }
//     ]
//     const dataInJSON = JSON.stringify(test);

//     try {
//         res.status(200).json(dataInJSON);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }