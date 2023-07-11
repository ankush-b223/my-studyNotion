const Category = require("../models/category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max) //returns a random integer within max parameter as range
}  

const createCategory = async(req,res)=>{

    try{

        const {name,description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Missing fields",
            })
        };

        const newCategory = await Category.create({
            name:name,
            description:description,
        });


        if(!newCategory){
            return res.status(500).json({
                success:false,
                message:"Error in pushing Category , try again",
            })
        };


        res.status(200).json({
            success:true,
            message:"Category created successfully",
        });

        
    }catch(err){
        console.log("Err in creating category-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in creating a category , Try again!",
        })
    }


};


const showAllCategories = async(req,res)=>{

    try{

        const categories = await Category.find(
            {},
            {name:true,description:true}
        );

        if(!categories){
            return res.status(500).json({
                success:false,
                message:"Something went wrong while fetching all categories",
            })
        };

        if(categories.length === 0){
            return res.status(400).json({
                success:false,
                message:"No categories found",
            })
        };

        res.status(200).json({
            success:true,
            data:categories,
            message:"All categories fetched",
        });


        
    }catch(err){
        console.log("Err in showAllCategories-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in showing All Categories , Try again!",
        })
    }


};



const categoryPageDetails = async(req,res)=>{

    try{

        const {categoryId} = req.body;

        if(!categoryId){
            console.log("the body incoming-> ", req.body);
            return res.status(400).json({
                success:false,
                message:"Missing fields",
            })
        };

        const categoryDetails = await Category.findById(categoryId).populate({
            path:"courses",
            match:{status:"Published"},
            populate:"ratingAndReviews",
            populate:"instructor"
        }).exec()

        if(!categoryDetails){
            return res.status(500).json({
                success:false,
                message:"Soemthing went wrong , try again",
            })
        };

        const differentCategories = await Category.find(
            {_id: {$ne:categoryId}}
        );

        const randomCategoryDetails = await Category.findOne(
            differentCategories[getRandomInt(differentCategories.length)]._id
        ).populate({
            path:"courses",
            match:{status:"Published"},
            populate:"ratingAndReviews"
        }).exec()

        //additional endpoint for getting results based on top selling courses implemented -> test it


        //top selling courses among all categories
        //to get a categorized list of courses we are flatting up the courses from all categories
        //else we could ve just called courses for all course objects 
        //to get a list but in random course order

        const allCategories = await Category.find({}).populate({
            path:"courses",
            match:{status:"Published"},
            populate:{
                path:"instructor",
            }
        });//this returns array of all category objects with populated courses(+instructor)

        const allCourses = allCategories.flatMap((category)=>category.courses); //this returns all courses

        //getting top 10 selling courses all categories
        const topSellingCourses = 
            allCourses.sort( (a,b)=> b.studentsEnrolled.length - a.studentsEnrolled.length)
            .slice(0,10)


        res.status(200).json({
            success:true,
            data:{categoryDetails,randomCategoryDetails,topSellingCourses},
            message:"Category Details fetched",
        });




        
    }catch(err){
        console.log("Err in categoryPageDetails-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in fetching category Page Details , Try again!",
        })
    }


};




//test endpoint for sorting logic
const categoryPageDetailsSorted = async(req,res)=>{

    try{

        const {categoryId} = req.body; //can also be done using name ,provided names are unique in model

        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"Missing fields",
            })
        };
        //this is a single 
        const categoryDetails = await Category.findById(categoryId).populate("courses").exec( (err,results)=>{
            
            if(err){

                console.log("Err in executing aggregation pipeline");
                return res.status(400).json({
                    success:false,
                    message:"Something went wrong, try again",
                });

            }else{
                //aggregate pipeline
                Category.aggregate([
                    {

                        //match check whether it does anything to the results
                        $match:{_id:categoryId}

                    },
                    {
                        //project shape up the doc by adding a new param field of no of students
                        $project:{
                            name:1,//check if populated courses is returned or not
                            courses:1,
                            numberOfStudents:{ $size: "$studentsEnrolled" }
                            //if above statement this fails here try couses.studentsEnrolled
                        }

                    },
                    {
                        //sort by new projected field 
                        $sort:{
                            numberOfStudents:-1 //for descending sort
                        }

                    } //execute aggregate pipeline's result (as sortedResults)
                ]).exec( (err,sortedResults)=>{
                    if(err){

                        console.log("Err in executing aggregation pipeline");
                        return res.status(400).json({
                            success:false,
                            message:"Something went wrong, try again",
                        });

                    }else{
                        console.log("Results from aggregate pipeline -> , " , sortedResults);
                        categoryDetails = sortedResults;
                    }
                })

            }
        });

        if(!categoryDetails){
            return res.status(500).json({
                success:false,
                message:"Soemthing went wrong , try again",
            })
        };

        const differentCategories = await Category.find(
            {_id: {$ne:categoryId}}
        ).populate("courses").exec();

        res.status(200).json({
            success:true,
            data:{categoryDetails,differentCategories},
            message:"Category Details are sorted & fetched",
        });




        
    }catch(err){
        console.log("Err in categoryPageDetailsSorted-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in fetching category Page Details (categoryPageDetailsSorted) , Try again!",
        })
    }


};


module.exports ={
    categoryPageDetails,
    showAllCategories,
    createCategory,
    categoryPageDetailsSorted,

};