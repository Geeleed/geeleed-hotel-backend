# Geeleed Hotel

# Backend

ตัวอย่างระบบจัดการเว็บไซต์ backend ของเว็บไซต์จองห้องพักโรงแรม พัฒนาด้วย node.js (โปรเจ็กนี้ทำ frontend แยกไว้ที่ [frontend repository](https://)) ใช้บริการ payment gateway ด้วย stripe และใช้ฐานข้อมูล mongodb

การใช้งาน

1. สมัคร [stripe](https://dashboard.stripe.com/register) สำหรับใช้บริการ payment gateway และใช้ secret/public key สำหรับการทดสอบในขั้น development
2. ต้องโหลด [stripe cli](https://docs.stripe.com/stripe-cli) สำหรับใช้งาน local webhook ในขั้น development ก่อน สำหรับตอนนี้ใช้เรา windows
3. ติดตั้ง [mongodb compass](https://www.mongodb.com/try/download/shell) เนื่องจากโปรเจ็กนี้ใช้ฐานข้อมูลเป็น mongodb
4.

```bash
npm install
```

5. สร้างไฟล์ .env สำหรับ environment variable ของโปรเจ็ก

```bash
PORT=8000
SERVER_IP="เป็น IP address ของ backend"
FRONTEND_ORIGIN="เป็น origin ของ frontend เช่น http://localhost:3000 สำหรับอนุญาต cors"
SALT=7
SECRET_KEY="ตั้ง secret key อะไรก็ได้"

PK_STRIPE="เป็น public key ของ stripe"
SK_STRIPE="เป็น secret key ของ stripe"
EP_STRIPE="เป็น endpointSecret สำหรับใช้ webhook แบบ local ในขั้น development"

CONNECTION_STRING= "mongodb://127.0.0.1:27017/"
DATABASE_NAME= "geeleed-hotel"
```

4. npm run dev เพื่อรัน backend server
5. ใช้ command เพื่อเปิด local webhook

```bash
stripe login
stripe listen --forward-to localhost:8000/webhook
```

6. การใช้งานระบบ admin แบบเบื้องต้นสำหรับเพิ่มข้อมูลห้องพักและรูปภาพโรงแรม ให้เพิ่ม "admin" ใน role (แก้ไขโดยตรงได้ที่ฐานข้อมูลซึ่งเป็น mongodb) หลังจากสมัครใช้งานโรงแรม

## โฟลเดอร์ config

- ไฟล์ cors.js ใช้สำหรับอนุญาต CORS ใน express

## Demo project

เว็บไซต์ตัวอย่างของโปรเจ็กนี้ถูก deploy บน vercel และใช้ฐานข้อมูล mongodb atlas สามารถดู demo ได้ที่ [Geeleed Hotel](...)

## อื่น ๆ

ติดต่อ surasak.kwork@gmail.com
