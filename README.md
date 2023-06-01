# articleCyberTest

ส่งแบบทดสอบ cyber rich digital (backend dev jr)

Installation 
articleCyberTest/backend command : yarn install
articleCyberTest/frontend command : yarn install
import database dbname="article" สามารถ เอา database ผมไป import ได้ครับ จะอยู่ใน articleCyberTest/article.sql

Run
articleCyberTest/backend command : yarn start
articleCyberTest/frontend command : yarn dev
xampp: run Apache and MySQL

Front end on web 
login page ถ้าไม่สมัครสามารถใช้
email : mergeofficial@hotmail.com
password  : 1234Ss
ผมได้ทำการสร้าง web app แบบ three tires layer ประกอบด้วย web, api and database

************************************จากโจทย์******************************************
1. แยกEnviroment = 
ผมทำการแยก enviroment ดังต่อไปนี้

-backend/controller เป็นตัวจัดเก็บ ctr ของการใช้งาน routes ต่างๆ  เป็นส่วนที่ทำงานตามความต้องการของการเรียกใช้ ข้อมูลผ่าน route และ res กลับไปเป็น json, cookie และอื่นๆ 
-backend/Routes เป็นตัวรับ จัดการ URL endpoints ตาม method Get,Post,Put,Delete
-backend/schemes เป็นโครงสร้างของ data ที่จะมาใช้งานกับ data table นั้นๆ
-backend/utils ผมทำสำหรับ การ verify กับ ตัว jwt ก่อนใช้งานทรัพยากรบ้างอย่าง ก่อนที่จะเข้าถึงตัว ctr
-backend/validation เป็นตัว validation พวก json body ต่างๆก่อนที่จะเข้าไปถึง ctr
-backend/ctroller/function เนื่องด้วยมีการเรียกใช้งาน การหาข้อมูล reation ในหลายครั้งใน ctr ผมเลยสร้างเป็น function เพื่อเป็นการเรียกใช้ซ้ำได้
-backend/.env เป็นตัวจัดเก็บ ตัวแปร  variables สำหรับ  environment, ที่สำคัญมันจะไม่สามารถมองเห็นได้ , ขั้นตอน deploy เราต้อง ไป set env เองใน hosting เช่น jwt authenticity , DB_HOST DB_PASSWORD 
 ตัวอย่างเช่น
process.env.JWT คือ ในหน้า .env จะมี JWT=aJcJWdznlf4BknMudEHeqOMH+g/tex578twTfu+tIS8=***
   เมื่อเรียกใช้ env  // Generate a JWT token
    const token = jwt.sign({ userId: results[0].userid}, process.env.JWT, { expiresIn: "7d" });


-frontend ก็ได้มีการทำการจัดโครง structure แต่ผมขออธิยายในส่วนของ backend ตามบททดสอบ 

///////////////////////////////////////////////////////////////////////////

2.ทำ CRUD = method คือตาม CRUD:post get put delete 
ผมได้มีการทำ ไว้ 3 ส่วน route ใน middleware ดังต่อไปนี้
backend/index.js 
2.1 app.use("/v1/api/users", usersRoute);
2.2 app.use("/v1/api/article", articleRoute);
2.3 app.use("/v1/api/auth", authRoute);

///// 2.1 controllers/usersRoute /////
-router.get("/", getUsers); เป็นการเรียกข้อมูลของผู้ใช้งานทั้งหมด
-router.get("/:id", getUserById); เป็นการหาข้อมูลผ่าน id ของ user นั้นๆ
-router.post("/register", validationUser, registerUser); เป็นการสมัครโดยการใช้การ bcrypt ให้กับ password โดยการ hash ทำให้มีความ secure 
-router.put("/update/:id", validationUpdateUser, updateUser); เป็นการ update ของ user นั้นๆดัวย id 
-router.delete("/:id", deleteUser); เป็นการลบข้อมูลของ user

///// 2.2 controllers/articleRoute /////
//Users routes
-router.post("/createArticle/:id",verifyUser,validationArticle, createArticle); เป็นการสร้างบทความโดยจะต้องมีการ login ก่อนเพราะจะต้องผ่านการ verifyUser jwt หลังจากนั้น จะมีการ validation ตัวแปร json ที่ส่งมา ถึงจะสร้างบทความได้
-router.put("/updateArticle/:id", validateArticleUpdate, updateArticle); เป็นการ update บทความส่ง id ของบทความนั้นๆมา
-router.get("/view/:id", getArticleById); เป็นการ ดูบทความและผู้เขียน(รวมถึงขึ้น post)นั้นๆ โดยการ  join on 
-router.get("/", getAllRelationArticleUser); เป็นการ ดึงข้อมูล แบบ realation table ของ 1.users 2.user_article 3.article โดยใช้การ join on
-router.get("/getOnlyArticleById/:id", getOnlyArticleById); เป็นการดึง แบบ specfic item สำหรับ บทความนั้นๆ
-router.get("/table", getAllArticleUser); เป็นการดึงข้แมูล ทั้งหมดแต่ไม่ต้อง join จะได้ข้อมูลที่ต่างกัน และ performance จะเร็วกว่า
-router.get("/search/", getSearchRelationArticleUser); เป็นการ search item ต่างๆผ่าน keyword ที่หลากหลาย ถ้าดูในโค้ดจะเห็นชัดเจนขึ้นแบบสามารถ ใช้ single input ที่หาได้ผ่านหลาย field 
-router.delete("/deleteArticle/:id", deleteArticle);เป็นการ delete แบบ realation ใน table user_article และ article นั้นๆ
-router.post("/addView/:id", incrementArticleView); เป็นการเพิ่มจำนวนยอด view ถ้ากด read more จะ + view ให้ถ้าดูจากหน้าบ้าง

