const {instance} = require("../config/razorpay");
const mailSender = require("../utils/mailSender");

const Course = require("../models/courses");
const User = require("../models/users");
const CourseProgress = require("../models/courseProgress");

const {paymentSuccessEmail} = require("../mail/paymentSuccessEmail");

const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");

require("dotenv").config();


const capturePayment = async(req,res)=>{

    try{ 

        const {courses} = req.body;
        const {id} = req.user;

        const user = await User.findById(id);

        if(courses.length === 0){
            return res.status(400).json({
                success:false,
                message:"No courses in request",
            })
        };

        let totalPrice = 0;
        for( const course_id of courses){
            let course; //course_id is an object iterator for courses[]

            try{
                course = await Course.findById(course_id); //assigning to current iterator

                if(!course){
                    return res.status(400).json({
                        success:false,
                        message:"Course not found",
                    })
                };

                const uid = new mongoose.Types.ObjectId(id);//transforming to mongoose object

                if(course.studentsEnrolled.includes(uid)){
                    return res.status(400).json({
                        success:false,
                        message:`Student already enrolled into the course-> ${course.courseName}`,
                    })
                };

                totalPrice += course.price;


            }catch(err){
                console.log("Err in iterating courses in cart ->",err)
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong, Try again!"
                })
            }
        };

        const currency = "INR"
        //razorpay options creation
        const options = {
            amount: totalPrice * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            // options:{ //use notes as key
            //     email:email,
            //     name:user.firstName
            // }

        }

        //calling razorpay order api
        try{

            const paymentResponse = await instance.orders.create(options);

            //ok response
            return res.status(200).json({
                success:true,
                data:paymentResponse,
                message:"Order created successfully"
            })


        }catch(err){
            console.log("Err in rp orders api call-> ", err);
            return res.status(500).json({
                success:false,
                message:"Something went wrong, Try again!"
            })
        };

        //response in above try block

    }catch(err){
        console.log("Err in creating razorpay order instance-> " , err );
        return res.status(500).json({
            success:false,
            message:"Something went wrong, Try again!"
        })

    }

};

const enrollToCourses = async(courses,id,res)=>{

    try{
        //validation
        if(!courses || !id){
            return res.status(400).json({
                success:false,
                message:"No parameters in call",
            })
        };

        
        for( const courseId of courses){

            try{

                //update course->enrolled students
                const enrolledCourse = await Course.findOneAndUpdate(
                    {_id:courseId},
                    {$push:{studentsEnrolled:id}},
                    {new:true},
                )
        
                if(!enrolledCourse) {//internal validation
                    return res.status(500).json({success:false,message:"Course not Found"});
                }

                //creating particular course-> courseProgress metrics object for user
                const courseProgressCreation = await CourseProgress.create({
                    courseID:courseId,
                    userId:id,
                    completedVideos:[],
                })

                //update user-> their own courses field
                const enrolledStudent = await User.findByIdAndUpdate(id,
                    {$push:{
                        courses: courseId,
                    }},{new:true}
                )
                
                
                
            }catch(err){
                console.log(err);
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong, Try again"
                });

            }


        }


        
    }catch(err){
        console.log("Err in enrolling to course-> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong , Try again!",
        })
    }


}

const verifySignature = async(req,res)=>{

    try{
        //req fields for signature verification of payment
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;

        const courses = req.body?.courses;
        const {id} = req.user;

        //validations
        if(!razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature || !courses || !id){

                return res.status(200).json({
                    success:false, message:"Payment Failed",
                }
            )
        };

        //signature verification algo by razorpay
        let body = razorpay_order_id + "|" + razorpay_payment_id;

        //creating expected signature
        const expectedSign = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString())
            .digest("hex");

            //if same -> payment verified
        if(expectedSign === razorpay_signature){
            //payment verified  
            
            //enrolling user(buyer) to courses
            await enrollToCourses(courses,id,res);

            const updatedUser = await User.findById(id)

            if(!updatedUser){
                return res.status(500).json({
                    success:false,
                    message:"Some issue with user fetching"
                })
            }
            //ok response
            return res.status(200).json({
                success:true,
                data:updatedUser,
                message:"Payment Successfull!",
            })

        }else{
            return res.status(400).json({
                success:false,
                message:"Payment Failed!",
            })
        }



    }catch(err){
        console.log("Err in verifying razorpay payment-> " , err );
        res.status(500).json({
            success:false,
            message:"Something went wrong, Try again!"
        })

    }

}

//test it , to send payment confirmation mail
const sendPaymentConfirmation = async (req,res)=>{

    try{
        //order details
        const {orderId, paymentId, amount} = req.body;
        const {id} = req.user;

        //validation
        if(!orderId || !paymentId || !amount || !id) {
            return res.status(400).json({
                success:false,
                message:"Please provide all the fields"
            });
        }

        //to get buyer email
        const enrolledStudent = await User.findById(id);

        //sending email
        await mailSender(
            enrolledStudent.email,
            `Payment Successfull-StudyNotion`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        );

        res.status(200).json({
            success:true,
            message:"Payment mail sent!",
        })


    }catch(err){
        console.log("Err in sending payment confirmation-> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong , Try again",
        })
    }
}


// const capturePayment = async(req,res)=>{



//     try{

//         const {courseId} = req.body;

//         const {id} = req.user;

//         if(!courseId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Missing fields",
//             })
//         };

//         const course = await Course.findById(courseId);

//         if(!course){
//             return res.status(400).json({
//                 success:false,
//                 message:"Course not found",
//             })
//         };

//         const uid = new mongoose.Types.ObjectId(id);

//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:"User is already enrolled into the course",
//             })
//         };

        

//         //order creation

//         const amount = course.price
//         const currency = "INR"

//         //settings for razorpay order
//         const options = {
//             amount: amount*100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:courseId,
//                 userId:id,
//             }
//         };

//         //razorpay order api call
//         const paymentResponse = await instance.orders.create(options);
//         console.log("response by creating razorpay order api-> ", paymentResponse);

//         //response
//         res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });


//     }catch(err){
//         console.log("Error in capturePayment -> ",err);
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong in initiating order",
//         })
//     }
// };


// const verifySignature = async(req,res)=>{

//     try{

//         const signature = req.headers["x-razorpay-signature"]

//         const shasum = crypto.createHmac("sha256",process.env.WEBHOOK_SECRET);

//         shasum.update(JSON.stringify(req.body));

//         const digest = shasum.digest("hex");

//         if(signature === digest){

//             console.log("Payment is Authorized");

//             const {courseId, userId} = req.body.payload.payment.entity.notes;


//             const updateCourse = await Course.findByIdAndUpdate(courseId,{
//                 $push:{
//                     studentsEnrolled:userId
//                 }
//             },{new:true});

//             const updateUser = await User.findByIdAndUpdate(userId,{
//                 $push:{
//                     courses:courseId,
//                 }
//             },{new:true});

//             //send confirmation email
//             const confirmationMail = await mailSender(
//                 updateUser.email,
//                 "Congratulations From StudyNotion",
//                 `Congratulations, you are onboarded into new StudyNotion Course ${updateCourse.courseName}`,
//             );


//             //reponse
//             res.status(200).json({
//                 success:true,
//                 message:"Signature verified & Course-User updated",
//             })

//         }




//     }catch(err){
//         console.log("Error in verifySignature -> ",err);
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong",
//         })
//     }
// };


module.exports = {
    capturePayment,
    verifySignature,
    sendPaymentConfirmation
    
}