///// 2.3 controllers/authRoute /////

-router.post("/login", login); เป็นการ login ที่มีการส่ง jwt พร้อมวันหมดอายุ ไปจัดเก็บ ที่ local storage cookie  เพื่อทำการ verfiy user ก่อนใช้งานในของ route ตัวอย่าง route createArticle เพื่อที่จะป้องกันการสร้าง artcile โดยไม่ login จากบุคคลภายนอก

*เพิ่มเติมของการ verfiy สามารถดูได้ที่ function ตรวจสอบที่ verifyUser*
*เพิ่มเติมการ validation json input (ไม่รวมการ validation ของ user ที่มี email ซ้ำกันนะครับอันนั้นต้องทำแยกที่ register) ดูได้ที่ backend/validaiton*

///////////////////////////////////////////////////////////////////////////

3.แสดงข้อมูล = 
จาก database จะมี 3 table 1.users 2.user_article 3.article โดย user_article จะจัดเก็บ usersId กับ articleId ไว้จะมีการแสดงได้ดัง page {Home} front-end โดย route ที่สามารถใช้ทำคือ 1.router.get("/", getAllRelationArticleUser);  2.router.get("/view/:id", getArticleById);

///////////////////////////////////////////////////////////////////////////

4.แสดงรูป สามารถดูได้ที่ front end เลยครับ วิธีจัดเก็บรูปของผมจะใช้ api ของ cloudinary ในการจัดเก็บรูป บน cloud ทำการ save path ในdatabase และ เรียกใช้ ผ่าน link src

///////////////////////////////////////////////////////////////////////////

5.แสดงจำนวนผู้ชม router.post("/addView/:id", incrementArticleView); ในหน้า front end ถ้ากด read more  จะเรียกใช้ axios path จะทำให้+ view ได้ และ แสดงจำนวน view ขอแต่ละอันเลยครับ

///////////////////////////////////////////////////////////////////////////

6.แสดงจำนวน pagination 
//////รูปแบบที่ใช้ API ทำ pagination/////////
router.get("/search/", getSearchRelationArticleUser);

ในหน้า home ที่แสดง article นั้นผมได้ส่ง รับและส่ง ข้อมูล pagination {page} ด้วยการคำนวนเองและใช้ใน front end หน้า home
ตัวอย่างโค้ด
const { search, page, limit } = req.query; //โดยจะรับsearch, page (เลขหน้าที่นั้นๆ)จากหน้าบ้านมา พร้อมกับ limit(จำนวนข้อมูลที่ต้องการจะแสดง)

const offset = (page - 1) * limit; //หาข้อมูลจำนวน set นั้นๆ เช่น page เป็น2 ทำการ - 1 จะได้ array index ตัวที่ 1 และ limit 5 ข้อมูลใน หน้า 2 จะเท่ากับข้อมูล 6-10

ทำการ query และ count
 LIMIT ${limit}
OFFSET ${offset}

 const totalCount = countResults[0].totalCount;// นับจำนวนทั้งหมด
 และส่ง totalCount ใน json กลับไปให้ front end คำนวนแสดงว่าทั้งหมดจะมี กี่ page (เช่น totalCount=12 หน้าบ้าง limit ที่ 4 จำนวนเมื่อคำนวนที่ front end จะได้ 3 หน้า)
//////รูปแบบที่ใช้ Frontend ทำ pagination/////////
อันนี้สามารถทำได้เลย ผ่าน framwork 

///////////////////////////////////////////////////////////////////////////

็7.HTTP STATUS 
ผมได้ทำการตรวจสอบแล้วครับ ใน ทุก ctr แต่ไม่แน่ใจเรื่อง ของdelete response STATUS บ้างที่บอก 200 บ้าง ที่บอก 204 ครับ แต่ส่วนตัวผมใช้ 204ครับจากการวิเคราะห์การใช้งาน ตาม DOC

///////////////////////////////////////////////////////////////////////////

8.Response json
ทุกอย่าง res.json หมดครับ

///////////////////////////////////////////////////////////////////////////

อธิบายสิ่งที่ทำ
จากด้านบนผมได้มีเพิ่มเติมของเรื่อง bearer jwt เข้ามา + validation json input ด้วย Joi + .env + relationDataMapper function + utils การ verfiy jwt ผ่าน header และ cookie+realation database sql (ที่มี table ตัวกลาง รับ id ของ ผู้เขียน กับ บทความ)